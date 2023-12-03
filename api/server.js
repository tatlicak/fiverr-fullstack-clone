import express from "express";
import mongoose from "mongoose";

const port = process.env.APP_PORT;

mongoose.connect(process.env.DATABASE)
    .then(() =>
        console.log("Connectin established with Mongo DB"))
    .catch(error =>
        console.log("An error occured when connecting to the Mongo DB", error.message));

const app = express();
app.listen(port, () => {

})
