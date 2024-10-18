import JWT from 'jsonwebtoken';

//admin authentication middleware

const authAdmin = async (req,res,next) => {
    try {

        const {atoken} = req.headers;
        if(!atoken){
            res.json({success:false,message:'Nor Authorized'})
        }
        const token_decode = JWT.verify(atoken,process.env.JWT_SECRET);
        if(token_decode!=process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
                res.json({success:false,message:'Not Authorized'})
        }
        next();

    } catch (error) {
        console.log(error);
        res.json({message:error.message,success:false})
    }
}

export default authAdmin