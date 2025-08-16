
import Habit from '../models/habitModel.js';
export async function addHabit(req,res){
    const userId = req.body.userId;
    if(!userId) {
        return res.json({ success: false, message: "User ID is required" });
    }
    try {
         const {title, description, frequency} = req.body;
    const newHabit = {
        userId,
        title,
        description,
        frequency
    }
    const habit = await Habit.create(newHabit);
    res.json({ success: true, habit });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
   
}

export async function getHabits(req,res){
    const userId = req.body.userId;
    if(!userId) {
        return res.json({ success: false, message: "User ID is required" });
    }
    try {
        const habits = await Habit.find({ userId });
    res.json({ success: true, habits });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
    
}

export async function updateHabit(req,res) {
    const userId = req.body.userId;
    if(!userId){
        res.json({ success: false, message: "User ID is required" });
    }
    try {
        const id = req.params.id;
    const result = await Habit.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, habit: result });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
    
}

export async function deleteHabit(req,res) {
    const userId = req.body.userId;
    if(!userId){
        res.json({ success: false, message: "User ID is required" });
    }
    try {
        const id = req.params.id;
    const result = await Habit.findByIdAndDelete(id);
    res.json({ success: true, habit: result });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }

}
