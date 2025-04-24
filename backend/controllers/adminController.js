import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary'
import Doctor from '../modals/doctorModel.js';
import userModel from '../modals/userModel.js';
import appointmentModel from '../modals/appointmentModel.js';
import jwt from 'jsonwebtoken';
//API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, experience, fees ,about,address,degree} = req.body;
        const imageFile = req.file;

        //checking all data for add-doctor
        if(!name || !email || !fees || !password || !speciality || !experience || !imageFile ||!about ||!degree) {
            return res.status(400).json({ message: 'All fields are required. Please ensure that name, email, fees, password, speciality, experience, image, about, and degree are provided.' });
        }  
        
          // Check if file exists
          if (imageFile === undefined) {
            return res.status(400).json({ message: 'Doctor image is required. Please upload a profile picture.' });
        }

        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'A doctor with this email already exists. Please use a different email.' });
        }
        

        //validating email format
        if(!validator.isEmail(email)){
            return res.status(400).json({ message: 'Invalid email format. Please enter a valid email address.' });
        }

        //validating password 
        if(password.length<8){
            return res.status(400).json({ message: 'Password must be at least 8 characters long. Please provide a stronger password.' });

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
  
        return res.status(201).json({ message: 'Doctor profile created successfully', doctor: newDoctor });


       
    } catch (error) {
        console.log(error);
        //returning error response to frontend
        return res.status(500).json({ message: 'An error occurred while adding the doctor. Please try again later.', error: error.message || 'Unknown error' });
    }
}

//api for admin login

const loginAdmin = async (req,res) => {
    console.log('Request Body:', req.body); // Log the request body
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required to log in. Please provide both.' });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({  data: process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD }, process.env.JWT_SECRET, { expiresIn: '30d' });
        return res.status(200).json({ message: 'Login successful', success: true, token });
    } else {
        return res.status(401).json({ message: 'Invalid credentials. Please check your email and password and try again.' });
    }
}


//api to get all doctors list for admin panel 
const allDoctors = async (req,res) => {
     try {
        const doctors = await Doctor.find({}).select('-password');
        res.status(200).json({ success: true, message: 'Doctor list retrieved successfully', doctors });
     } catch (error) {
        console.error('Error fetching doctors:', error.message);
        res.status(500).json({ success: false, message: 'Unable to retrieve doctors at the moment. Please try again later.' });
     }
}

//api for all appointment list

const appointmentsAdmin = async(req,res) => {
    try {
        
        const appointmentList=await appointmentModel.find({});
        if(!appointmentList){
            res.json({success:false,message:"issue in appointmentLis fetching"})
        }
        res.json({success:true,appointmentList})
       
        

    } catch (error) {
        console.log("adminController_error_appointment list");
        res.json({success:false,message:req.message})
    }

}

//api for appointment cancellation 

const appointmentCancel = async (req,res) => {
        try {
           
            const {appointmentId} = req.body;
            
            const appointmentData= await appointmentModel.findById(appointmentId)
            if(!appointmentData){
                return res.status(404).json({ success: false, message: 'Appointment not found. Please check the appointment ID and try again.' });
            }

            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true},{new:true});

            //releasing doctor slot 

            const {docId,slotDate,slotTime}= appointmentData;
            const docData= await Doctor.findById(docId);
            let slots_booked = docData.slot_booked;
            slots_booked[slotDate]= slots_booked[slotDate].filter((slot)=> slot!== slotTime);
            await Doctor.findByIdAndUpdate(docId,{slot_booked:slots_booked});
            res.status(200).json({ success: true, message: 'Appointment cancelled successfully and doctor slot released.' });

            } catch (error) {
                console.error('Error cancelling appointment:', error.message);
                res.status(500).json({ success: false, message: 'An error occurred while canceling the appointment. Please try again later.' });
            
        }
    }

    //API to get dashboard data for admin panel

    const adminDashboard = async (req,res) => {
        try {
            const doctors= await Doctor.find({});
            const users = await userModel.find({});
            const appointments = await appointmentModel.find({});

            const dashData={
                doctorsNumber:doctors.length,
                appointmentsNumber:appointments.length,
                usersNumber:users.length,
                latestAppointment:appointments.reverse().slice(0,5)

            }
            res.status(200).json({ success: true, message: 'Dashboard data retrieved successfully', dashData });
        } catch (error) {
            console.error('Error fetching dashboard data:', error.message);
            res.status(500).json({ success: false, message: 'Unable to fetch dashboard data. Please try again later.' });
            
        }
    }



export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard}

