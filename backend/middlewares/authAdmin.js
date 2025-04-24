import JWT from 'jsonwebtoken';

//admin authentication middleware

const authAdmin = async (req,res,next) => {
    try {

        const {atoken} = req.headers;
        if(!atoken){
            return res.json({success:false,message:'Access denied: Admin token is missing.'})
        }
        const token_decode = JWT.verify(atoken,process.env.JWT_SECRET);
        // console.log("Decoded Token:", token_decode)
        if(token_decode.data!=process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.status(403).json({
                success: false,
                message: 'Unauthorized access: Invalid admin credentials.',
              });
        }
        next();

    } catch (error) {
        console.error('Admin auth error:', error.message);
        return res.status(401).json({
          success: false,
          message: 'Authentication failed: Invalid or expired admin token.',
        });
    }
}

export default authAdmin