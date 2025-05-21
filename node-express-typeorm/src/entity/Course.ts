import { Entity, Column, OneToOne, PrimaryColumn, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lecturer } from "./Lecturer";
import { Application } from "./Application";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @ManyToOne(() => Lecturer, (lecturer: Lecturer) => lecturer.courses)
    lecturer: Lecturer;

    @OneToMany(() => Application, (application: Application) => application.course)
    applications: Application[];

}
