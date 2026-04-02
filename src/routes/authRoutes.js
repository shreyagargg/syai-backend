import express from "express";
import { User } from "../contollers/userController.js";
import authMiddleware from "../middleware/auth.js";

const AuthRouter = express.Router();

AuthRouter.post("/sync", authMiddleware, User);

export default AuthRouter;