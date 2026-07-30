import { Repository } from "typeorm";
import { AppDataSource } from "../config/datasource";
import { Maintenance } from "../entities/Maintenance";

export class MaintenanceRepository extends Repository<Maintenance> {
  constructor() {
    super(Maintenance, AppDataSource.createEntityManager());
  }
}
