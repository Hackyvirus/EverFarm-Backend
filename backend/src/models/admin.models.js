import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const adminSchema = new Schema({
    name: {
        type: String,
        required: [true, "Admin Name is Required"],
        trim: true,
        lowercase: true,
        unique: [true, "Admin Name Must be Unique"],
    },
    avatar: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    privillages: {
        type: String,
        enum: ["Admin", "Writer", "Shopkeeper", "ML Engineer"],
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })



adminSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

adminSchema.methods.isPasswordCurrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

adminSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        password: this.password
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

adminSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({
        id: this._id
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}

export const Admin = mongoose.model("Admin", adminSchema);