import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true,unique:true},
    image:{type:String,required:true},
    speciality:{type:String,required:true},
    degree:{type:String,required:true},
    experience:{type:String,required:true},
    about:{type:String,required:true},
    available:{type:Boolean ,default:true},
    fees:{type:Number,required:true},
    address:{type:Object,required:true},
    date:{type:Number,required:true},
    slot_booked:{type:Object,default:{}},
},{minimize:false})


const Doctor = mongoose.model('Doctor',doctorSchema)

export default Doctor;