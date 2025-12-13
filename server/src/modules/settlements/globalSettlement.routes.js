import express from "express";
import { auth } from "../../middleware/auth.js";
import { initiateGlobalSettlement } from "./globalSettlement.controller.js";

const router = express.Router();

router.post("/initiate", auth, initiateGlobalSettlement);

export default router;
