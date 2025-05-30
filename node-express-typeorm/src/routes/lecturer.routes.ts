import { Router } from "express";
import { LecturerController } from "../controller/LecturerController";

const router = Router();
const lecturerController = new LecturerController();

router.get("/lecturers/:id", async (req, res) => {
    await lecturerController.one(req, res);
});

export default router;