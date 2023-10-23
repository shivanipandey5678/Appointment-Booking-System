import Doctor from "../modals/doctorModel.js";

const changeAvailability= async (req,res) =>{
    try {
        const {docId}=req.body;
        const docData=await Doctor.findById(docId);
        // console.log("docId",docId)
        console.log("docDataControleer:",docData);
        await Doctor.findOneAndUpdate({_id:docId},{available:!docData.available},{ new: true });
        res.json({success:true,message:'Doctor availabiljity changed successfully in doc Controller'})
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error in changing availability in doc Controller',error:error.message || 'An unknown error occurred'})
        
    }

  
}

const doctorList = async (req,res) => {
    try {
        const doctors=await Doctor.find({}).select(['-password','-email']);
        res.json({success:true,doctors})
    } catch (error) {
        res.json({success:false,message:error.message})
        console.log("Error in fetching doctors list docController",error.message);
    }
}

export {changeAvailability,doctorList}