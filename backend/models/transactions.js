import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    },
    status : {
        type : String,
        enum : ["completed","failed","reversed"],
        default : "failed",
        required : true
    },
    mode: {
        type: String,
        enum: ["qr", "contact", "bank"],
        required: true,
    }
}, { timestamps: true });

export const transactiondb = mongoose.model('Transactions', transactionSchema);