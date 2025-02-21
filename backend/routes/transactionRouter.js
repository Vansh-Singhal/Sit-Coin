import express from 'express';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import { getUserTransactions, transferMoney, verifyTransaction } from '../controllers/transactionController.js';
const transactionRouter = express.Router();

transactionRouter.get("/",isLoggedIn, (req,res) => {
    res.send("hi");
});

transactionRouter.post("/create", isLoggedIn, transferMoney);
transactionRouter.get("/verify/:id", isLoggedIn, verifyTransaction);
transactionRouter.get("/get/all", isLoggedIn, getUserTransactions);

export default transactionRouter;