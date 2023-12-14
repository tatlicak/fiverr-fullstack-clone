   import jwt  from "jsonwebtoken";
import error from "../utils/error.js";

   const verifyToken = (req,res,next) => {
   //1-) is token exist or not
   const token = req.cookies.accessToken;

   //2-) is token valid or not
   if(!token) {
       return next(error(401,'You have no authorization'));
   }
    //3- if token valid, delete user
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {

     if(err) return next(error(401,'Your token is invalid. '));

    //in the next step
    //we add these two data from req to access the data
    
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
});

}
export{
    verifyToken
}