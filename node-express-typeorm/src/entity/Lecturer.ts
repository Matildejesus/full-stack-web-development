import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm";
import { User } from "./User";
import { Course } from "./Course";
import { LecturerSelection } from "./LecturerSelection";

@Entity({ name: "lecturers" })
export class Lecturer {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @OneToOne(() => User, (user: User) => user.lecturer)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToMany(() => Course, (course: Course) => course.lecturers)
    courses: Course[];

    @OneToMany(() => LecturerSelection, (lecturerSelection: LecturerSelection) => lecturerSelection.lecturer)
    lecturerSelections: LecturerSelection[];
}
