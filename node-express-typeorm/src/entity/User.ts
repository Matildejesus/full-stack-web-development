
import { 
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Lecturer } from "./Lecturer";
import { Candidate } from "./Candidate";
import { Admin } from "./Admin";
    
export enum Role {
    ADMIN = 'admin',
    CANDIDATE = 'candidate',
    LECTURER = 'lecturer',
}


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
     
    @Column({ nullable: true})
    avatarUrl: string;
    
    @Column({ 
        type: "enum",
         enum: Role })
    role: Role;

    @OneToOne(() => Lecturer, (lecturer: Lecturer) => lecturer.user)
    lecturer: Lecturer;

    @OneToOne(() => Candidate, (candidate: Candidate) => candidate.user)
    candidate: Candidate;

    @OneToOne(() => Admin, (admin: Admin) => admin.user)
    admin: Admin;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
