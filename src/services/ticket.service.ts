import { TicketRepository } from "../repositories/ticket.repository";
import { ClientRepository } from "../repositories/client.repository";
import { SoftwareRepository } from "../repositories/software.repository";
import { UserRepository } from "../repositories/user.repository";
import { AppError } from "../utils/AppError";

export class TicketService {
  private ticketRepo: TicketRepository;
  private clientRepo: ClientRepository;
  private softwareRepo: SoftwareRepository;
  private userRepo: UserRepository;

  constructor() {
    this.ticketRepo = new TicketRepository();
    this.clientRepo = new ClientRepository();
    this.softwareRepo = new SoftwareRepository();
    this.userRepo = new UserRepository();
  }

  async findAll(page = 1, limit = 10, filters?: { status?: string; priority?: string; clientId?: string }) {
    const qb = this.ticketRepo.createQueryBuilder("ticket");

    if (filters?.status) {
      qb.andWhere("ticket.status = :status", { status: filters.status });
    }
    if (filters?.priority) {
      qb.andWhere("ticket.priority = :priority", { priority: filters.priority });
    }
    if (filters?.clientId) {
      qb.andWhere("ticket.clientId = :clientId", { clientId: filters.clientId });
    }

    const total = await qb.getCount();
    const tickets = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy("ticket.createdAt", "DESC")
      .getMany();

    return {
      tickets,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string) {
    const ticket = await this.ticketRepo.findOne({
      where: { id },
      relations: ["client", "software", "assignedTechnician", "comments", "attachments"],
    });
    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }
    return ticket;
  }

  async findByTicketNumber(ticketNumber: string) {
    const ticket = await this.ticketRepo.findByTicketNumber(ticketNumber);
    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }
    return ticket;
  }

  async create(data: {
    subject: string;
    description: string;
    priority?: string;
    category?: string;
    clientId: string;
    softwareId: string;
  }) {
    const client = await this.clientRepo.findOne({ where: { id: data.clientId } });
    if (!client) {
      throw new AppError("Client not found", 400);
    }

    const software = await this.softwareRepo.findOne({ where: { id: data.softwareId } });
    if (!software) {
      throw new AppError("Software not found", 400);
    }

    const ticketCount = await this.ticketRepo.count();
    const ticketNumber = `TK-${String(ticketCount + 1).padStart(5, "0")}`;

    const ticket = this.ticketRepo.create({
      ...data,
      ticketNumber,
      status: "open",
    });

    return this.ticketRepo.save(ticket);
  }

  async update(id: string, data: Partial<{
    subject: string;
    description: string;
    priority: string;
    category: string;
    status: string;
  }>) {
    const ticket = await this.ticketRepo.findOne({ where: { id } });
    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }

    if (data.status === "resolved" || data.status === "closed") {
      data as Record<string, unknown>;
      (data as Record<string, unknown>).resolvedAt = new Date();
    }

    Object.assign(ticket, data);
    return this.ticketRepo.save(ticket);
  }

  async assignTechnician(ticketId: string, technicianId: string) {
    const ticket = await this.ticketRepo.findOne({ where: { id: ticketId } });
    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }

    const technician = await this.userRepo.findOne({ where: { id: technicianId } });
    if (!technician) {
      throw new AppError("Technician not found", 400);
    }

    ticket.assignedTechnicianId = technicianId;
    return this.ticketRepo.save(ticket);
  }

  async changeStatus(id: string, status: string) {
    const ticket = await this.ticketRepo.findOne({ where: { id } });
    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }

    ticket.status = status;
    if (status === "resolved" || status === "closed") {
      ticket.resolvedAt = new Date();
    }

    return this.ticketRepo.save(ticket);
  }

  async getStats() {
    const statusCounts = await this.ticketRepo.countByStatus();
    const total = await this.ticketRepo.count();

    return {
      total,
      byStatus: statusCounts,
    };
  }

  async delete(id: string) {
    const ticket = await this.ticketRepo.findOne({ where: { id } });
    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }
    await this.ticketRepo.remove(ticket);
  }
}
