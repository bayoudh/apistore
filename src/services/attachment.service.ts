import fs from "fs";
import path from "path";
import { AttachmentRepository } from "../repositories/attachment.repository";
import { TicketRepository } from "../repositories/ticket.repository";
import { AppError } from "../utils/AppError";
import { env } from "../config/env";

export class AttachmentService {
  private attachmentRepo: AttachmentRepository;
  private ticketRepo: TicketRepository;

  constructor() {
    this.attachmentRepo = new AttachmentRepository();
    this.ticketRepo = new TicketRepository();
  }

  async findByTicket(ticketId: string) {
    const ticket = await this.ticketRepo.findOne({ where: { id: ticketId } });
    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }

    return this.attachmentRepo.find({
      where: { ticketId },
      order: { createdAt: "DESC" },
    });
  }

  async upload(file: Express.Multer.File, ticketId: string) {
    const ticket = await this.ticketRepo.findOne({ where: { id: ticketId } });
    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }

    const attachment = this.attachmentRepo.create({
      fileName: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      fileSize: file.size,
      filePath: file.path,
      ticketId,
    });

    return this.attachmentRepo.save(attachment);
  }

  async delete(id: string) {
    const attachment = await this.attachmentRepo.findOne({ where: { id } });
    if (!attachment) {
      throw new AppError("Attachment not found", 404);
    }

    const filePath = path.join(env.upload.dir, attachment.fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await this.attachmentRepo.remove(attachment);
  }
}
