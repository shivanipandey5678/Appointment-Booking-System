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
        // console.log(newDoctor);
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


//api to get all doctors list for admin panel 
const allDoctors = async (req,res) => {
     try {
        const doctors = await Doctor.find({}).select('-password');
        res.json({success:true, doctors});
     } catch (error) {
        console.log("adminController_error",error.message);
        res.json({success:false,message:error.message});
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
                return res.json({success:false,message:'Appointment not found'})
            }

            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true},{new:true});

            //releasing doctor slot 

            const {docId,slotDate,slotTime}= appointmentData;
            const docData= await Doctor.findById(docId);
            let slots_booked = docData.slot_booked;
            slots_booked[slotDate]= slots_booked[slotDate].filter((slot)=> slot!== slotTime);
            await Doctor.findByIdAndUpdate(docId,{slot_booked:slots_booked});
            res.json({success:true,message:'Appointment cancelled successfully'})

            } catch (error) {
            console.log("cancelAppointmentIssue", error.message);
            return res.json({ success: false, message: error.message })
            
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
            res.json({success:true,dashData})
        } catch (error) {
            console.log("adminDashboard at admincontroller",error.message)
            
        }
    }



export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard}

