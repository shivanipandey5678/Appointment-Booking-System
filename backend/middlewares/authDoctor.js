import JWT from 'jsonwebtoken';

//Doctor authentication middleware

const authDoctor = async (req,res,next) => {
    try {

        const {dtoken} = req.headers;
        // console.log(" dtoken AT doctor:",dtoken);
        if(!dtoken){
            return res.json({success:false,message:'NOT found dtoken at authdoctor'})
        }
        const dtoken_decode = JWT.verify(dtoken,process.env.JWT_SECRET);
       
        req.docId= dtoken_decode.id;
        // console.log("doctorid at authdoctor in req  ",req.docId);
      
        next();

    } catch (error) {
        console.log("catch issue meessage:",error.message);
        return res.json({message:"Not Authenticated",success:false})
    }
}

export default authDoctor