import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        res.json({
            name: user.name,
            email: user.email
        });
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
})