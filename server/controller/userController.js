import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function signup(req,res){
    
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const userData = {
            name,email,password:hashedPassword
        }
        const user = await User.create(userData);
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.json({
            success:true,token,user:user.name,message:"User created successfully"
        })


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in creating user",error:error.message});

    }
}

export async function login(req,res){

    try {
        const {email,password}= req.body;
        if(!email || !password){
            res.json({success:false,message:"All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            res.json({success:false,message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch){
            res.json({success:false,message:"Invalid credentials"});
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.json({success:true,message:"Login successful",token,user:user.name});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in login",error:error.message});
    }
}