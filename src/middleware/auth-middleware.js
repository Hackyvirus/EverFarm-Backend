// take access token from req
// check if it exist
// decode the access token
// find the user by the id 
// send the user to req and next
// catch the error

import { User } from "../models/users.models.js";
import ApiError from "../utils/APIError.js";
import asyncHandler from "../utils/asyncHandler.utils.js"
import jwt from "jsonwebtoken"



export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");
        if (!token) {
            throw new ApiError(401, "Unathorized Access")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = User.findById(decodedToken?._id).select("-password -refreshToken")
        if (!user) {
            throw new ApiError(401, "Unathorized Access")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Unathorized Access",)
    }
})

