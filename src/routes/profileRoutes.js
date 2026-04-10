import express from "express";
import { CreateProfile, UpdateProfile, DeleteProfile, GetProfile } from "../controllers/userProfileController.js";

const UserProfileRouter = express.Router();

UserProfileRouter.get("/profile", GetProfile);
UserProfileRouter.post("/profile", CreateProfile);
UserProfileRouter.put("/profile", UpdateProfile);
UserProfileRouter.delete("/profile", DeleteProfile);

export default UserProfileRouter