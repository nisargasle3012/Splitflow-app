import express from "express";
import { auth } from "../../middleware/auth.js";
import { getGlobalBalance } from "./globalBalance.controller.js";

const router = express.Router();

router.get("/global", auth, getGlobalBalance);

export default router;
