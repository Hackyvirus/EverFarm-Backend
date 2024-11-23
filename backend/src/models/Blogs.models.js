import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const { Schema } = mongoose;

const AutoIncrement = AutoIncrementFactory(mongoose);

const BlogSchema = new Schema(
    {
        articleId: {
            type: Number,
            unique: true,
        },
        thumbnail: {
            type: String,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
            default: Date,
        },
    },
    { timestamps: true }
);

BlogSchema.plugin(AutoIncrement, { inc_field: "articleId" });

export const Blog = mongoose.model("Blog", BlogSchema);
