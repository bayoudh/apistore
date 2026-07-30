import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Software } from "./Software";
import { User } from "./User";
import { Ticket } from "./Ticket";

@Entity("maintenance")
export class Maintenance {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 150 })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ length: 50 })
  type!: string;

  @Column({ length: 20, default: "scheduled" })
  status!: string;

  @Column({ nullable: true })
  scheduledAt!: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @Column({ type: "text", nullable: true })
  notes!: string;

  @ManyToOne(() => Software, (sw) => sw.maintenanceRecords, { eager: true })
  @JoinColumn({ name: "softwareId" })
  software!: Software;

  @Column()
  softwareId!: string;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: "technicianId" })
  technician!: User | null;

  @Column({ nullable: true })
  technicianId: string;

  @ManyToOne(() => Ticket, { nullable: true })
  @JoinColumn({ name: "ticketId" })
  ticket!: Ticket | null;

  @Column({ nullable: true })
  ticketId: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
