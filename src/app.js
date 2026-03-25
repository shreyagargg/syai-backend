import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import UserRouter from "./routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SSSSSyyyyyyyyyAAAAAAAAAAiiiiii!");
})

app.use("/api/v1/auth", UserRouter)

export { app };