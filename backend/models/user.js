import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email : {
        type : String,
        required : true
    },
    account_number: {
        type: Number,
        required: true,
    },
    qr : {
        type : String,
        required : true
    },
    balance: {
        type: Number,
        default: 100,
        required: true
    },
    contact: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const userdb = mongoose.model('User', userSchema);