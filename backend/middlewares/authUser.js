import JWT from 'jsonwebtoken';

//User authentication middleware

const authUser = async (req,res,next) => {
    try {

        const {token} = req.headers;
        // console.log("USER TOKEN AT AUTH_USER:",token);
        if(!token){
            return res.json({success:false,message:'NOT found token at auth_user'})
        }
        const token_decode = JWT.verify(token,process.env.JWT_SECRET);
       
        req.user= token_decode.id;
        // console.log("user id at authUser in req user ",req.user);
      
        next();

    } catch (error) {
        console.log("catch issue meessage:",error.message);
        return res.json({message:"Not Authenticated",success:false})
    }
}

export default authUser