import { 
    Entity, 
    OneToOne, 
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToMany,
    Column
} from "typeorm";
import { Application } from "./Application";
import { User } from "./User";

@Entity({ name: "candidates" })
export class Candidate {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "boolean", default: false})
    blocked: Boolean;

    @Column({ type: "boolean", default: true })
    available: boolean;

    @OneToOne(() => User, (user: User) => user.candidate)
    @JoinColumn({ name: "user_id" })
    user: User;

    @OneToMany(() => Application, (application: Application) => application.candidate)
    applications: Application[];
}
