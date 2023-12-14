import express from "express";
import mongoose from "mongoose";
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import gigRoutes from './routes/gig.routes.js';
import cookieParser from "cookie-parser";
import cors from "cors";


const port = process.env.APP_PORT;

const app = express();

mongoose.connect(process.env.DATABASE)
    .then(() =>
        console.log("Connectin established with Mongo DB"))
    .catch(error =>
        console.log("An error occured when connecting to the Mongo DB", error.message));
//Accept data from request body
app.use(express.json());

//For taking cookies
app.use(cookieParser());

//Response, request fron react app
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

//Definition of Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);

//Global Error Handling
//From now on, if we use next in any middleware we write and send an error, 
//this middleware will be activated and send the error message to the user at the front end.
app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || 'We are soryy. Something went wrong';

    return res.status(errStatus).json({
        message: errMessage
    });
})


app.listen(port, () => {

})
