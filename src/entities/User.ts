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
import { Role } from "./Role";
import { RefreshToken } from "./RefreshToken";
import { Ticket } from "./Ticket";
import { Comment } from "./Comment";
import { AuditLog } from "./AuditLog";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 100 })
  firstName!: string;

  @Column({ length: 100 })
  lastName!: string;

  @Column({ unique: true, length: 150 })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ length: 20, default: "active" })
  status!: string;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: "roleId" })
  role!: Role;

  @Column()
  roleId!: string;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshTokens!: RefreshToken[];

  @OneToMany(() => Ticket, (ticket) => ticket.assignedTechnician)
  assignedTickets!: Ticket[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments!: Comment[];

  @OneToMany(() => AuditLog, (log) => log.user)
  auditLogs!: AuditLog[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
