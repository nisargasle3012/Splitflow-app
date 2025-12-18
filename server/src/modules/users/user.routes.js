import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} from "./user.controller.js";
import { auth } from "../../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", auth, getMe);

export default router;
