import { ContractRepository } from "../repositories/contract.repository";
import { ClientRepository } from "../repositories/client.repository";
import { SoftwareRepository } from "../repositories/software.repository";
import { AppError } from "../utils/AppError";

export class ContractService {
  private contractRepo: ContractRepository;
  private clientRepo: ClientRepository;
  private softwareRepo: SoftwareRepository;

  constructor() {
    this.contractRepo = new ContractRepository();
    this.clientRepo = new ClientRepository();
    this.softwareRepo = new SoftwareRepository();
  }

  async findAll(page = 1, limit = 10, filters?: { status?: string; clientId?: string }) {
    const qb = this.contractRepo.createQueryBuilder("contract");

    if (filters?.status) {
      qb.andWhere("contract.status = :status", { status: filters.status });
    }
    if (filters?.clientId) {
      qb.andWhere("contract.clientId = :clientId", { clientId: filters.clientId });
    }

    const total = await qb.getCount();
    const contracts = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy("contract.createdAt", "DESC")
      .getMany();

    return {
      contracts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string) {
    const contract = await this.contractRepo.findOne({
      where: { id },
      relations: ["client", "software"],
    });
    if (!contract) {
      throw new AppError("Contract not found", 404);
    }
    return contract;
  }

  async findByContractNumber(contractNumber: string) {
    const contract = await this.contractRepo.findByContractNumber(contractNumber);
    if (!contract) {
      throw new AppError("Contract not found", 404);
    }
    return contract;
  }

  async create(data: {
    title: string;
    description?: string;
    type: string;
    startDate: Date;
    endDate: Date;
    value?: number;
    terms?: string;
    clientId: string;
    softwareId?: string;
  }) {
    const client = await this.clientRepo.findOne({ where: { id: data.clientId } });
    if (!client) {
      throw new AppError("Client not found", 400);
    }

    if (data.softwareId) {
      const software = await this.softwareRepo.findOne({ where: { id: data.softwareId } });
      if (!software) {
        throw new AppError("Software not found", 400);
      }
    }

    const contractCount = await this.contractRepo.count();
    const contractNumber = `CTR-${String(contractCount + 1).padStart(5, "0")}`;

    const contract = this.contractRepo.create({
      ...data,
      contractNumber,
      status: "active",
    });

    return this.contractRepo.save(contract);
  }

  async update(id: string, data: Partial<{
    title: string;
    description: string;
    type: string;
    status: string;
    startDate: Date;
    endDate: Date;
    value: number;
    terms: string;
    clientId: string;
    softwareId: string;
  }>) {
    const contract = await this.contractRepo.findOne({ where: { id } });
    if (!contract) {
      throw new AppError("Contract not found", 404);
    }

    Object.assign(contract, data);
    return this.contractRepo.save(contract);
  }

  async delete(id: string) {
    const contract = await this.contractRepo.findOne({ where: { id } });
    if (!contract) {
      throw new AppError("Contract not found", 404);
    }
    await this.contractRepo.remove(contract);
  }

  async getRevenue() {
    const result = await this.contractRepo
      .createQueryBuilder("contract")
      .select("SUM(contract.value)", "total")
      .where("contract.status = :status", { status: "active" })
      .getRawOne();

    return { totalRevenue: parseFloat(result?.total) || 0 };
  }
}
