import { Repository } from "typeorm";
import { AppDataSource } from "../config/datasource";
import { User } from "../entities/User";

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, AppDataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async findByRefreshToken(token: string): Promise<User | null> {
    return this.createQueryBuilder("user")
      .innerJoinAndSelect("user.refreshTokens", "refreshToken", "refreshToken.token = :token", { token })
      .getOne();
  }
}
