import { UserWriteDto } from "../models/Users";
import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface UserServiceResponseInterface {
    error?: string | UserWriteDto;
    response?: string;
}

export const createUserService = async (user: UserWriteDto): Promise<UserServiceResponseInterface> => {
    try {
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

export const getUser = async (email: string): Promise<UserWriteDto> => {

    const user = await prisma.users.findFirst({
        where: { email: email }
    })
    const returnUser = {
        name: user?.name,
        email: user.email,
        password: user.password
    }
    return returnUser;

}
export const signInUser = async (password: string): Promise<UserServiceResponseInterface> => {
    try {
        return { response: "User logged in" };
    }
    catch (error) {
        return { error: (error as Error).message };
    }
}