import { Router } from "express";
import { UserController } from "../controller/UserController";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { validateDto } from "../middlewares/validate";

const router = Router();
const userController = new UserController();

router.get("/users", async (req, res) => {
    await userController.all(req, res);
});

router.get("/users/:id", async (req, res) => {
    await userController.one(req, res);
});

router.post("/users", validateDto(CreateUserDTO), async (req, res) => {
    await userController.save(req, res);
});

router.put("/users/:id", async (req, res) => {
    await userController.update(req, res);
});

router.delete("/users/:id", async (req, res) => {
    await userController.remove(req, res);
});

router.post("/login", async (req, res) => {
    await userController.login(req, res);
});

router.post("/logout", async (req, res) => {
    await userController.logout(req, res);
});

export default router;
