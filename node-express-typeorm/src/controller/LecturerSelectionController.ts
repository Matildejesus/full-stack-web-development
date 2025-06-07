import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { LecturerSelection } from "../entity/LecturerSelection";
import { Lecturer } from "../entity/Lecturer";
import { Application } from "../entity/Application";

export class LecturerSelectionController {
  private selectionRepo = AppDataSource.getRepository(LecturerSelection);
  private lecturerRepo = AppDataSource.getRepository(Lecturer);
  private appRepo = AppDataSource.getRepository(Application);

  async all(request: Request, response: Response) {
    const lecturerId = request.query.lecturerId as string | undefined;

    if (lecturerId) {
      const lecturerSelections = await this.selectionRepo.find({
        where: {
          lecturer: { id: Number(lecturerId) }
        },
        relations: ["lecturer", "application"],
      });
      return response.json(lecturerSelections);
    }

    // Otherwise, return all (or consider restricting)
    const allSelections = await this.selectionRepo.find({
      relations: ["lecturer", "application"],
    });
    return response.json(allSelections);
  }

  // Save or update all lecturer selections (bulk)
  async saveAll(req: Request, res: Response) {
    try {
      const selections = req.body as {
        lecturerId: number;
        applicationId: number;
        ranking: number;
        comment: string;
      }[];

      if (!Array.isArray(selections) || selections.length === 0) {
        return res.status(400).json({ message: "Array of selections required" });
      }

      const entities: LecturerSelection[] = [];

      for (const { lecturerId, applicationId, ranking, comment } of selections) {
        const lecturer = await this.lecturerRepo.findOneBy({ id: lecturerId });
        const application = await this.appRepo.findOneBy({ id: applicationId });

        if (!lecturer || !application) continue; // skip bad rows

        entities.push(
          this.selectionRepo.create({
            lecturer,
            application,
            ranking,
            comment,
          })
        );
      }

      await this.selectionRepo.upsert(entities, {
        conflictPaths: ["lecturer", "application"],
      });

      return res.status(201).json({ message: "Selections saved" });
    } catch (err) {
      console.error("Save Error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}