import express from "express";
import { auth } from "../../middleware/auth.js";
import {
  acceptGlobalSettlement,
  rejectGlobalSettlement
} from "./globalSettlement.action.controller.js";

const router = express.Router();

router.post("/:settlementId/accept", auth, acceptGlobalSettlement);
router.post("/:settlementId/reject", auth, rejectGlobalSettlement);

export default router;
