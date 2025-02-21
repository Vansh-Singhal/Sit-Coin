import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import debug from 'debug';
const dbgr = debug("development:cloudinary");
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadFile = async (fileUri) => {
    try{
        let cloudRes = await cloudinary.uploader.upload(fileUri.content);
        return cloudRes;
    }
    catch(err){
        dbgr(err.message);
    }
}
