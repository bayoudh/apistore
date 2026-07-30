import { Repository } from "typeorm";
import { AppDataSource } from "../config/datasource";
import { AuditLog } from "../entities/AuditLog";

export class AuditLogRepository extends Repository<AuditLog> {
  constructor() {
    super(AuditLog, AppDataSource.createEntityManager());
  }
}
