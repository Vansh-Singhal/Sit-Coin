import debug from 'debug';
import mongoose from 'mongoose';
import { transactiondb } from '../models/transactions.js';
import { userdb } from '../models/user.js';
const dbgr = debug("development:transactionController");

export const transferMoney = async (req, res) => {
    try {
        const { amount, mode, receiverId } = req.body;
        const senderId = req.id;

        // Validate inputs
        if (!senderId || !receiverId || !amount || amount <= 0 || !mode) {
            return res.status(400).json({
                message: "Invalid transaction details",
                success: false
            });
        }

        // Create the transaction first with a "failed" status by default
        let transaction = await transactiondb.create({
            sender: senderId,
            receiver: receiverId,
            amount,
            mode,
            status: "failed" // Default status as "failed"
        });

        // Find sender and receiver
        let sender = await userdb.findById(senderId);
        let receiver = await userdb.findById(receiverId);

        // Check if sender and receiver exist
        if (!sender || !receiver) {
            return res.status(404).json({
                message: "Sender or receiver not found",
                success: false
            });
        }

        // Check for sufficient balance
        if (sender.balance < amount) {
            return res.status(400).json({
                message: "Insufficient balance",
                success: false
            });
        }

        // Proceed with the transaction: deduct from sender and add to receiver
        sender.balance -= amount;
        receiver.balance += amount;

        // Update the transaction status to "completed"
        transaction.status = "completed";

        // Save the updated transaction and user balances
        await sender.save();
        await receiver.save();
        await transaction.save();

        res.status(201).json({
            message: "Transaction successful",
            transaction,
            success: true
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "An error occurred",
            success: false
        });
    }
};


export const verifyTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;

        // Now attempt to find the transaction by ID
        const transaction = await transactiondb.findOne({ _id: transactionId });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Transaction status fetched successfully",
            transaction,
            success: true
        });

    } catch (error) {
        dbgr(error.message);
    }
};

export const getUserTransactions = async (req, res) => {
    try {
        const transactions = await transactiondb.find({
            $or: [{ sender: req.id }, { receiver: req.id }]
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Transactions fetched successfully",
            transactions,
            success: true
        });

    } catch (error) {
        dbgr(error.message);
    }
};