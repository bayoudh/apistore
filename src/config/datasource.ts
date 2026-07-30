import { DataSource } from "typeorm";
import path from "path";
import { env } from "./env";

import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { RefreshToken } from "../entities/RefreshToken";
import { Client } from "../entities/Client";
import { Software } from "../entities/Software";
import { Ticket } from "../entities/Ticket";
import { Maintenance } from "../entities/Maintenance";
import { Comment } from "../entities/Comment";
import { Attachment } from "../entities/Attachment";
import { Contract } from "../entities/Contract";
import { AuditLog } from "../entities/AuditLog";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: env.db.path,
  synchronize: env.nodeEnv === "development",
  logging: env.nodeEnv === "development",
  entities: [
    User,
    Role,
    RefreshToken,
    Client,
    Software,
    Ticket,
    Maintenance,
    Comment,
    Attachment,
    Contract,
    AuditLog,
  ],
  migrations: [path.join(__dirname, "../migrations/*{.ts,.js}")],
  subscribers: [],
});
