import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Software } from "./Software";
import { Ticket } from "./Ticket";
import { Contract } from "./Contract";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 150 })
  companyName!: string;

  @Column({ length: 100 })
  contactFirstName!: string;

  @Column({ length: 100 })
  contactLastName!: string;

  @Column({ unique: true, length: 150 })
  email!: string;

  @Column({ length: 20, nullable: true })
  phone!: string;

  @Column({ nullable: true })
  address!: string;

  @Column({ length: 100, nullable: true })
  city!: string;

  @Column({ length: 100, nullable: true })
  country!: string;

  @Column({ length: 20, default: "active" })
  status!: string;

  @OneToMany(() => Software, (sw) => sw.client)
  software!: Software[];

  @OneToMany(() => Ticket, (ticket) => ticket.client)
  tickets!: Ticket[];

  @OneToMany(() => Contract, (contract) => contract.client)
  contracts!: Contract[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
