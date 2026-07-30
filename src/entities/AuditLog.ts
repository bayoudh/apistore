import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("audit_logs")
export class AuditLog {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 50 })
  action!: string;

  @Column({ length: 100 })
  entity!: string;

  @Column({ nullable: true })
  entityId!: string;

  @Column({ type: "simple-json", nullable: true })
  oldValue!: Record<string, unknown> | null;

  @Column({ type: "simple-json", nullable: true })
  newValue!: Record<string, unknown> | null;

  @Column({ type: "text", nullable: true })
  ipAddress!: string;

  @ManyToOne(() => User, (user) => user.auditLogs, { eager: true, nullable: true })
  @JoinColumn({ name: "userId" })
  user!: User | null;

  @Column({ nullable: true })
  userId!: string | null;

  @CreateDateColumn()
  createdAt!: Date;
}
