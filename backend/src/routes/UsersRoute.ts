import { Router } from "express";
import { userCreateController } from "../controller/UsersController";

const router = Router();

router.post("/register", userCreateController);

export default router;