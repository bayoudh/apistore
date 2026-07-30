import { CommentRepository } from "../repositories/comment.repository";
import { TicketRepository } from "../repositories/ticket.repository";
import { UserRepository } from "../repositories/user.repository";
import { AppError } from "../utils/AppError";

export class CommentService {
  private commentRepo: CommentRepository;
  private ticketRepo: TicketRepository;
  private userRepo: UserRepository;

  constructor() {
    this.commentRepo = new CommentRepository();
    this.ticketRepo = new TicketRepository();
    this.userRepo = new UserRepository();
  }

  async findByTicket(ticketId: string) {
    const ticket = await this.ticketRepo.findOne({ where: { id: ticketId } });
    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }

    return this.commentRepo.find({
      where: { ticketId },
      relations: ["author"],
      order: { createdAt: "ASC" },
    });
  }

  async create(data: { content: string; ticketId: string; authorId: string }) {
    const ticket = await this.ticketRepo.findOne({ where: { id: data.ticketId } });
    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }

    const author = await this.userRepo.findOne({ where: { id: data.authorId } });
    if (!author) {
      throw new AppError("User not found", 404);
    }

    const comment = this.commentRepo.create(data);
    return this.commentRepo.save(comment);
  }

  async delete(id: string) {
    const comment = await this.commentRepo.findOne({ where: { id } });
    if (!comment) {
      throw new AppError("Comment not found", 404);
    }
    await this.commentRepo.remove(comment);
  }
}
