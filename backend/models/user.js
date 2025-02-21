import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname : {
        type: String,
        required: true,
    },
    account_number : {
        type : Number,
        required : true,
    },
    amount : {
        type : Number,
        default : 100,
        required : true
    },
    contact : {
        type : Number,
        required : true,
    },
    password : {
        type: String,
        required: true,
    },
    transactions : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Transactions',
    }
});

export const userdb = mongoose.model('User',userSchema);