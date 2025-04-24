import Doctor from "../modals/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../modals/appointmentModel.js";

const changeAvailability= async (req,res) =>{
    try {
        const {docId}=req.body;
        const docData=await Doctor.findById(docId);
        // console.log("docId",docId)
        console.log("docDataControleer:",docData);
        await Doctor.findOneAndUpdate({_id:docId},{available:!docData.available},{ new: true });
        res.json({ success: true, message: 'Doctor availability status updated successfully.' });
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error in changing availability in doc Controller',error:error.message || 'An unknown error occurred'})
        
    }

  
}

const doctorList = async (req,res) => {
    try {
        const doctors=await Doctor.find({}).select(['-password','-email']);
        res.json({ success: true, message: 'All doctors retrieved successfully.', doctors });
    } catch (error) {
        console.log("Error in fetching doctors list docController", error.message);
        res.json({ success: false, message: 'Unable to fetch doctor list. Please try again.' });
    }
}

//api for doctor login 
const loginDoctor = async (req,res) => {
    try {
        const {email,password} = req.body;
        const doctor = await Doctor.findOne({email});
        if(!doctor){
            console.log("dont get doc login doct at doc controller")
            return res.json({ success: false, message: 'Login failed. Invalid credentials or user does not exist.' });
        }

        const isMatch = await bcrypt.compare(password,doctor.password)

        if(isMatch){
            const token=jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({ success: true, message: 'Doctor logged in successfully.', token });
        }else{
            res.json({ success: false, message: 'Login failed. Invalid credentials or user does not exist.' });
        }


        
    } catch (error) {
        console.log("loginDoctor at doc controller", error);
        res.json({ success: false, message: 'Login failed. Please try again later.' });
    }
}


//api to get all appointment of that doc for doc panel
const appointmentsDoctor = async (req,res) => {
    try {

        const docId = req.docId;
        console.log("docid is ",docId)
        const appointment=await appointmentModel.find({docId});
        res.json({ success: true, message: 'Appointments retrieved successfully.', appointment });

        
    } catch (error) {
        console.log("appointmentsDoctor at doc controller", error);
        res.json({ success: false, message: 'Unable to retrieve appointments at the moment.' });
    }
}

//API to mark appointmnet complete at doctor panel

const appointmentComplete = async (req,res) => {
    try {
        const docId = req.docId;
        const {appointmentId}=req.body;

        const appointmentData=await appointmentModel.findById(appointmentId);
        
        if(appointmentData && appointmentData.docId===docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
       
            return res.json({ success: true, message: "Appointment marked as completed successfully." });
        }else{
            return res.json({ success: false, message: "Unable to mark appointment as complete. Please try again." });
        }

        
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}


//API to cancel appointmnet at doctor panel

const appointmentCancel = async (req,res) => {
    try {
        const docId = req.docId;
        const {appointmentId}=req.body;

        const appointmentData=await appointmentModel.findById(appointmentId);
        if(appointmentData && appointmentData.docId===docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
            return res.json({ success: true, message: "Appointment has been successfully cancelled." });
        }else{
            return res.json({ success: false, message: "Failed to cancel the appointment. Please try again later." });
        }

        
    } catch (error) {
        console.log("appointmentCancel at doc controller", error);
        res.json({ success: false, message: error.message });
    }
}

//api to get dashboard data for doctor panel 

const doctorDashboard = async (req,res)=>{
    try {
        const docId = req.docId;
        const appointments=await appointmentModel.find({docId});
        let earnings=0
        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings+=item.amount
            }
        })

        let patients=[]
        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData={
            earnings,
            appointments:appointments.length,
            patients:patients.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({ success: true, message: 'Doctor dashboard data retrieved successfully.', dashData });

        

    } catch (error) {
        console.log(" doctorDashboard at doc controller catch")
        res.json({ success: false, message: 'Could not load dashboard data. Please refresh or try again later.' });
    }
}


//API to get doctor profile for dostor panel

const doctorProfile = async (req,res) => {
    try {

        const docId = req.docId;
        const profileData=await Doctor.findById(docId).select('-password')

        res.json({ success: true, message: 'Doctor profile retrieved successfully.', profileData });

        
    } catch (error) {
        console.log("doctorProfile at doc controller catch", error);
        res.json({ success: false, message: 'Failed to fetch doctor profile. Please check your connection or try again.' });
    }
}

//Api to update doctor profile data from doctor panel

const updateDoctorProfile = async (req,res) => {
    try {
        const docId = req.docId;
        const {fees,address,available}=req.body
        const serchedDoc=await Doctor.findById(docId)
        const updated=await Doctor.findByIdAndUpdate(docId,{fees,address,available})
        res.json({ success: true, message: "Doctor profile updated successfully.", searchedDoc, updated });
    } catch (error) {
        console.log(" updateDoctorProfile at doc controller catch")
        res.json({ success: false, message: 'Could not update profile. Please try again.' });
    }
}


export {changeAvailability,doctorList,loginDoctor,appointmentsDoctor,appointmentCancel,appointmentComplete,doctorDashboard,doctorProfile,updateDoctorProfile}