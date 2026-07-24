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
import { RefreshToken } from './RefreshToken';
@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ name: "first_name", length: 100 })
  firstname: string;
  @Column({ name: "last_name", length: 100 })
  lasetname: string;
  @Column({ unique: true, length: 100 })
  username: string;
  @Column({ unique: true, length: 150 })
  email: string;
  @Column({ length: 125 })
  password: string;
  @Column({ length: 30, nullable: true })
  phone: string;
  @Column({ name: "role_id" })
  roleId: number;
  @Column({ name: "is_active", default: true })
  isActive: boolean;
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role: Role;
  @OneToMany(()=>RefreshToken,(token)=>token.user)
  refreshToken:RefreshToken[]
}
