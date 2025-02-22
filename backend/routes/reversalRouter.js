import express from 'express';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import { approveReversal, declineReversal, getUserReversals, requestReversal } from '../controllers/reversalController.js';
const reversalRouter = express.Router();


reversalRouter.post("/create", isLoggedIn, requestReversal);
reversalRouter.get("/get/all", isLoggedIn, getUserReversals);
reversalRouter.get("/accept/:id", isLoggedIn, approveReversal);
reversalRouter.get("/decline/:id", isLoggedIn, declineReversal);

export default reversalRouter;