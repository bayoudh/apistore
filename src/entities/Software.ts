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
import { Ticket } from "./Ticket";
import { Maintenance } from "./Maintenance";
import { Contract } from "./Contract";

@Entity("software")
export class Software {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 150 })
  name!: string;

  @Column({ length: 50 })
  version!: string;

  @Column({ length: 100, nullable: true })
  vendor!: string;

  @Column({ length: 50, default: "active" })
  status!: string;

  @Column({ type: "text", nullable: true })
  description!: string;

  @Column({ length: 50, nullable: true })
  licenseType!: string;

  @Column({ nullable: true })
  licenseExpiry!: Date;

  @ManyToOne(() => Client, (client) => client.software, { eager: true })
  @JoinColumn({ name: "clientId" })
  client!: Client;

  @Column()
  clientId!: string;

  @OneToMany(() => Ticket, (ticket) => ticket.software)
  tickets!: Ticket[];

  @OneToMany(() => Maintenance, (m) => m.software)
  maintenanceRecords!: Maintenance[];

  @OneToMany(() => Contract, (c) => c.software)
  contracts!: Contract[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
