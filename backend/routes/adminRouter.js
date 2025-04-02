import express from 'express';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import { createAdmin, getAllReversals, getAllTransactions, getAllUsers, getUserReversals, loginAdmin } from '../controllers/adminController.js';
const reversalRouter = express.Router();


reversalRouter.post("/register", createAdmin);
reversalRouter.post("/login", loginAdmin);
reversalRouter.get("/reversals/get", isLoggedIn, getAllReversals);
reversalRouter.get("/users/get", isLoggedIn, getAllUsers);
reversalRouter.get("/transactions/get", isLoggedIn, getAllTransactions);
reversalRouter.get("/reversals/get/:id", isLoggedIn, getUserReversals);

export default reversalRouter;