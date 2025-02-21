import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    receiver : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    amount : {
        type : Number,
        required : true
    },
    mode : {
        type : String,
        enum : ["qr","contact","bank"],
        required : true,
    },
    date : {
        type : Date,
        default : Date.now()
    }
}, {timestamps:true} );

export const transactiondb = mongoose.model('Transactions',transactionSchema);