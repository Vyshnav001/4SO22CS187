import express from "express";

const app = express();
app.use(express.json());
import dotenv from "dotenv";
dotenv.config();
import numberRouter from "./routes/numbers";

const router = express.Router();

app.use("/api/v1/numbers", numberRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
