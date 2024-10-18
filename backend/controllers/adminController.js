import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary'
import Doctor from '../modals/doctorModel.js';
import jwt from 'jsonwebtoken';
//API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, experience, fees ,about,address,degree} = req.body;
        const imageFile = req.file;

        //checking all data for add-doctor
        if(!name || !email || !fees || !password || !speciality || !experience || !imageFile ||!about ||!degree) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }   

        //validating email format
        if(!validator.isEmail(email)){
            return res.status(400).json({message:'Invalid email format'})

        }

        //validating password 
        if(password.length<8){
            return res.status(400).json({message:'please enter a password of minimum 8 characters'})

        }

        //hashing doctor password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //upload image to cloudinary

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'});
        const imageUrl= imageUpload.secure_url;

        const doctorData={
            name,
            email,
            password: hashPassword,
            image: imageUrl,
            speciality,
            experience,
            fees,
            degree,
            about,
            address:JSON.parse(address),
            date:Date.now()
        }

        

        const newDoctor = Doctor(doctorData);
        await newDoctor.save();
        console.log(newDoctor);
        //returning response to frontend
        res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });  


       
    } catch (error) {
        console.log(error);
        //returning error response to frontend
        res.status(500).json({ message: 'Error in adding doctor', error: error.message || 'An unknown error occurred' });
    }
}

//api for admin login

const loginAdmin = async (req,res) => {
    try {

        const {email,password}=req.body;

        if(email==process.env.ADMIN_EMAIL && password==process.env.ADMIN_PASSWORD){
            //creating token for admin
            const TOKEN = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({message:'Login successfull',token: TOKEN})

           
        }else{
            res.status(400).json({message:'Invalid credentials'})
        }
        
    } catch (error) {
        console.log(error);
        res.json({message:error.message})
        
    }
}





export {addDoctor,loginAdmin}

