import { 
    Entity, 
    OneToOne, 
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToMany
} from "typeorm";
import { Application } from "./Application";
import { User } from "./User";

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user: User) => user.candidate)
  @JoinColumn()
  user: User;

  @OneToMany(() => Application, (application: Application) => application.candidate)
  applications: Application[];
}
