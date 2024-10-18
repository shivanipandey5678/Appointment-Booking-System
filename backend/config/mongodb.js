import mongoose from 'mongoose';

const connectDB= async () =>{

   mongoose.connection.on('connected',()=>console.log("Database Connected at config-mongodb file"))
   await mongoose.connect(`${process.env.MONGODB_URL}`)
   
}

export default connectDB;