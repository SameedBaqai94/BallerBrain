import express from "express";
import usersRoute from "./routes/UsersRoute";
import dotenv from 'dotenv';

const app = express();
const PORT = 3000;
dotenv.config();

app.use(express.json());
app.use("api/user", usersRoute);

app.listen(PORT, () => {
    console.log(`${PORT} is listening`);
})