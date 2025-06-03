import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    Unique, 
    OneToMany,
    JoinColumn
} from "typeorm";
import { Candidate } from "./Candidate";
import { Course } from "./Course";
import { LecturerSelection } from "./LecturerSelection";
import { Semester } from "./Semester";

export enum Availability {
    FULL_TIME = 'full-time',
    PART_TIME = 'part-time',
    CONTRACT = 'contract',
}

export enum AppRole {
    TUTOR = "tutor",
    LAB_ASSISTANT = "lab_assistant",
}

@Entity({ name: "applications" })
@Unique(["candidate", "course","role"])
export class Application {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @ManyToOne(() => Candidate, (candidate) => candidate.applications)
    @JoinColumn({ name: "candidate_id" })
    candidate: Candidate;
   
    @ManyToOne(() => Course, (course) => course.applications)
    @JoinColumn({ name: "course_id" })
    course: Course;

     @Column()
    previousRole: string;

    @Column({ type: "enum", enum: AppRole })
    role: AppRole;

    @Column({ type: "enum", enum: Availability,
    })
    availability: Availability;

    @Column("simple-array")
    skills: string[];

    @Column({ type: "enum", enum: Semester })
    semester: Semester;

    @Column()
    academic: string;

    @Column({ default: 0 })
    selected_count: number;

    @OneToMany(() => LecturerSelection, (lecturerSelection: LecturerSelection) => lecturerSelection.application)
    lecturerSelections: LecturerSelection[];
}
