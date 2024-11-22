import asyncHandler from "../utils/asyncHandler.utils.js";

const Home = asyncHandler(async (req, res) => {
    return res.send('<h1>Hello world</h1>')
})

const adminSignUp = asyncHandler(async (req, res) => {
    console.log(req.body)
})

const adminLogin = asyncHandler(async (req, res) => {
    console.log(req.body)
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
export { Home, adminSignUp, addProduct, adminLogin, addAIModel, sendNotification, userReports }