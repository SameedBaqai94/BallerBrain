import jwt from "jsonwebtoken";

const secret_key = process.env.JWT_SECRET || "";

export const generateToken = async (payload: object): Promise<string> => {
    return await jwt.sign(payload, secret_key, { expiresIn: '30m' });
}
