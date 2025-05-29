import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Lecturer } from "../entity/Lecturer";

export class LecturerController {
    private lecturerRepository = AppDataSource.getRepository(Lecturer);

    async getLecturerCourses(request: Request, response: Response) {
        const id = parseInt(request.params.id);

        try {
            const lecturer = await this.lecturerRepository.findOne({
                where: { user: { id } },
                relations: ["courses"],        
            });

            if (!lecturer) {
                return response.status(404).json({ message: "Lecturer not found" });
            }
            return response.json({ courses: lecturer.courses });
        } catch (error) {
            console.error("Error fetching lecturer courses by id:", error);
            return response.status(500).json({ message: "Server error" });
        }
    }
}