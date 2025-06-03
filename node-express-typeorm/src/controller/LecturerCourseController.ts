import { LecturerCourse } from "../entity/LecturerCourse";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

export class LecturerCourseController {
    private lecturerCourseRepository = AppDataSource.getRepository(LecturerCourse);

    async one(request: Request, response: Response) {
        const id = parseInt(request.params.id);
        const lecturerCourse = await this.lecturerCourseRepository.find({
            where: { lecturer: { id } },
            relations: ["course"],
        });

        if (!lecturerCourse) {
            return response.status(404).json({ message: "User not found" });
        }
        return response.json(lecturerCourse);
    }
    async all(request: Request, response: Response) {
        const courses = await this.lecturerCourseRepository.find({relations:["lecturer","course"]});
        return response.json(courses);
    }
}