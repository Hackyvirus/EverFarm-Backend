import mongoose, { Schema } from "mongoose";


const productSchema = new Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true,
    },
    ProductPhoto: {
        type: String,
        trim: true,
        required: [true, "Add 1 photo of product"]
    }
    , productDescription: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    stockQuantity: {
        default: 0,
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["Pestiside", "Pestiside2", "Pestiside3"],
        required: true
    },
    quantityInStock: {
        type: Number,
        default: 0,
        required: true
    }, restockDate: {
        type: Date
    },
    supplierInformation: {
        type: String
    }

}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema)