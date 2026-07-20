import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from './Users';
@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true, length: 50 })
    name: string;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    @OneToMany(()=>User,(user)=>user.role)
    users:User[];
}