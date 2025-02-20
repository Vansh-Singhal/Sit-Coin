import debug from 'debug';
import { transactiondb } from '../models/transactions';

export const getAmount = (req, res) => {
    try {

    } catch (error) {
        dbgr(error.message);
    }
}

export const transferMoney = (req, res) => {
    try {
        const { amount, mode, receiver } = req.body;
        

    } catch (error) {
        dbgr(error.message);
    }
}