import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import AuthRouter from "./routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SSSSSyyyyyyyyyAAAAAAAAAAiiiiii!");
})

app.use("/api/v1/users", AuthRouter)

export { app };