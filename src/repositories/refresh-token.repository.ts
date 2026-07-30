import { Repository } from "typeorm";
import { AppDataSource } from "../config/datasource";
import { RefreshToken } from "../entities/RefreshToken";

export class RefreshTokenRepository extends Repository<RefreshToken> {
  constructor() {
    super(RefreshToken, AppDataSource.createEntityManager());
  }
}
