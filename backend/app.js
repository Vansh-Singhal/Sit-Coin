import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";
import debug from 'debug';
import connectdb from './config/mongoose-connection.js';

import userRouter from "./routes/userRouter.js";
import transactionRouter from './routes/transactionRouter.js';
import reversalRouter from './routes/reversalRouter.js';
import adminRouter from './routes/adminRouter.js';
import path from 'path';

const app = express();
const dbgr = debug("development:app");
dotenv.config();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOption = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOption));

app.use("/api/user", userRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/reversal", reversalRouter);
app.use("/api/admin", adminRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    dbgr(`Server started at port ${PORT}`);
    connectdb();
});