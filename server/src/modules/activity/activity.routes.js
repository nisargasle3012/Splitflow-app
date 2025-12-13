import express from "express";
import { auth } from "../../middleware/auth.js";
import { getme } from "./activity.controller.js";

const router = express.Router();

router.get("/me", auth, getme);

export default router;
