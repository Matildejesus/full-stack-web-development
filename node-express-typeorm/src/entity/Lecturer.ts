import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
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

    @OneToMany(() => Course, (course: Course) => course.lecturer)
    courses: Course[];

    @OneToMany(() => LecturerSelection, (lecturerSelection: LecturerSelection) => lecturerSelection.lecturer)
    lecturerSelections: LecturerSelection[];
}
