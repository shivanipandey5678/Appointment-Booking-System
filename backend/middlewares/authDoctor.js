import JWT from 'jsonwebtoken';

//Doctor authentication middleware

const authDoctor = async (req,res,next) => {
    try {

        const {dtoken} = req.headers;
        // console.log(" dtoken AT doctor:",dtoken);
        if(!dtoken){
            return res.status(401).json({
                success: false,
                message: 'Authorization failed: Doctor token is missing.',
              });
        }
        const dtoken_decode = JWT.verify(dtoken,process.env.JWT_SECRET);
       
        req.docId= dtoken_decode.id;
        // console.log("doctorid at authdoctor in req  ",req.docId);
      
        next();

    } catch (error) {
        console.error('Doctor authentication error:', error.message);
        return res.status(401).json({
          success: false,
          message: 'Authentication failed: Invalid or expired doctor token.',
        });
    }
}

export default authDoctor