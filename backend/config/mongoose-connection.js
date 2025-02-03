import mongoose from "mongoose";
import debug from "debug";

const dbgr = debug("development:mongoose-connection");

let connectdb = async () => {
    try{
        mongoose.connect(process.env.MONGODB_URI);
        dbgr("Connection to mongoDB successful");
    }
    catch(err){
        dbgr(err.message);
    }
};

export default connectdb;