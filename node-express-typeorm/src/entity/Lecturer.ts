import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course";

@Entity()
export class Lecturer {
  @PrimaryGeneratedColumn()
  lecturer_Id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // @Column({ unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Course, (course) => course.course_Name)
  courses: Course[];
}
