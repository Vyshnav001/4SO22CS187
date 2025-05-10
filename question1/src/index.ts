import express from "express";
import dotenv from "dotenv";
import numberRouter from "./routes/numbers";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/v1/numbers", numberRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
