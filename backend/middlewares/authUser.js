import JWT from 'jsonwebtoken';

//User authentication middleware

const authUser = async (req,res,next) => {
    try {

        const {token} = req.headers;
        // console.log("USER TOKEN AT AUTH_USER:",token);
        if(!token){
            return res.status(401).json({
                success: false,
                message: 'Authorization failed: User token is missing.',
              });
        }
        const token_decode = JWT.verify(token,process.env.JWT_SECRET);
       
        req.user= token_decode.id;
        // console.log("user id at authUser in req user ",req.user);
      
        next();

    } catch (error) {
        console.error('User authentication error:', error.message);
        return res.status(401).json({
          success: false,
          message: 'Authentication failed: Invalid or expired user token.',
        });
    }
}

export default authUser