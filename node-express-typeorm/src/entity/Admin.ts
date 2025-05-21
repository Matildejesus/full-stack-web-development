import {
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,

} from "typeorm";
import { User } from "./User";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user: User) => user.admin)
    @JoinColumn()
    user: User;
}