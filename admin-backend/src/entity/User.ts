
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

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ name: "first_name", type: "varchar", length: 100 })
    firstName: string;

    @Column({ name: "last_name", type: "varchar", length: 100 })
    lastName: string;

    @Column({ unique: true, type: "varchar", length: 255 })
    email: string;

    @Column({ type: "varchar", length: 255 })
    password: string;
     
    @Column({ nullable: true, type: "varchar", length: 255 })
    avatarUrl: string;
    
    @Column({ type: "enum", enum: Role })
    role: Role;

    @OneToOne(() => Lecturer, (lecturer: Lecturer) => lecturer.user)
    lecturer: Lecturer;

    @OneToOne(() => Candidate, (candidate: Candidate) => candidate.user)
    candidate: Candidate;

    @OneToOne(() => Admin, (admin: Admin) => admin.user)
    admin: Admin;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;
}
