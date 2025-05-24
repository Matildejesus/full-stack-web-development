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

}
