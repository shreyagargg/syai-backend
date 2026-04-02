import express from "express";
import authMiddleware from "../middleware/auth.js";
import { User } from "../contollers/userController.js";

const user = express.Router();

user.get("register", authMiddleware, User);

export default user