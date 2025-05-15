import { Entity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { Lecturer } from "./Lecturer";
import { Application } from "./Application";

@Entity()
export class Course {
  @Column()
  course_Id: number;

  @Column()
  course_Code: string;

  @PrimaryColumn()
  course_Name: string;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.courses)
  course_lecturer: Lecturer;

  // @OneToMany(() => Application)
  // applications: Application[];
}
