import { Repository } from "typeorm";
import { AppDataSource } from "../config/datasource";
import { Role } from "../entities/Role";

export class RoleRepository extends Repository<Role> {
  constructor() {
    super(Role, AppDataSource.createEntityManager());
  }

  async findByName(name: string): Promise<Role | null> {
    return this.findOne({ where: { name } });
  }
}
