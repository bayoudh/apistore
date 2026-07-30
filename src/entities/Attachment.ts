import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Ticket } from "./Ticket";

@Entity("attachments")
export class Attachment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 255 })
  fileName!: string;

  @Column({ length: 255 })
  originalName!: string;

  @Column({ length: 100 })
  mimeType!: string;

  @Column()
  fileSize!: number;

  @Column()
  filePath!: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.attachments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "ticketId" })
  ticket!: Ticket;

  @Column()
  ticketId!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
