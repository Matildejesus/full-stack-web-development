import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Candidate } from "./Candidate";
import { Course } from "./Course";

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  application_Id: number;

  @ManyToOne(() => Candidate, (candidate) => candidate.applications)
  candidate: Candidate;
// candidateCandidateId,
  @ManyToOne(() => Course, (course) => course.course_Code)
  course: Course;
// courseCourseName

  @Column()
  email: string;

  @Column()
  previousRole: string;

  @Column()
  jobRole: string; // 'Tutor' or 'Lab Assistant'

  @Column()
  availability: string;

  @Column("simple-array")
  skills: string[];

  @Column()
  academic: string;
}
