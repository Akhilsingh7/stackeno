import { Blog } from "../model/blogs.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getBlogs = asyncHandler(async (req, res) => {
   
    const blogs = await Blog.find({});

    return res.status(200).json(
        new ApiResponse(200, blogs, "Blogs fetched successfully")
    );
});

const createBlog = asyncHandler(async(req, res)=>{
    const user = req.user;
    const {title, content, tags} = req.body;

    if(!title || !content){
        throw new ApiError(400, "All fields are required");
    }

    if(tags && tags.length <=0){
        throw new ApiError(400, "Tags are required");
    }
    
    const findUser = await User.findById(user._id);
    
    if(!findUser){
        throw new ApiError(401, "Unauthorized or User not found");
    }

    try {
        const blog = await Blog.create({
            title,
            content,
            author: findUser.username,
            tags,
            likes: [],
        });

        return res.status(201).json(
            new ApiResponse(201, blog, "Blog created successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Error creating blog: " + error.message);
    }
    
})

const toggleLike = asyncHandler(async(req, res)=>{
    const user = req.user;
    const {blogId} = req.body;

    if(!blogId){
        throw new ApiError(400, "Blog ID is required");
    }

    const blog = await Blog.findById(blogId);

    if(!blog){
        throw new ApiError(404, "Blog not found");
    }

    const isLiked = blog.likes.includes(user._id);

    if(isLiked){
        blog.likes = blog.likes.filter((id)=>id.toString() !== user._id.toString());
    }else{
        blog.likes.push(user._id);
    }


    await blog.save();

    const updatedBlog = await Blog.findById(blogId);

    // console.log("updatedBlog", updatedBlog);

    return res.status(200).json(
        new ApiResponse(200, updatedBlog, "Blog liked/unliked successfully")
    );
    
        
})

export {getBlogs, createBlog, toggleLike};