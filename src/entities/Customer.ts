import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
@Entity("customers")
export class Customers {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ name: "first_name", length: 100, nullable: true })
  firstName: string;

  @Column({ name: "last_name", length: 100, nullable: true })
  lastName: string;

  @Column({ length: 30, nullable: true })
  phone: string;

  @Column({ length: 150, nullable: true })
  email: string;

  @Column({ type: "text", nullable: true })
  address: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
