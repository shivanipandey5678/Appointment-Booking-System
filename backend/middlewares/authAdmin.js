import JWT from 'jsonwebtoken';

//admin authentication middleware

const authAdmin = async (req,res,next) => {
    try {

        const {atoken} = req.headers;
        if(!atoken){
            return res.json({success:false,message:'Nor atoken'})
        }
        const token_decode = JWT.verify(atoken,process.env.JWT_SECRET);
        // console.log("Decoded Token:", token_decode)
        if(token_decode.data!=process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
                return res.json({success:false,message:'Not Authenticated'})  
        }
        next();

    } catch (error) {
        console.log("catch issue meessage:",error.message);
        return res.json({message:"Not Authenticated",success:false})
    }
}

export default authAdmin