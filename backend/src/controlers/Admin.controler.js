import asyncHandler from "../utils/asyncHandler.utils.js";
import { Admin } from "../models/admin.models.js"
import ApiError from "../utils/APIError.js";
import { uploadOnCloud } from "../utils/uploadFile.utils.js";
import ApiResponce from "../utils/ApiResponce.js";
const Home = asyncHandler(async (req, res) => {
    return res.send('<h1>Hello world</h1>')
})

const generateAccessTokenANDRefreshToken = async (id) => {
    try {
        const admin = await Admin.findById(id)
        const accessToken = admin.generateAccessToken()
        const refreshToken = admin.generateRefreshToken()
        admin.refreshToken = refreshToken
        await admin.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(401, "Error While Access & Refresh Token")
    }

}

const adminSignUp = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, privillages, password } = req.body


    if (!name || !email || !phoneNumber || !privillages || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const Existadmin = await Admin.findOne({ $or: [{ name, email, phoneNumber }] })

    if (Existadmin) {
        throw new ApiError(400, "User already exist with Name or Email or Phone Number")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Profile Photo is Required")
    }

    const avatarURI = await uploadOnCloud(avatarLocalPath);

    const admin = await Admin.create({ name, avatar: avatarURI.url, email, phoneNumber, privillages, password })

    const createdAdmin = await Admin.findById(admin._id).select("-password -refreshToken")

    if (!createdAdmin) {
        throw new ApiError(400, "Error while saving the user")
    }

    res.status(200).json(new ApiResponce(200, "Admin created succefully", createdAdmin))

})

const adminLogin = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, password } = req.body
    console.log(email, password)
    if (!name && !email && !phoneNumber && !password) {
        throw new ApiError(400, "Name or email or Phone Number is required are required")
    }

    const existAdmin = await Admin.findOne({ $or: [{ name }, { email }, { phoneNumber }] })

    if (!existAdmin) {
        throw new ApiError(401, "User Not Exist")
    }

    const isPassCurrect = await existAdmin.isPasswordCurrect(password)

    if (!isPassCurrect) {
        throw new ApiError(401, "Incorrect Password")
    }

    const { accessToken, refreshToken } = await generateAccessTokenANDRefreshToken(existAdmin._id)

    const LoginAdmin = await Admin.findById(existAdmin._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponce(200, "Admin Log in Succefully", LoginAdmin))


})

const addAIModel = asyncHandler(async (req, res) => {
    console.log(req.body)
})

const addProduct = asyncHandler(async (req, res) => {
    console.log(req.body)
})

const addBlogs = asyncHandler(async (req, res) => {
    console.log(addBlogs)
})

const sendNotification = asyncHandler(async (req, res) => {
    console.log(req.body)
})

const userReports = asyncHandler(async (req, res) => {
    console.log(req.body)
})
export { Home, adminSignUp, addBlogs, addProduct, adminLogin, addAIModel, sendNotification, userReports }