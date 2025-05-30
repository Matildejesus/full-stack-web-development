import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Application } from "./Application";
import { LecturerCourse } from "./LecturerCourse";
import { Semester } from "./Semester";

@Entity({ name: "courses" })
export class Course {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ name: "course_code", type: "varchar", length: 8 })
    code: string;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "enum", enum: Semester })
    semester: Semester;

    @OneToMany(() => Application, (application: Application) => application.course)
    applications: Application[];

    @OneToMany(() => LecturerCourse, (lecturerCourse) => lecturerCourse.course)
    lecturerCourses: LecturerCourse[];

}
