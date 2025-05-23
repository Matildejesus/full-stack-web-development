// import { Request, Response } from "express";
// import { AppDataSource } from "../data-source";
// import { Application } from "../entity/Application";
// import { Candidate } from "src/entity/Candidate";
// import { Course } from "src/entity/Course";

// export class ApplicationController {

//     private applicationRepository=AppDataSource.getRepository(Application);

//     /**
//      * Retrieves all application from the database
//      * @param request - Express request object
//      * @param response - Express response object
//      * @returns JSON response containing an array of all applications
//      */
//     async all(request: Request, response: Response) {
//         const applications = await this.applicationRepository.find({relations:["course"]});
//         const flattenedApplications = applications.map((app) => ({
//         ...app,
//         courseName: app.course.name
//     }));
//         // console.log("flatened appli",flattenedApplications)
//     return response.json(flattenedApplications);
//   }


//   /**
//    * Creates a new Application in the database
//    * @param request - Express request object containing Application details in body
//    * @param response - Express response object
//    * @returns JSON response containing the created Application or error message
//    */
//     async save(request: Request, response: Response) {
//         const { course, previousRole, email, role, availability, skills,academic  } = request.body;

//         try {
//             const applicationRepository = AppDataSource.getRepository(Application);
//             const candidateRepository = AppDataSource.getRepository(Candidate);
//             const courseRepository = AppDataSource.getRepository(Course);

//             const application = new Application();
//             application.role = role;
//             application.course = course;
//             application.availability = availability;
//             application.skills = skills;
//             application.academic = academic;
//             application.previousRole = previousRole;

//             const savedApplication = await applicationRepository.save(application);
//             return response.status(200).json(savedApplication);
//         } catch (error) {
//             console.log("Error in saving application",error)
//             return response
//                 .status(400)
//                 .json({ message: "Error saving Application", error });
//         }
//     }
// }
