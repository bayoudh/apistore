import { ClientRepository } from "../repositories/client.repository";
import { AppError } from "../utils/AppError";

export class ClientService {
  private clientRepo: ClientRepository;

  constructor() {
    this.clientRepo = new ClientRepository();
  }

  async findAll(page = 1, limit = 10) {
    const [clients, total] = await this.clientRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
    });

    return {
      clients,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string) {
    const client = await this.clientRepo.findOne({ where: { id } });
    if (!client) {
      throw new AppError("Client not found", 404);
    }
    return client;
  }

  async create(data: {
    companyName: string;
    contactFirstName: string;
    contactLastName: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
  }) {
    const existing = await this.clientRepo.findByEmail(data.email);
    if (existing) {
      throw new AppError("Email already in use", 409);
    }

    const client = this.clientRepo.create(data);
    return this.clientRepo.save(client);
  }

  async update(id: string, data: Partial<{
    companyName: string;
    contactFirstName: string;
    contactLastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    status: string;
  }>) {
    const client = await this.clientRepo.findOne({ where: { id } });
    if (!client) {
      throw new AppError("Client not found", 404);
    }

    if (data.email && data.email !== client.email) {
      const existing = await this.clientRepo.findByEmail(data.email);
      if (existing) {
        throw new AppError("Email already in use", 409);
      }
    }

    Object.assign(client, data);
    return this.clientRepo.save(client);
  }

  async delete(id: string) {
    const client = await this.clientRepo.findOne({ where: { id } });
    if (!client) {
      throw new AppError("Client not found", 404);
    }
    await this.clientRepo.remove(client);
  }
}
