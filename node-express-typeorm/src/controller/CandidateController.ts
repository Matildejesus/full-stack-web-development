import { AppDataSource } from "../data-source";
import { Candidate } from "../entity/Candidate";
import { Request, Response } from "express";

export class CandidateController {
    private candidateRepository = AppDataSource.getRepository(Candidate);

    /**
    * Retrieves all profiles from the database
    * @param req - Express request object
    * @param res - Express response object
    * @returns JSON array of all profiles
    */
    async all(request: Request, response: Response) {
        const candidates = await this.candidateRepository.find({relations:["user"]});
        return response.json(candidates);
    }
    /**
    * Retrieves  candisdat from the database
    * @param req - Express request object
    * @param res - Express response object
    * @returns JSON array of all profiles
    */
    async oneByUserId(request: Request, response: Response) {
    const userId = request.query.userId;

    if (!userId) {
        return response.status(400).json({ message: "Missing userId query param" });
    }

    try {
            const candidate = await this.candidateRepository.findOne({
                where: {
                    user: { id: Number(userId) }  // assuming relation
                },
                relations: ["user"]
            });

            if (!candidate) {
                return response.status(404).json({ message: "Candidate not found" });
            }

            return response.json(candidate);
        } catch (error) {
            console.error("Error fetching candidate by userId:", error);
            return response.status(500).json({ message: "Server error" });
        }
    }


}
