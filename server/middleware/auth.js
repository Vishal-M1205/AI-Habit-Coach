import e from 'express';
import jwt from 'jsonwebtoken';

export async function auth(req,res,next){
    
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"No token provided"});
    }
    try {
    const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
    req.body.userId = tokenDecode.id;
    
    next();
    } catch (error) {
        return res.json({success:false,message:"Invalid token",error:error.message});
    }
    
}