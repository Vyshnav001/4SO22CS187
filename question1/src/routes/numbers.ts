import express from "express";
import { fetchNumberAndCalculate } from "../controllers/number.contoller";
const router = express.Router();

router.get("/:numberid", async (req, res) => {
    const { numberid } = req.params;
    try {
        const number = await fetchNumberAndCalculate(numberid);
        res.status(200).json(number);
    } catch (error) {
        console.error("Error fetching number:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
