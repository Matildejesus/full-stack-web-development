import {
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,

} from "typeorm";
import { User } from "./User";

@Entity({ name: "admins"})
export class Admin {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @OneToOne(() => User, (user: User) => user.admin)
    @JoinColumn({ name: "user_id" })
    user: User;
}