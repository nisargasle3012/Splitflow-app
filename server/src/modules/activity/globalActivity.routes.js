import express from "express";
import { auth } from "../../middleware/auth.js";
import { getGlobalActivity } from "./globalActivity.controller.js";

const router = express.Router();

router.get("/global", auth, getGlobalActivity);

export default router;
