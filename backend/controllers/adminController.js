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
        
          // Check if file exists
          if (imageFile === undefined) {
            return res.status(400).json({ success: false, message: 'Image is required' });
        }

        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor with this email already exists' });
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
        return res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });  


       
    } catch (error) {
        console.log(error);
        //returning error response to frontend
        return res.status(500).json({ message: 'Error in adding doctor', error: error.message || 'An unknown error occurred' });
    }
}

//api for admin login

const loginAdmin = async (req,res) => {
    console.log('Request Body:', req.body); // Log the request body
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({  data: process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD }, process.env.JWT_SECRET, { expiresIn: '30d' });
        return res.status(200).json({ success: true, token });
    } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
}


export {addDoctor,loginAdmin}

