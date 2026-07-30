import { ClientRepository } from "../repositories/client.repository";
import { SoftwareRepository } from "../repositories/software.repository";
import { TicketRepository } from "../repositories/ticket.repository";
import { ContractRepository } from "../repositories/contract.repository";

export class DashboardService {
  private clientRepo: ClientRepository;
  private softwareRepo: SoftwareRepository;
  private ticketRepo: TicketRepository;
  private contractRepo: ContractRepository;

  constructor() {
    this.clientRepo = new ClientRepository();
    this.softwareRepo = new SoftwareRepository();
    this.ticketRepo = new TicketRepository();
    this.contractRepo = new ContractRepository();
  }

  async getStats() {
    const [totalClients, totalSoftware, totalTickets, ticketsByStatus, recentTickets, revenueResult] =
      await Promise.all([
        this.clientRepo.count(),
        this.softwareRepo.count(),
        this.ticketRepo.count(),
        this.ticketRepo.countByStatus(),
        this.ticketRepo.find({
          order: { createdAt: "DESC" },
          take: 5,
          relations: ["client", "software"],
        }),
        this.contractRepo
          .createQueryBuilder("contract")
          .select("SUM(contract.value)", "total")
          .where("contract.status = :status", { status: "active" })
          .getRawOne(),
      ]);

    return {
      totalClients,
      totalSoftware,
      totalTickets,
      ticketsByStatus,
      recentTickets,
      revenue: parseFloat(revenueResult?.total) || 0,
    };
  }
}
