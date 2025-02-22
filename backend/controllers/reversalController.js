import debug from 'debug';
import mongoose from 'mongoose';
import { transactiondb } from '../models/transactions.js';
import { userdb } from '../models/user.js';
import { reversaldb } from '../models/reversals.js';
const dbgr = debug("development:reversalController");

export const requestReversal = async (req, res) => {
    try {
        const { transactionID, reason } = req.body;
        const requestedBy = req.id;

        const transaction = await transactiondb.findById(transactionID);
        if (!transaction) return res.status(404).json({
            message: "Transaction not found",
            success: false
        });

        // Ensure only sender can request reversal
        if (transaction.sender.toString() !== requestedBy) {
            return res.status(403).json({
                message: "Unauthorized request",
                success: false
            });
        }

        // Check if transaction is already reversed
        const existingReversal = await reversaldb.findOne({ transactionID });
        if (existingReversal) {
            return res.status(400).json({
                message: "Reversal already requested",
                success: false
            });
        }

        const reversal = await reversaldb.create({
            transactionID,
            user: requestedBy,
            reason
        });

        res.status(201).json({
            message: "Reversal request submitted",
            reversal,
            success: true
        });

    } catch (error) {
        dbgr(error.message);
    }
};

export const getUserReversals = async (req, res) => {
    try {
        const reversals = await reversaldb.find({ user: req.id }).sort({ createdAt: -1 });
        res.status(200).json({
            message: "Reversal requests fetched successfully",
            reversals,
            success: true
        });
    } catch (error) {
        dbgr(error.message);
    }
};

export const approveReversal = async (req, res) => {
    try {
        const { processedBy } = req.id;
        const reversal = await reversaldb.findById(req.params.id).populate({
            path: 'transactionID',  // Populate the transactionID field in the reversal
            populate: [
                {
                    path: 'sender',  // Populate sender in the transaction
                    model: 'User'    // Ensure it references the 'User' model
                },
                {
                    path: 'receiver',  // Populate receiver in the transaction
                    model: 'User'      // Ensure it references the 'User' model
                }
            ]
        });

        if (!reversal) {
            return res.status(404).json({
                message: "Reversal request not found",
                success: false
            });
        }

        const { transactionID } = reversal;

        if (!transactionID || !transactionID.sender || !transactionID.receiver) {
            return res.status(404).json({
                message: "Original transaction or user(s) not found",
                success: false
            });
        }

        const sender = transactionID.sender;
        const receiver = transactionID.receiver;

        // REFUND
        sender.balance += transactionID.amount;
        receiver.balance -= transactionID.amount;
        await sender.save();
        await receiver.save();

        transactionID.status = "reversed";
        await transactionID.save();
        reversal.status = "accepted";
        reversal.processedBy = processedBy;
        await reversal.save();

        res.status(200).json({
            message: "Reversal approved",
            reversal,
            success: true
        });

    } catch (error) {
        dbgr(error.message);
    }
};

export const declineReversal = async (req, res) => {
    try {
        const { processedBy } = req.id;
        const reversal = await reversaldb.findById(req.params.id);

        if (!reversal) return res.status(404).json({
            message: "Reversal request not found",
            success: false
        });

        reversal.status = "rejected";
        reversal.processedBy = processedBy;
        await reversal.save();

        res.status(200).json({
            message: "Reversal declined",
            reversal,
            success: true
        });

    } catch (error) {
       dbgr(error.message);
    }
};