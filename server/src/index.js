import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./modules/users/user.routes.js";
import groupRoutes from "./modules/groups/group.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// Health check
app.get("/", (req, res) => res.send("API is running"));

app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
