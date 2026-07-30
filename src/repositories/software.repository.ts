import { Repository } from "typeorm";
import { AppDataSource } from "../config/datasource";
import { Software } from "../entities/Software";

export class SoftwareRepository extends Repository<Software> {
  constructor() {
    super(Software, AppDataSource.createEntityManager());
  }
}
