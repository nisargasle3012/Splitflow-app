import express from "express";
import { auth } from "../../middleware/auth.js";
import { getGroupBalance } from "./balance.controller.js";

const router = express.Router();

router.get("/:groupId", auth, getGroupBalance);

export default router;
