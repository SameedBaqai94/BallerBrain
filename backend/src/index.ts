import express from "express";
import usersRoute from "./routes/UsersRoute";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/user", usersRoute);

app.listen(PORT, () => {
    console.log(`${PORT} is listening`);
})