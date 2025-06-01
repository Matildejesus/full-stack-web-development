import { Entity, Column, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Application } from "./Application";
import { LecturerCourse } from "./LecturerCourse";
import { Semester } from "./Semester";

@Entity({ name: "courses" })
@Unique(["name"])
@Unique(["code"])
@Unique(["code", "name"])
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
