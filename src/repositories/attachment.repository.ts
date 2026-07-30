import { Repository } from "typeorm";
import { AppDataSource } from "../config/datasource";
import { Attachment } from "../entities/Attachment";

export class AttachmentRepository extends Repository<Attachment> {
  constructor() {
    super(Attachment, AppDataSource.createEntityManager());
  }
}
