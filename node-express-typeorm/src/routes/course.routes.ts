import { Router } from "express";
import { CourseController } from "../controller/courseController";

const router  = Router();
const courseController = new CourseController

router.get("/courses", async (req, res) => {
    await courseController.all(req, res);
});

export default router;