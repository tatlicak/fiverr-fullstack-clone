import Gig from '../models/gig.model.js';
import error from '../utils/error.js';

const createGig = async (req, res, next) => {
    // is seller or not
    if (!req.isSeller)
        return next(error(403, 'Only Sellers can create a gig'));

    // Except user ID all data comes from request body
    const newGig = new Gig({
        userId: req.userId,
        ...req.body
    });

    //insert gig(service)
    try {
        const insertedGig = await newGig.save();
        res.status(201).json({
            message: 'Gig was created successful',
            insertedGig
        })
        return next();
    } catch (err) {
        next(error(401, "Something wents wrong while inserting gig"));
    }
};
const deleteGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id);

        if (gig.userId.toString() !== req.userId) {

            return next(error(403, "You can only delete services that you have created."))
        }

        //Delete and send response
        await Gig.findByIdAndDelete(req.params.id);
        res.status(204).json({
            message: 'Successfully Deleted',
        });


    } catch (err) {
        next(err);
    }
};
const getAllGigs = async (req, res, next) => {
    try {
        //get all services
        const gigs = await Gig.find();

        res.status(200).json({
            gigs,
        });
    } catch (error) {
        
    }
};
const getGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id);

        if(!gig)
            return next(error(404, "There is no service with this id"));

        res.status(200).json({
            gig,
        });
    } catch (err) {
        next(err);
    }
};

export {
    createGig,
    deleteGig,
    getAllGigs,
    getGig
}