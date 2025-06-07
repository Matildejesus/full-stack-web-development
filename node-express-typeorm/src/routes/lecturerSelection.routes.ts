import { Router } from "express";
import { LecturerSelectionController } from "../controller/LecturerSelectionController";

const router = Router();
const controller = new LecturerSelectionController();

router.post("/lecturer-selections", (req, res) => 
    controller.saveAll(req, res));
router.get("/lecturer-selections", async (req, res) => {
    controller.all(req, res);
});

export default router;
