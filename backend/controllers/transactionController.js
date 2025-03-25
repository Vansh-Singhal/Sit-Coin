import debug from 'debug';
import mongoose from 'mongoose';
import { transactiondb } from '../models/transactions.js';
import { userdb } from '../models/user.js';
const dbgr = debug("development:transactionController");

export const transferMoney = async (req, res) => {
    try {
        const { amount, mode, contact, account_number } = req.body;
        const sender_id = req.id;

        if (!sender_id || !amount || amount <= 0 || !mode) {
            return res.status(400).json({ message: "Invalid transaction details", success: false });
        }

        // Find receiver based on contact or account number
        let receiver;
        if (contact) {
            receiver = await userdb.findOne({ contact });
        } else if (account_number) {
            receiver = await userdb.findOne({ account_number });
        } else {
            return res.status(400).json({ message: "Invalid transaction details", success: false });
        }

        if (!receiver) {
            return res.status(404).json({ message: "Receiver not found", success: false });
        }

        const receiver_id = receiver._id;

        const sender = await userdb.findById(sender_id);
        if (!sender) {
            return res.status(404).json({ message: "Sender not found", success: false });
        }



        // Check sufficient balance
        if (sender.balance < amount) {
            const transaction = await transactiondb.create({
                sender: sender_id,
                receiver: receiver_id,
                amount,
                mode,
                status: "failed"
            });
            return res.status(400).json({ message: "Insufficient balance", transaction, success: false });
        }

        // Deduct from sender and add to receiver
        sender.balance -= amount;
        receiver.balance += amount;

        // Save the updates
        await sender.save();
        await receiver.save();

        // Create transaction record
        const transaction = await transactiondb.create({
            sender: sender_id,
            receiver: receiver_id,
            amount,
            mode,
            status: "completed"
        });

        return res.status(200).json({ message: "Transaction successful", transaction, success: true });
    } catch (error) {
        dbgr(error);
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
        })
            .populate('sender', 'fullname') // Populating sender with selected fields
            .populate('receiver', 'fullname') // Populating receiver with selected fields
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Transactions fetched successfully",
            transactions,
            success: true
        });

    } catch (error) {
        console.error(error.message); // Used console.error for proper logging
        res.status(500).json({
            message: "Failed to fetch transactions",
            success: false
        });
    }
};
