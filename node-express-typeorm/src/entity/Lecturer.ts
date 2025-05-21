import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { Course } from "./Course";
import { LecturerSelection } from "./LecturerSelection";

@Entity()
export class Lecturer {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user: User) => user.lecturer)
    @JoinColumn()
    user: User;

    @OneToMany(() => Course, (course: Course) => course.lecturer)
    courses: Course[];

    @OneToMany(() => LecturerSelection, (lecturerSelection: LecturerSelection) => lecturerSelection.lecturer)
    lecturerSelections: LecturerSelection[];
}
