import { Entity, Column, OneToOne, PrimaryColumn, OneToMany, ManyToOne, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Lecturer } from "./Lecturer";
import { Application } from "./Application";

@Entity({ name: "courses" })
export class Course {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ name: "course_code", type: "varchar", length: 8 })
    code: string;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @ManyToMany(() => Lecturer, (lecturer: Lecturer) => lecturer.courses)
    lecturer: Lecturer;

    @OneToMany(() => Application, (application: Application) => application.course)
    applications: Application[];

}
