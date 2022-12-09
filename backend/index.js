import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import router from "./src/routes/index.js";
const app = express();

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, ()=> console.log(`API running at ${process.env.PORT}`));