import mongoose, { Schema } from "mongoose";


const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    likes:{
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: [],    
    },
    tags:{
        type: [String],
        required: true,
    },
},
    {
        timestamps: true,
    }
);


export const Blog = mongoose.model("Blog", blogSchema);

