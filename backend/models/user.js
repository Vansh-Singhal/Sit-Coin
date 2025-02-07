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
    contact : {
        type : Number,
        required : true,
    },
    password : {
        type: String,
        required: true,
    }
});

export const userdb = mongoose.model('User',userSchema);