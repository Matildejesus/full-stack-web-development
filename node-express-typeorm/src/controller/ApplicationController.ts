import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Application } from "../entity/Application";
import { Candidate } from "../entity/Candidate";
import { Course } from "../entity/Course";
import { User } from "../entity/User";
export class ApplicationController {

    private applicationRepository = AppDataSource.getRepository(Application);

    /**
     * Retrieves all application from the database
     * @param request - Express request object
     * @param response - Express response object
     * @returns JSON response containing an array of all applications
     */
    async all(request: Request, response: Response) {
        const applications = await this.applicationRepository.find({ relations: ["course", "candidate"] });
        const flattenedApplications = applications.map((app) => ({
            ...app,
            // courseName: app.course
        }));
        // console.log("flatened appli",flattenedApplications)
        return response.json(flattenedApplications);
    }


    /**
     * Creates a new Application in the database
     * @param request - Express request object containing Application details in body
     * @param response - Express response object
     * @returns JSON response containing the created Application or error message
     */
    async save(request: Request, response: Response) {
        const { course, previousRole, role, availability, skills, academic, candidateId,semester } = request.body;
        try {
            const applicationRepository = AppDataSource.getRepository(Application);

            const courseRepository = AppDataSource.getRepository(Course);
            const courseEntity = await courseRepository.findOneBy({ name: course });
            if (!courseEntity) {
                return response.status(404).json({ message: "Course not found" });
            }
            // const candidateRepository = AppDataSource.getRepository(Candidate);
            // const candidateEntity=await candidateRepository.findOne({
            //    where:{user: {id :userId}} , relations:["user"],
            // }
            //     );
            // console.log("Candidate Enity is ",candidateEntity)
            // if (!candidateEntity) {
            //     return response.status(404).json({ message: "Candidate not found" });
            // }

            const application = new Application();
            application.role = role;
            application.course = courseEntity;
            application.availability = availability;
            application.skills = skills;
            application.academic = academic;
            application.previousRole = previousRole;
            application.candidate = candidateId;
            application.semester=semester
            // if(candidateEntity!= null){
            //     application.candidate= candidateEntity;
            // }


            const savedApplication = await applicationRepository.save(application);
            return response.status(200).json(savedApplication);
        } catch (error) {
            console.log("Error in saving application", error)
            return response
                .status(400)
                .json({ message: "Error saving Application", error });
        }
    }
    /* src/controller/ApplicationController.ts */

    async incrementSelectedCount(req: Request, res: Response) {
    try {
        const { applicationId } = req.params;       // URL /applications/:applicationId/selected
        const incrementBy = Number(req.body.increment ?? 1); // default +1

        const repo = AppDataSource.getRepository(Application);
        const application = await repo.findOneBy({ id: +applicationId });

        if (!application) {
        return res.status(404).json({ message: "Application not found" });
        }

        application.selectedCount = (application.selectedCount || 0) + incrementBy;
        await repo.save(application);

        return res.json({ success: true, application });
    } catch (err) {
        console.error("incrementSelectedCount error:", err);
        return res.status(500).json({ message: "Server error" });
    }
    }


}
