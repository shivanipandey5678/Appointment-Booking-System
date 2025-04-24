import validate from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../modals/userModel.js';
import doctorModel from '../modals/doctorModel.js'
import appointmentModel from '../modals/appointmentModel.js';
import jwt from 'jsonwebtoken';



import {v2 as cloudinary} from 'cloudinary';
//api to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        if (!validate.isEmail(email)) {
            return res.json({ message: "Please provide a valid email" });
        }

        if (password.length < 8) {
            return res.json({ message: "Password should be at least 8 characters" });
        }




        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }
        const newUser = new userModel(userData);
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        res.status(201).json({ success: true, message: "User registered successfully ", token });
    } catch (error) {
        console.log("userController", error);
        res.json({ success: false, message: error.message })
    }
}


//api for login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
            return res.json({ success: true, token, message: 'Login successful' });
        }


    } catch (error) {
        console.log("loginUserIssue", error.message);
        return res.json({ success: false, message: error.message })

    }
}


//API TO GET USER PROFILE DATA
const getProfile = async (req, res) => {
    try {
        const userId = req.user;
        // console.log(userId, "userId");
        const user = await userModel.findById(userId).select('-password');
        // console.log("userFound", user);
        if (user) {
            return res.json({ success: true, user });
        } else {
            return res.json({ success: false, message: 'User not found' });
        }


    } catch (error) {
        console.log("getProfileIssue", error.message);
        return res.json({ success: false, message: error.message })
    }
}

//API TO UPDATE USER PROFILE

const updateProfile = async (req, res) => {
    try {
        const userId = req.user;
        const { name, phone, address, dob,gender ,email} = req.body;
        const imageFile = req.file;
        if (!userId || !name || !phone || !address || !dob ||!gender) {
            return res.json({ success: false, message: 'Data Missing' });

        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender });
        if(imageFile){

            //upload image to cloudinary
            const imageUpload= await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'});
            const imageURL= imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId,{image:imageURL});
           
        }
        return res.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.log("updateProfileIssue", error.message);
        return res.json({ success: false, message: error.message })

    }
}

//API to book appointment

const bookAppointment = async (req,res) => {
    try {
         const userId = req.user;
         const {docId,slotDate,slotTime} = req.body;

         const docData= await doctorModel.findById(docId).select(['-password']);

         if(!docData){
            return res.json({sucess:false,message:'Doctor not found'})
         }

         if(!docData.available){
            return res.json({sucess:false,message:'Doctor not available'})
         }

         //checking for slot availability
         let slots_booked=docData.slot_booked
         console.log(slots_booked, "slots_booked");

         if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:'Slot not available'})
            }else{
                slots_booked[slotDate].push(slotTime)

            }
         }else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)
         }

         const userData= await userModel.findById(userId).select(['-password']);
         delete docData.slots_booked;

         const appointmentData={
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount:docData.fees,
            date:Date.now()
         }

         const appointment= new appointmentModel(appointmentData);
         await appointment.save();

         //save new slot data in docData

         await doctorModel.findByIdAndUpdate(docId,{slot_booked:slots_booked});
         res.json({success:true,message:'Appointment booked successfully',appointment});







    } catch (error) {
        console.log("bookAppointmentIssue", error.message);
        return res.json({ success: false, message: error.message })
    }

}

    //api to get user appointment from frontend

    const listAppointment = async (req,res) => {
        try {
            const userId =req.user;
            console.log(userId, "userId at list appointment in user controller");
            if(!userId){
                return res.json({success:false,message:'User not found'})
            }
            const appointments = await appointmentModel.find({userId});
            res.json({success:true,appointments});

        } catch (error) {
            console.log("listAppointmentIssue", error.message);
            return res.json({ success: false, message: error.message })
        }
    }


    //API to cancel appointment

    const cancelAppointment = async (req,res) => {
        try {
            const userId= req.user;
            const {appointmentId} = req.body;
            
            const appointmentData= await appointmentModel.findById(appointmentId)
            if(!appointmentData){
                return res.json({success:false,message:'Appointment not found'})
            }

            if(appointmentData.userId!== userId){
                return res.json({success:false,message:'Unauthorized access'})


            }

            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true},{new:true});

            //releasing doctor slot 

            const {docId,slotDate,slotTime}= appointmentData;
            const docData= await doctorModel.findById(docId);
            let slots_booked = docData.slot_booked;
            slots_booked[slotDate]= slots_booked[slotDate].filter((slot)=> slot!== slotTime);
            await doctorModel.findByIdAndUpdate(docId,{slot_booked:slots_booked});
            res.json({success:true,message:'Appointment cancelled successfully'})

            







            
        } catch (error) {
            console.log("cancelAppointmentIssue", error.message);
            return res.json({ success: false, message: error.message })
            
        }
    }

    //API to make of appointment using razorpay

    const paymentRazorpay = async (req,res) => {

    }

export { registerUser, loginUser, getProfile ,updateProfile,bookAppointment,listAppointment,cancelAppointment};