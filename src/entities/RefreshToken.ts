import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { User } from "./Users";
@Entity("refresh_token")
export class RefreshToken {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ name: "user_id" })
    userid: string;
    @Column({ type: "text" })
    token: string;
    @Column({ name: "expires_at", type: "timestamp" })
    expiresAt: Date;

    @Column({ default: false })
    revoked: boolean;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
    @ManyToOne(()=>User,(user)=>user.refreshToken,{onDelete:'CASCADE'})
    @JoinColumn({name:'user_id'})
    user:User;
}
