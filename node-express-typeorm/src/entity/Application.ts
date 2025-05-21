import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    Unique, 
    OneToMany
} from "typeorm";
import { Candidate } from "./Candidate";
import { Course } from "./Course";
import { LecturerSelection } from "./LecturerSelection";

export enum Availability {
    FULL_TIME = 'full-time',
    PART_TIME = 'part-time',
    CONTRACT = 'contract',
}

@Entity()
@Unique(["candidate", "course"])
export class Application {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Candidate, (candidate) => candidate.applications)
    candidate: Candidate;
   
    @ManyToOne(() => Course, (course) => course.applications)
    course: Course;

     @Column()
    previousRole: string;

    @Column()
    jobRole: string;

    @Column({
        type: "enum",
        enum: Availability,
    })
    availability: Availability;

    @Column("simple-array")
    skills: string[];

    @Column()
    academic: string;

    @Column({ default: 0 })
    selected_count: number;

    @OneToMany(() => LecturerSelection, (lecturerSelection: LecturerSelection) => lecturerSelection.application)
    lecturerSelections: LecturerSelection[];
}
