import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    role : {
        type: String,
        enum : ["superadmin","support"],
        default : "support"
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const admindb = mongoose.model('Admin', adminSchema);