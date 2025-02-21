import debug from 'debug';
import bcrypt from 'bcrypt';
import { userdb } from '../models/user.js';
import { generateToken } from '../utils/generateToken.js';
import { generateQRCode } from '../utils/generateQR.js';
import { uploadFile } from "../utils/cloudinary.js";
import getUri from "../utils/dataUri.js";
const dbgr = debug("development:userController");

export const userRegister = async (req, res) => {
    try {
        let { email, fullname, contact, password, account_number } = req.body;
        if (!email || !fullname || !contact || !password || !account_number) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        let user = await userdb.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User email already exists",
                success: false
            });
        }

        //GENERATE QR CODE
        let buffer = generateQRCode(account_number);
        let fileUri = getUri(buffer);
        let cloudRes = await uploadFile(fileUri);

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                user = await userdb.create({
                    email,
                    fullname,
                    contact,
                    password: hash,
                    account_number,
                    qr : cloudRes.secure_url
                });
            });
        });

        return res.status(200).json({
            message: "User Created Successfully",
            success: true
        });
    }
    catch (err) {
        dbgr(err.message);
    }
}

export const userLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!password || !email) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        let user = await userdb.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Email or Password Incorrect",
                success: false
            });
        }

        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            return res.status(400).json({
                message: "Email or Password Incorrect",
                success: false
            });
        }

        user = {
            _id: user._id,
            email,
            account_number : user.account_number,
            balance: user.balance,
            fullname: user.fullname,
            contact: user.contact,
        }

        let token = generateToken(user);
        res.status(200).cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back, ${user.fullname}`,
            user,
            success: true
        });

    } catch (error) {
        dbgr(error.message);
    }
}

export const getbalance = async (req, res) => {
    try {
        const userId = req.id;
        let user = await userdb.findOne({ _id: userId });

        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                success: false
            });
        }

        return res.status(200).json({
            message: "User's balance fetched successfully",
            balance: user.balance,
            success: true
        })
    } catch (error) {
        dbgr(error.message);
    }
}

export const logoutUser = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "User logged out successfully",
            success: true
        });
    }
    catch (err) {
        dbgr(err.message);
    }
}
