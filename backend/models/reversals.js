import mongoose from "mongoose";

const reversalSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    transactionID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Transactions',
        required : true
    },
    reason : {
        type : String,
        required : true
    },
    processedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Admin'
    },
    status : {
        type : String,
        enum : ["pending","accepted","rejected"],
        default : "pending"
    }
}, { timestamps: true });

export const reversaldb = mongoose.model('Reversals',reversalSchema);