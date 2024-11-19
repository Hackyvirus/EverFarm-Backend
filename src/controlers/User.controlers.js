import asyncHandler from "../utils/asyncHandler.utils.js";
import ApiError from "../utils/APIError.js"
import ApiResponce from "../utils/ApiResponce.js"
import { User } from "../models/users.models.js"
import { uploadOnCloud } from "../utils/uploadFile.utils.js";

const generateAccessTokenANDRefreshToken = async (id) => {
    try {
        const user = await User.findById(id);
        // console.log("user", user)
        const accessToken = user.generateAccessToken()
        // console.log("access TOken", accessToken)
        const refreshToken = user.generateRefreshToken()
        // console.log("refreshToken", refreshToken)
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Error while Generating Access TOken")
    }
}

const userSignUp = asyncHandler(async (req, res) => {
    const { Username, firstName, email, lastName, phoneNumber, password } = req.body

    if (!Username || !firstName || !lastName || !email || !phoneNumber || !password) {
        throw new ApiError(400, "All fields are Required")
    }

    const existUser = await User.findOne({
        $or: [{ Username, email, phoneNumber, }]
    })

    if (existUser) {
        throw new ApiError(409, "User Exist with this email or Username")
    }

    const profileLocalPath = req.files?.profilePhoto[0]?.path

    if (!profileLocalPath) {
        throw new ApiError(400, "Profile Picture is required")
    }

    const profileURL = await uploadOnCloud(profileLocalPath)

    const user = await User.create({
        Username,
        profilePhoto: profileURL.url,
        firstName,
        lastName,
        email,
        phoneNumber,
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if (!createdUser) {
        throw new ApiError(500, "Something Wend wrong")
    }

    return res.status(201).json(new ApiResponce(202, "User Created Successfully", createdUser))

})

const userLogin = asyncHandler(async (req, res) => {
    const { Username, email, phoneNumber, password } = req.body
    console.log(" Username, email, phoneNumber, password", Username, email, phoneNumber, password)

    if (!Username && !email && !phoneNumber) {
        throw new ApiError(400, "Username OR Email OR PhoneNumber is Required")
    }

    const user = await User.findOne({ $or: [{ Username }, { email }, { phoneNumber }] })

    if (!user) throw new ApiError(400, "User Not Found");

    const isPasswordCurrect = await user.isPasswordCurrect(password)

    if (!isPasswordCurrect) {
        throw new ApiError(400, "Password is Incorrect")
    }

    const { accessToken, refreshToken } = await generateAccessTokenANDRefreshToken(user._id)
    console.log("Access token", accessToken)
    console.log("refresh token", refreshToken)
    const loggedinUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
        new ApiResponce(200, {
            user: loggedinUser, accessToken, refreshToken
        }, "User logged in Successfully")
    )

    // return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponce(200, {
    //     user: loggedinUser, accessToken, refreshToken
    // }, "User Logged In"))
})

const userLogOut = asyncHandler(async (req, res) => {
    console.log("++", req.user)
    try {
        res.json(new ApiResponce(200, "we area log out", null))
    } catch (error) {

    }
})
export { userSignUp, userLogin, userLogOut }