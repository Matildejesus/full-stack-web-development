import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm";
import { User } from "./User";
import { LecturerSelection } from "./LecturerSelection";
import { LecturerCourse } from "./LecturerCourse";

@Entity({ name: "lecturers" })
export class Lecturer {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @OneToOne(() => User, (user: User) => user.lecturer)
    @JoinColumn({ name: "user_id" })
    user: User;

    @OneToMany(() => LecturerCourse, (lecturerCourse: LecturerCourse) => lecturerCourse.lecturer)
    lecturerCourses: LecturerCourse[];

    @OneToMany(() => LecturerSelection, (lecturerSelection: LecturerSelection) => lecturerSelection.lecturer)
    lecturerSelections: LecturerSelection[];
}