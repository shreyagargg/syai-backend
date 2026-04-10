import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import UserProfileRouter from './routes/profileRoutes.js';
import UserRouter from "./routes/UserRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/users", UserProfileRouter);



app.get("/", (req, res) => {
  res.send("SSSSSyyyyyyyyyAAAAAAAAAAiiiiii!");
})

// app.use("/api/v1/auth", AuthRouter)

export { app };