import { Router } from "express";
import { userCreateController, userSignInController } from "../controller/UsersController";

const router = Router();

router.post("/register", userCreateController);
router.post("/signin", userSignInController);

export default router;