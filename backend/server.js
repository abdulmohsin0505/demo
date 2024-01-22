import express from "express";
import cors from "cors"
const app = express();
import Connection from "./database/db.js";
import { User } from "./models/user.js";
import corsOptions from "./config/corsOption.js";
import dotenv from "dotenv";
import jwt, { decode } from "jsonwebtoken";
import cookieParser from "cookie-parser"
const port = process.env.port || 3000


dotenv.config()
// it will convert the data that we pass from frontend into json
app.use(express.json()) 
app.use(cookieParser())

// cross origin resource sharing
app.use(cors({
    origin : ["http://localhost:5173"],
    // methods : ["POST","GET"],
    credentials : true
}))

// app.use(cors(corsOptions))

//database
Connection()

app.post("/register",async(req,res) => {
    const {username,email,password} = req.body;
    await User.create({username,email,password})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.post("/login",async(req,res) => {
    const {email,password} = req.body;
   try {
    const user = await User.findOne({email})
   if(user){
    const accessToken = await jwt.sign(
        {email : email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : '1m'}
        );
    const refreshToken = await jwt.sign(
            {email : email},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn : '5m'}
        );
    res.cookie('accessToken',accessToken,{maxAge : 60000})
    res.cookie('refreshToken',refreshToken,{maxAge : 3000000,httpOnly : true,secure : true,sameSite : 'strict'})
    res.json("login successful")
   }else{
    res.json("No user found")
   }
   } catch (err) {
    res.json(err)
   }
})

const verifyUser = (req,res,next) => {
    const accessToken = req.cookies.accessToken;
    if(!accessToken){
        if(renewToken(req,res)){
            next()
        }
    }else{
        jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET,(err,decode) => {
            if(err){
                return res.json({valid : false , message : "Invalid Token"})
            }else{
                res.email = decode.email
                next()
            }
        })
    }
}

const renewToken = (req,res) => {
    const refreshToken = req.cookies.accessToken;
    let exist = false;
    if(!refreshToken){
        res.json({valid : false, message : "No refresh token"})
    }else{
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decoded) => {
            if(err){
                return res.json({valid : false , message : "Invalid refresh token"})
            }else{
                const accessToken = jwt.sign(
                    {email : decoded.email},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn : '1m'}
                    );
                res.cookie('accessToken',accessToken,{maxAge : 60000})
                exist = true

            }
        })
    }
    return exist
}
app.get('/dashboard',verifyUser,(req,res) => {
    return res.json({login : true,message : "authorized"})
})

app.listen(port, () => console.log("server running on 3000"));
