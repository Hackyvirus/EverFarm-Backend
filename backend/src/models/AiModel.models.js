import mongoose, { Schema } from "mongoose";

const AiModelSchema = new Schema({
    modelID: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    trainingDataInformation: {
        type: String,
        required: true,
        trim: true
    },
    trainingDataType: {
        type: String,
    },
    modelVersion: {
        type: String,
    },
    accuracyMetrics: {
        type: String,
        required: true
    },
    dateDeployed: {
        type: Date,
        required: true
    }

}, { timestamps: true })

export const AiModel = mongoose.model("AiModel", AiModelSchema) 
