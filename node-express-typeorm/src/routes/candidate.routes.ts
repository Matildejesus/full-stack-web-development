import { Router } from "express";
import { CandidateController } from "../controller/CandidateController";


const router  = Router();
const candidateController = new CandidateController();

router.get("/candidates", async (req, res) => {
    await candidateController.all(req, res);
});
router.get("/candidates", async (req, res) => {
    await candidateController.oneByUserId(req, res);
});

export default router;