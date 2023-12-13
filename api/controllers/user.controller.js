import User from "../models/user.model.js";

export const deleteUser = async (req, res, next) => {

    //get user by id. Id comes from request
    const userInfo = await User.findById(req.params.id)

    //is the user trying to delete their own account
    if (req.userId !== userInfo._id.toString()) {
        return res.status(401).json({ message: 'You have no authorization' });
    }

    //Delete User
    await User.findByIdAndDelete(req.params.id);
    res.
        json({
            message: 'User deleted'
        });



}
