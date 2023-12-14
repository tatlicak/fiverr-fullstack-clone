
import User from "../models/user.model.js"
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import error from "../utils/error.js";

// Create New Account
const register = async(req ,res, next) => {
    try {
        //Password Hashing and Salting
        const hashedPassword = bcrypt.hashSync(req.body.password, 13);

        //create new user
        const newUser = new User({...req.body,password: hashedPassword, });

        console.log(req.body);

        //save new user
        await newUser.save();

        res.status(200).json({
            message: 'New User is created',
            newUser,
        });
    } catch (err) {
        next(error(400, 'An error occurs while registering user'))
    }
};

//User Login
const login = async(req ,res, next) => {
    try {
        // Find user by username
        
        const existingUser = await User.findOne({
           username:req.body.username
        });
//if user doesn't exist send error message

if(!existingUser) {

    return next(error(400,'User not Found, Please check your login credentials..'));
    
}

//if user exists, control password 

const isPassTrue = bcrypt.compareSync(
    req.body.password,
    existingUser.password
)

//if password is false return error

if(!isPassTrue) {

    return next(error(401,'An Error occured. Login failed. Please check your login credentials..'));
       
}

 // if password is correct, create jwt token

const token = jwt.sign({
    id: existingUser._id,
    isSeller: existingUser.isSeller,
},
process.env.JWT_SECRET
);


existingUser.password="*****";


        res.cookie('accessToken', token, {
            httpOnly: true,
        })
        .status(200)
        .json({
            message: 'Login is successful',
            user: existingUser,
        });
    } catch (error) {

        next(error(401,"Login attempt failed..."));
      
    }
};

//User Logout and delete cookies
const logout = (req,res, next) => {
    
  res.clearCookie("accessToken").status(200).json({
        message: 'User logged out from their account'
    })
};
 
export {
    register,
    login,
    logout,
  };