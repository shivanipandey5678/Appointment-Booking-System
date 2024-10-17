import mongoose from 'mongoose';

const dostorSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:String,required:true},
    speciality:{type:String,required:true},
    degree:{type:String,required:true},
    experience:{type:String,required:true},
    about:{type:String,required:true},
    available:{type:String,required:true},
    fees:{type:Number,required:true},
    address:{type:Object,required:true},
    date:{type:Number,required:true},
    slot_booked:{type:Object,default:{}},
},{minimize:false})


const doctorModel = mongoose.model || mongoose.model('dostorModel',dostorSchema)

export default doctorModel;