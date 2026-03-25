import express from "express";
import { is_user } from "../contollers/userController.js";
import authMiddleware from "../middleware/auth.js";

const UserRouter = express.Router();

UserRouter.get("/is_user", authMiddleware, is_user);

export default UserRouter;