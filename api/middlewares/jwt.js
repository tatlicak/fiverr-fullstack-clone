   import jwt  from "jsonwebtoken";

   const verifyToken = (req,res) => {
   
   //1-) is token exist or not
   const token = req.cookies.accessToken;

   //2-) is token valid or not
   if(!token) {
       return res.status(401).json({message: 'You have no authorization'});
   }
    //3- if token valid, delete user
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
     if(err)
     return res
        .status(403)
        .json({ message: 'Your token is invalid. '})

    //in the next step
    //we add these two data from req to access the data
    
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
});
}
export{
    verifyToken
}