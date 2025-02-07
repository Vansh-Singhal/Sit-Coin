import debug from 'debug';
import bcrypt from 'bcrypt';
import { userdb } from '../models/user.js';
const dbgr = debug("development:userController");

export const userRegister = async (req,res) => {
    try{
        let {fullname, contact, password, account_number} = req.body;
        if (!fullname || !contact || !password || !account_number){
            return res.status(400).json({
                message : "Something is missing",
                success : false
            });
        }

        let user = await userdb.findOne({account_number});
        if (user){
            return res.status(400).json({
                message: "User email already exists",
                success: false
            });
        }

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async (err,hash) => {
                user = await userdb.create({
                    fullname,
                    contact,
                    password : hash,
                    account_number
                });
            });
        });

        return res.status(200).json({
            message : "User Created Successfully",
            success : true 
        });
    }
    catch(err){
        dbgr(err.message);
    }
} 