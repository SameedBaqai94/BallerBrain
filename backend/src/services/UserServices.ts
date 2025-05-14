import { UserReadDto, UserSignInDto, UserWriteDto } from "../models/Users";
import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtUtils";

const prisma = new PrismaClient();

interface UserServiceResponseInterface {
    error?: string | UserWriteDto;
    response?: string | boolean;
}

export const createUserService = async (user: UserWriteDto): Promise<UserServiceResponseInterface> => {
    try {
        console.log("test");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        console.log(hashedPassword);

        const response = await prisma.users.create({
            data: {
                ...user,
                password: hashedPassword
            },
        })
        if (!response) {
            throw new Error("Failed to create user");
        }

        // const data = await response.json();
        return { response: "User Created" };
    } catch (error) {
        return { error: (error as Error).message };
    }
}

export const getUser = async (email: string): Promise<UserReadDto | null> => {

    const user = await prisma.users.findFirst({
        where: { email: email }
    })
    if (!user) {
        return null;
    }
    const returnUser = {
        name: user.name,
        email: user.email,
        password: user.password
    }
    return returnUser;


}
export const signInUser = async (password: string, passwordGiven: string): Promise<UserServiceResponseInterface> => {
    try {
        const comparePassword = await bcrypt.compare(passwordGiven, password);
        if (!comparePassword) {
            return { error: "User not logged in" };
        }
        return { response: true };
    }
    catch (error) {
        return { error: (error as Error).message };
    }
}