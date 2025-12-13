import express from "express";
import { auth } from "../../middleware/auth.js";
import { createSettlement } from "./settlement.controller.js";

const router = express.Router();

router.post("/create", auth, createSettlement);

export default router;
