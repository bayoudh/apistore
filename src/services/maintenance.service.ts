import { MaintenanceRepository } from "../repositories/maintenance.repository";
import { SoftwareRepository } from "../repositories/software.repository";
import { UserRepository } from "../repositories/user.repository";
import { AppError } from "../utils/AppError";

export class MaintenanceService {
  private maintenanceRepo: MaintenanceRepository;
  private softwareRepo: SoftwareRepository;
  private userRepo: UserRepository;

  constructor() {
    this.maintenanceRepo = new MaintenanceRepository();
    this.softwareRepo = new SoftwareRepository();
    this.userRepo = new UserRepository();
  }

  async findAll(page = 1, limit = 10, filters?: { status?: string; softwareId?: string }) {
    const qb = this.maintenanceRepo.createQueryBuilder("maintenance");

    if (filters?.status) {
      qb.andWhere("maintenance.status = :status", { status: filters.status });
    }
    if (filters?.softwareId) {
      qb.andWhere("maintenance.softwareId = :softwareId", { softwareId: filters.softwareId });
    }

    const total = await qb.getCount();
    const records = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy("maintenance.scheduledAt", "ASC")
      .getMany();

    return {
      records,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string) {
    const record = await this.maintenanceRepo.findOne({
      where: { id },
      relations: ["software", "technician", "ticket"],
    });
    if (!record) {
      throw new AppError("Maintenance record not found", 404);
    }
    return record;
  }

  async create(data: {
    title: string;
    description: string;
    type: string;
    scheduledAt?: Date;
    notes?: string;
    softwareId: string;
    technicianId?: string;
    ticketId?: string;
  }) {
    const software = await this.softwareRepo.findOne({ where: { id: data.softwareId } });
    if (!software) {
      throw new AppError("Software not found", 400);
    }

    if (data.technicianId) {
      const technician = await this.userRepo.findOne({ where: { id: data.technicianId } });
      if (!technician) {
        throw new AppError("Technician not found", 400);
      }
    }

    const record = this.maintenanceRepo.create({
      ...data,
      status: "scheduled",
    });

    return this.maintenanceRepo.save(record);
  }

  async update(id: string, data: Partial<{
    title: string;
    description: string;
    type: string;
    status: string;
    scheduledAt: Date;
    completedAt: Date;
    notes: string;
    technicianId: string;
  }>) {
    const record = await this.maintenanceRepo.findOne({ where: { id } });
    if (!record) {
      throw new AppError("Maintenance record not found", 404);
    }

    if (data.status === "completed" && !data.completedAt) {
      data.completedAt = new Date();
    }

    Object.assign(record, data);
    return this.maintenanceRepo.save(record);
  }

  async delete(id: string) {
    const record = await this.maintenanceRepo.findOne({ where: { id } });
    if (!record) {
      throw new AppError("Maintenance record not found", 404);
    }
    await this.maintenanceRepo.remove(record);
  }
}
