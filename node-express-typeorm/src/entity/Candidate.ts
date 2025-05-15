import { 
    Entity, 
    Column, 
    OneToMany, 
    CreateDateColumn, 
    PrimaryGeneratedColumn }
    from "typeorm";
import { Application } from "./Application";

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  candidate_Id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  avatar_url: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Application, (app) => app.candidate)
  applications: Application[];
}
