import { Router } from "express";
import { CourseController } from "../controller/courseController";

const router  = Router();
const courseController = new CourseController();

router.get("/courses", async (req, res) => {
    await courseController.all(req, res);
});

router.get("/courses/:id", async (req, res) => {
    await courseController.one(req, res);
});

export default router;