import { Router } from "express";
import { LecturerCourseController } from "../controller/LecturerCourseController";

const router = Router();
const lecturerCourseController = new LecturerCourseController();

router.get("/lecturerCourses/:id", async (req, res) => {
    await lecturerCourseController.one(req, res);
});
router.get("/lecturerCourses/", async (req, res) => {
    await lecturerCourseController.all(req, res);
});

export default router;