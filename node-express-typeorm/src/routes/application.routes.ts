import { Router } from "express";
import { ApplicationController } from "../controller/ApplicationController";

const router = Router();
const controller = new ApplicationController();

router.post("/applications", (req, res) => 
    controller.save(req, res)); // save  user application

router.get("/applications",async(req,res)=>{
    await controller.all(req,res);
});

router.patch(
  "/applications/:applicationId/selected",(req, res) => 
    controller.incrementSelectedCount(req, res)
);

export default router;
