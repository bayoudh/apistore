import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";
import { RefreshTokenRepository } from "../repositories/refresh-token.repository";
import { RoleRepository } from "../repositories/role.repository";
import { AppError } from "../utils/AppError";
import { jwtConfig } from "../config/jwt";
import { User } from "../entities/User";
import { Roles } from "../utils/constants";

export class AuthService {
  private userRepo: UserRepository;
  private refreshTokenRepo: RefreshTokenRepository;
  private roleRepo: RoleRepository;

  constructor() {
    this.userRepo = new UserRepository();
    this.refreshTokenRepo = new RefreshTokenRepository();
    this.roleRepo = new RoleRepository();
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      select: ["id", "firstName", "lastName", "email", "password", "status", "roleId"],
    });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    if (user.status !== "active") {
      throw new AppError("Account is deactivated", 403);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    await this.userRepo.update(user.id, { lastLoginAt: new Date() });

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleName?: string;
  }) {
    const existingUser = await this.userRepo.findByEmail(data.email);
    if (existingUser) {
      throw new AppError("Email already registered", 409);
    }

    const roleName = data.roleName || Roles.CLIENT;
    const role = await this.roleRepo.findByName(roleName);
    if (!role) {
      throw new AppError("Role not found", 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userRepo.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      roleId: role.id,
    });

    const savedUser = await this.userRepo.save(user);

    const accessToken = this.generateAccessToken(savedUser as User);
    const refreshToken = await this.generateRefreshToken(savedUser as User);

    return {
      user: savedUser,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string) {
    const refreshToken = await this.refreshTokenRepo.findOne({
      where: { token, isRevoked: false },
      relations: ["user"],
    });

    if (!refreshToken) {
      throw new AppError("Invalid refresh token", 401);
    }

    if (new Date(refreshToken.expiresAt) < new Date()) {
      throw new AppError("Refresh token expired", 401);
    }

    await this.refreshTokenRepo.update(refreshToken.id, { isRevoked: true });

    const accessToken = this.generateAccessToken(refreshToken.user);
    const newRefreshToken = await this.generateRefreshToken(refreshToken.user);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(refreshToken: string) {
    const token = await this.refreshTokenRepo.findOne({ where: { token: refreshToken } });
    if (token) {
      await this.refreshTokenRepo.update(token.id, { isRevoked: true });
    }
  }

  async getProfile(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ["role"],
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  private generateAccessToken(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email, roleId: user.roleId },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiration }
    );
  }

  private async generateRefreshToken(user: User): Promise<string> {
    const token = jwt.sign(
      { id: user.id },
      jwtConfig.refreshSecret,
      { expiresIn: jwtConfig.refreshExpiration }
    );

    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + jwtConfig.refreshExpiration);

    const refreshToken = this.refreshTokenRepo.create({
      token,
      expiresAt,
      userId: user.id,
    });

    await this.refreshTokenRepo.save(refreshToken);
    return token;
  }
}
