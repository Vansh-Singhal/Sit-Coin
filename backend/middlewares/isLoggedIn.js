import jwt from "jsonwebtoken";
import debug from "debug";

const dbgr = debug("development:middlewares");

const isLoggedIn = async (req,res,next) => {
    try{
        const token = req.cookies.token;
        
        if (!token){
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        let decoded = jwt.verify(token, process.env.JWT_KEY);

        if (!decoded){
            return res.status(401).json({
                message: "Invalid Token",
                success: false
            });
        }

        req.id = decoded.id;
        next();
    }
    catch(err){
        dbgr(err.message);
    }
}

export default isLoggedIn;