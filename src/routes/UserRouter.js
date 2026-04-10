import express from "express";
import authMiddleware from "../middleware/auth.js";
import { CreateUser, UpdateUser, GetUser, DeleteUser } from "../controllers/userController.js";

const user = express.Router();

user.get("/", authMiddleware, GetUser);
user.post("/", authMiddleware, CreateUser);
user.put("/", authMiddleware, UpdateUser);
user.delete("/", authMiddleware, DeleteUser);

export default user