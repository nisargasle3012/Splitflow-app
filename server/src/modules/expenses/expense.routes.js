import express from "express";
import { auth } from "../../middleware/auth.js";
import { addExpense } from "./expense.controller.js";

const router = express.Router();

router.post("/:groupId/add", auth, addExpense);

export default router;
