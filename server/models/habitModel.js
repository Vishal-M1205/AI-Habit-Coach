import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    title:{
        type : String,
        required : true
    },
    description:{
        type : String,
    },
    frequency:{
        type : String,
        enum:["daily","weekly"],
        default : "daily"
    },
    progress:{
        type : Number,
        default : 0
    },
    streak:{
        type : Number,
        default : 0
    },
    createdAt:{
        type : Date,
        default : Date.now
    }

});
const Habit = mongoose.model('Habit',habitSchema);
export default Habit;