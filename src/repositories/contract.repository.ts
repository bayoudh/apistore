import { Repository } from "typeorm";
import { AppDataSource } from "../config/datasource";
import { Contract } from "../entities/Contract";

export class ContractRepository extends Repository<Contract> {
  constructor() {
    super(Contract, AppDataSource.createEntityManager());
  }

  async findByContractNumber(contractNumber: string): Promise<Contract | null> {
    return this.findOne({ where: { contractNumber } });
  }
}
