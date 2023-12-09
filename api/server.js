import express from "express";
import mongoose from "mongoose";
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
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

app.listen(port, () => {

})
