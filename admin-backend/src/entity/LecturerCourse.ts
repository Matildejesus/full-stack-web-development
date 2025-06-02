import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    Unique,
    PrimaryColumn,
} from "typeorm";
import { Lecturer } from "./Lecturer";
import { Course } from "./Course";
import { Semester } from "./Semester";

@Entity({ name: "lecturer_courses" })
@Unique(["lecturer", "course"])
export class LecturerCourse {
    @PrimaryColumn({ name: "lecturer_id" })
    lecturerId: number;

    @PrimaryColumn({ name: "course_id" })
    courseId: number;

    @ManyToOne(() => Lecturer, (lecturer) => lecturer.lecturerCourses)
    @JoinColumn({ name: "lecturer_id" })
    lecturer: Lecturer;

    @ManyToOne(() => Course, (course) => course.lecturerCourses, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: "course_id" })
    course: Course;

    @Column({ type: "enum", enum: Semester })
    semester: Semester; 
}
