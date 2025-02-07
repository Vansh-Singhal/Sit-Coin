import mongoose from "mongoose";

const reversalSchema = mongoose.Schema({
    date : {
        type : Date,
        default : Date.now()
    },
    transactionID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Transactions'
    },
    status : {
        type : String,
        enum : ["pending","accepted","rejected"],
        default : "pending"
    }
});

export const reversaldb = mongoose.model('Reversals',reversalSchema);