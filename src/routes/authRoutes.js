import express from "express";
import { is_user } from "../contollers/userController.js";

const UserRouter = express.Router();

UserRouter.get("/is_user", is_user);

export default UserRouter;