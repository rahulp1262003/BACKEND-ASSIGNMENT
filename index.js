import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import offerRoutes from "./src/routes/offerRoutes.js";
import leadRoutes from "./src/routes/leadRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/offer", offerRoutes);
app.use("/leads", leadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
