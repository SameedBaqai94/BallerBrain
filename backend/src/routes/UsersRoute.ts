import { Router } from "express";
import { userCreateController, userSignInController } from "../controller/UsersController";

const router = Router();

router.post("/register", userCreateController);
router.get("/test", () => { console.log("testing") })
router.post("/signin", userSignInController);

export default router;