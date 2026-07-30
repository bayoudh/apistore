import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Client } from "./Client";
import { Software } from "./Software";
import { User } from "./User";
import { Comment } from "./Comment";
import { Attachment } from "./Attachment";

@Entity("tickets")
export class Ticket {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, length: 20 })
  ticketNumber!: string;

  @Column({ length: 200 })
  subject!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ length: 20, default: "open" })
  status!: string;

  @Column({ length: 20, default: "medium" })
  priority!: string;

  @Column({ length: 50, default: "bug" })
  category!: string;

  @Column({ nullable: true })
  resolvedAt: Date;

  @ManyToOne(() => Client, (client) => client.tickets, { eager: true })
  @JoinColumn({ name: "clientId" })
  client!: Client;

  @Column()
  clientId!: string;

  @ManyToOne(() => Software, (sw) => sw.tickets, { eager: true })
  @JoinColumn({ name: "softwareId" })
  software!: Software;

  @Column()
  softwareId!: string;

  @ManyToOne(() => User, (user) => user.assignedTickets, { eager: true, nullable: true })
  @JoinColumn({ name: "assignedTechnicianId" })
  assignedTechnician!: User | null;

  @Column({ nullable: true })
  assignedTechnicianId: string;

  @OneToMany(() => Comment, (comment) => comment.ticket)
  comments!: Comment[];

  @OneToMany(() => Attachment, (att) => att.ticket)
  attachments!: Attachment[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
