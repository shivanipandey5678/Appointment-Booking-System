import JWT from 'jsonwebtoken';

//User authentication middleware

const authUser = async (req,res,next) => {
    try {

        const {token} = req.headers;
        console.log("token from header in UthUser:",token);
        if(!token){
            return res.json({success:false,message:'Nor auth_User_atoken'})
        }
        const token_decode = JWT.verify(token,process.env.JWT_SECRET);
       
        req.user= token_decode.id;
      
        next();

    } catch (error) {
        console.log("catch issue meessage:",error.message);
        return res.json({message:"Not Authenticated",success:false})
    }
}

export default authUser