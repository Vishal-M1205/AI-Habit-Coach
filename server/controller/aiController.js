import { generateResponse } from "../services/googleApi.js";
import Habit from "../models/habitModel.js";

export async function handleResponse(req,res){
    const userId = req.body.userId;
    if(!userId){
        res.json({success:false,message:"Invalid user ID"})
    }
    try {
        const habit = await Habit.find({userId});
        console.log(habit);
        if(!habit){
           
            return res.json({success:false,message:"No habit found for this user"});
        }
        const prompt = `
        User prompt: ${req.body.prompt}
        User habits: ${habit.map(h => `${h.title} (Progress: ${h.progress}) - Streak: ${h.streak} Created at ${h.createdAt}`).join("\n")}
        `;
        const response = await generateResponse(prompt);
        return res.json({success:true,message:"Response generated successfully",data:response});
    } catch (error) {
        return res.json({success:false,message:"Error generating response",error:error.message});
    }
}