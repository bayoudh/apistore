import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Client } from "./Client";
import { Software } from "./Software";

@Entity("contracts")
export class Contract {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, length: 20 })
  contractNumber!: string;

  @Column({ length: 150 })
  title!: string;

  @Column({ type: "text", nullable: true })
  description!: string;

  @Column({ length: 50, default: "active" })
  status!: string;

  @Column({ length: 50 })
  type!: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  value!: number;

  @Column({ type: "text", nullable: true })
  terms!: string;

  @ManyToOne(() => Client, (client) => client.contracts, { eager: true })
  @JoinColumn({ name: "clientId" })
  client!: Client;

  @Column()
  clientId!: string;

  @ManyToOne(() => Software, (sw) => sw.contracts, { eager: true, nullable: true })
  @JoinColumn({ name: "softwareId" })
  software!: Software | null;

  @Column({ nullable: true })
  softwareId!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
