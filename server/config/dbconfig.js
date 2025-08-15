import mongoose from 'mongoose';

async function connectDB(){
    mongoose.connection.on('connected',()=>{
        console.log('connected');
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/habit`);
}

export default connectDB();

