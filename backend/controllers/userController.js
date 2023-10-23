import validate from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../modals/userModel.js';
import jwt from 'jsonwebtoken';
//api to register user
const registerUser = async (req,res) => {
    try {
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"Please provide all fields"});
        }

        if(!validate.isEmail(email)){
            return res.json({message:"Please provide a valid email"});
        }

        if(password.length<8){
            return res.json({message:"Password should be at least 8 characters"});
        }

       

       
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const userData={
            name,
            email,
            password:hashedPassword
        }
        const newUser=new userModel(userData);
        await newUser.save();

        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
        res.status(201).json({success:true,message:"User registered successfully ",token});
    } catch (error) {
        console.log("userController",error);
        res.json({success:false,message:error.message})
    }
}


//api for login user
const loginUser = async (req,res) => {
    try {
        const {email,password}=req.body;
         const user = await userModel.findOne({email});
         if(!user){
            return res.json({message:'User not found'});
         }
         const isMatch = await bcrypt.compare(password,user.password);
         
        if(!isMatch){
                return res.json({success:false,message:'Invalid credentials'});
        }else{
            const token=  jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'});
            return res.json({success:true,token,message:'Login successful'});
        }
        

    } catch (error) {
        console.log("loginUserIssue",error.message);
        return res.json({success:false,message:error.message})
       
    }
}
export {registerUser,loginUser};