import express from "express";
import { auth } from "../../middleware/auth.js";
import { createGroup, getMyGroups } from "./group.controller.js";

const router = express.Router();

router.post("/create", auth, createGroup);
router.get("/mine", auth, getMyGroups);

export default router;
