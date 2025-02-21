import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import debug from 'debug';
import connectdb from './config/mongoose-connection.js';

import userRouter from "./routes/userRouter.js";

const app = express();
const dbgr = debug("development:app");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/user",userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    dbgr(`Server started at port ${PORT}`);
    connectdb();
});