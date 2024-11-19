import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const UserSchema = new Schema({
    Username: {
        type: String,
        lowercase: true,
        unique: [true, "Username must be Unique "],
        required: [true, "Username is required"],
        index: true,
        trim: true,
        minLength: [6, "Username Must contain 6 Charecters"],
        maxLength: [12, "Username Must contain less than or equal to 12 Charecters"]
    },
    firstName: {
        type: String,
        required: [true, "First Name is Required"],
        trim: true,
        maxLength: [10, "Username Must contain less than or equal to 10 Charecters"]
    },
    lastName: {
        type: String,
        required: [true, "First Name is Required"],
        trim: true,
        maxLength: [10, "Username Must contain less than or equal to 10 Charecters"]
    },
    profilePhoto: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: [true, "Email Must be Unique"],
        required: [true, "Email is Required"],
        trim: true
    },
    phoneNumber: {
        type: String,
        unique: [true, "Phone Number Must be Unique"],
        required: [true, "Phone Number is Required"],
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })

UserSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.isPasswordCurrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        password: this.password,
        Username: this.Username
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

UserSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({
        id: this._id
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}

export const User = mongoose.model("User", UserSchema)