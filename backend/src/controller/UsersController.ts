import { Request, Response } from "express";
import { UserSignInDto, UserWriteDto } from "../models/Users";
import { createUserService, getUser, signInUser } from "../services/UserServices";
import { generateToken } from "../utils/jwtUtils";

export const userCreateController = async (req: Request<{}, {}, UserWriteDto>, res: Response) => {
    try {
        const { name, email, password } = { ...req.body }
        if (name === "" || email === "" || password === "") {
            res.status(400).json({ error: "Please fill in the required fields" })
        }
        const createUser = await createUserService({ name, email, password });
        createUser.response ? res.status(200).json({ response: createUser.response }) : res.status(400).json({ error: createUser.error })
    }
    catch (error) {
        res.status(401).json({ error: (error as Error).message })
    }
}

export const userSignInController = async (req: Request<{}, {}, UserSignInDto>, res: Response) => {
    try {
        const { email, password } = { ...req.body };
        if (email === "" || password === "") {
            res.status(400).json({ error: "Please fill in the required fields" });
        }
        const user = await getUser(email);
        if (!user) {
            res.status(400).json({ error: "User not found" });
        }
        else {
            const signIn = await signInUser(user.password, password);

            signIn.response ? res.status(200).json({ response: { jwt: await generateToken({ test: "testing" }) } }) : res.status(401).json({ error: signIn.error })
        }

    } catch (error) {
        res.status(401).json({ error: (error as Error).message });
    }
}