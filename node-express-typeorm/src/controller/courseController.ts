import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";
import { Request, Response } from "express";

export class CourseController {
    private courseRepository = AppDataSource.getRepository(Course);

    /**
    * Retrieves all profiles from the database
    * @param req - Express request object
    * @param res - Express response object
    * @returns JSON array of all profiles
    */
    async all(request: Request, response: Response) {
        const courses = await this.courseRepository.find();
        return response.json(courses);
    }

    async one(request: Request, response: Response) {
        const id = parseInt(request.params.id);
        const course = await this.courseRepository.findOne({
            where: { id },
        });

        if (!course) {
            return response.status(404).json({ message: "User not found" });
        }
        return response.json(course);
    }

}
