import express from 'express';
import dotenv from 'dotenv';
import debug from 'debug';
import connectdb from './config/mongoose-connection.js';

const app = express();
const dbgr = debug("development:app");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    dbgr(`Server started at port ${PORT}`);
    connectdb();
});