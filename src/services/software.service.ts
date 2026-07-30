import { SoftwareRepository } from "../repositories/software.repository";
import { ClientRepository } from "../repositories/client.repository";
import { AppError } from "../utils/AppError";

export class SoftwareService {
  private softwareRepo: SoftwareRepository;
  private clientRepo: ClientRepository;

  constructor() {
    this.softwareRepo = new SoftwareRepository();
    this.clientRepo = new ClientRepository();
  }

  async findAll(page = 1, limit = 10, clientId?: string) {
    const where = clientId ? { clientId } : {};
    const [software, total] = await this.softwareRepo.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      relations: ["client"],
      order: { createdAt: "DESC" },
    });

    return {
      software,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string) {
    const software = await this.softwareRepo.findOne({
      where: { id },
      relations: ["client"],
    });
    if (!software) {
      throw new AppError("Software not found", 404);
    }
    return software;
  }

  async create(data: {
    name: string;
    version: string;
    vendor?: string;
    description?: string;
    licenseType?: string;
    licenseExpiry?: Date;
    clientId: string;
  }) {
    const client = await this.clientRepo.findOne({ where: { id: data.clientId } });
    if (!client) {
      throw new AppError("Client not found", 400);
    }

    const software = this.softwareRepo.create(data);
    return this.softwareRepo.save(software);
  }

  async update(id: string, data: Partial<{
    name: string;
    version: string;
    vendor: string;
    status: string;
    description: string;
    licenseType: string;
    licenseExpiry: Date;
    clientId: string;
  }>) {
    const software = await this.softwareRepo.findOne({ where: { id } });
    if (!software) {
      throw new AppError("Software not found", 404);
    }

    if (data.clientId) {
      const client = await this.clientRepo.findOne({ where: { id: data.clientId } });
      if (!client) {
        throw new AppError("Client not found", 400);
      }
    }

    Object.assign(software, data);
    return this.softwareRepo.save(software);
  }

  async delete(id: string) {
    const software = await this.softwareRepo.findOne({ where: { id } });
    if (!software) {
      throw new AppError("Software not found", 404);
    }
    await this.softwareRepo.remove(software);
  }
}
