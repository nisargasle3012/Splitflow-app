import express from "express";
import { auth } from "../../middleware/auth.js";
import {
  getInitiatedSettlements,
  getActionRequiredSettlements,
  getCompletedSettlements
} from "./globalSettlement.fetch.controller.js";

const router = express.Router();

router.get("/initiated", auth, getInitiatedSettlements);
router.get("/action-required", auth, getActionRequiredSettlements);
router.get("/completed", auth, getCompletedSettlements);

export default router;
