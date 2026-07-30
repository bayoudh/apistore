import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import { RoleRepository } from "../repositories/role.repository";
import { AppError } from "../utils/AppError";

export class UserService {
  private userRepo: UserRepository;
  private roleRepo: RoleRepository;

  constructor() {
    this.userRepo = new UserRepository();
    this.roleRepo = new RoleRepository();
  }

  async findAll(page = 1, limit = 10) {
    const [users, total] = await this.userRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ["role"],
      order: { createdAt: "DESC" },
    });

    return {
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ["role"],
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: string;
  }) {
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) {
      throw new AppError("Email already in use", 409);
    }

    const role = await this.roleRepo.findOne({ where: { id: data.roleId } });
    if (!role) {
      throw new AppError("Role not found", 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userRepo.create({
      ...data,
      password: hashedPassword,
    });

    return this.userRepo.save(user);
  }

  async update(id: string, data: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: string;
    status: string;
  }>) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (data.email && data.email !== user.email) {
      const existing = await this.userRepo.findByEmail(data.email);
      if (existing) {
        throw new AppError("Email already in use", 409);
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    Object.assign(user, data);
    return this.userRepo.save(user);
  }

  async delete(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    await this.userRepo.remove(user);
  }
}
