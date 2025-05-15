import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();
const controller = new UserController();

router.post("/users", (req, res) => 
    controller.save(req, res)); // CREATE user

router.post("/login", (req, res) => 
    controller.login(req, res)); // LOGIN user

router.get("/usersByEmail", (req, res) => 
    controller.getUserByEmail(req, res)); //  user
router.get("/users", (req, res) => 
    controller.getAllUsers(req, res)); // 

export default router;
