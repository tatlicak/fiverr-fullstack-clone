import express from "express";
import { deleteGig } from "../controllers/gig.controller.js";

//1-creating routes
const router = express.Router();


router.delete('/delete', deleteGig);

export default router;