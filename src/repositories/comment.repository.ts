import { Repository } from "typeorm";
import { AppDataSource } from "../config/datasource";
import { Comment } from "../entities/Comment";

export class CommentRepository extends Repository<Comment> {
  constructor() {
    super(Comment, AppDataSource.createEntityManager());
  }
}
