import { Repository } from "typeorm";
import { AppDataSource } from "../config/datasource";
import { Client } from "../entities/Client";

export class ClientRepository extends Repository<Client> {
  constructor() {
    super(Client, AppDataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<Client | null> {
    return this.findOne({ where: { email } });
  }
}
