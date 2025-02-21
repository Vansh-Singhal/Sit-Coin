import debug from 'debug';
import { transactiondb } from '../models/transactions';

export const createTransaction = (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const transferMoney = (req, res) => {
    try {
        const { amount, mode, receiver } = req.body;
        

    } catch (error) {
        dbgr(error.message);
    }
}