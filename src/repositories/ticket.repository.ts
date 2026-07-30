import { Repository } from "typeorm";
import { AppDataSource } from "../config/datasource";
import { Ticket } from "../entities/Ticket";

export class TicketRepository extends Repository<Ticket> {
  constructor() {
    super(Ticket, AppDataSource.createEntityManager());
  }

  async findByTicketNumber(ticketNumber: string): Promise<Ticket | null> {
    return this.findOne({ where: { ticketNumber } });
  }

  async countByStatus(): Promise<Record<string, number>> {
    const results = await this.createQueryBuilder("ticket")
      .select("ticket.status", "status")
      .addSelect("COUNT(*)", "count")
      .groupBy("ticket.status")
      .getRawMany();

    const counts: Record<string, number> = {};
    for (const row of results) {
      counts[row.status] = parseInt(row.count, 10);
    }
    return counts;
  }
}
