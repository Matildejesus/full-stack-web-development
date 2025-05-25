import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Application } from "../entity/Application";
import { Candidate } from "../entity/Candidate";
import { Course } from "../entity/Course";
import { User } from "../entity/User";
export class ApplicationController {

    private applicationRepository=AppDataSource.getRepository(Application);

    /**
     * Retrieves all application from the database
     * @param request - Express request object
     * @param response - Express response object
     * @returns JSON response containing an array of all applications
     */
    async all(request: Request, response: Response) {
        const applications = await this.applicationRepository.find({relations:["course"]});
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
        const { course, previousRole, role, availability, skills,academic,userId  } = request.body;
        try {
            const applicationRepository = AppDataSource.getRepository(Application);
            
            const courseRepository = AppDataSource.getRepository(Course);
            const courseEntity = await courseRepository.findOneBy({ name: course });
            if (!courseEntity) {
                return response.status(404).json({ message: "Course not found" });
            }
            const candidateRepository = AppDataSource.getRepository(Candidate);
            const candidateEntity=await candidateRepository.findOneBy({id :userId})

            
            const application = new Application();
            application.role = role;
            application.course = courseEntity;
            application.availability = availability;
            application.skills = skills;
            application.academic = academic;
            application.previousRole = previousRole;
            if(candidateEntity!= null){
                application.candidate= candidateEntity;
            }
            

            const savedApplication = await applicationRepository.save(application);
            return response.status(200).json(savedApplication);
        } catch (error) {
            console.log("Error in saving application",error)
            return response
                .status(400)
                .json({ message: "Error saving Application", error });
        }
    }
}
