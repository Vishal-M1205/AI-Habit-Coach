import { generateResponse } from "../services/googleApi.js";
import Habit from "../models/habitModel.js";

// handleResponse now receives the full conversation history
export async function handleResponse(req,res){
    const userId = req.user?.id;

    if(!userId){
        return res.json({success:false,message:"Invalid user ID"});
    }
    try {
        const { history } = req.body;
        const habit = await Habit.find({userId});
        
        if(!habit){
           
            return res.json({success:false,message:"No habit found for this user"});
        }
        const habitsInfo = `User habits: ${habit.map(h => `${h.title} (Progress: ${h.progress}) - Streak: ${h.streak} Created at ${h.createdAt}`).join("\n")}`;
        
        const response = await generateResponse(history, habitsInfo);
        return res.json({success:true,message:"Response generated successfully",data:response});
    } catch (error) {
        return res.json({success:false,message:"Error generating response",error:error.message});
    }
}