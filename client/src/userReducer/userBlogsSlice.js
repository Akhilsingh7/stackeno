import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/ApiAxios";

 export const getBlogs =createAsyncThunk("blog/get", async(__, thunkAPI)=>{
    try {
        const response = await api.get("/users/blogs");
       if(!response.data.success){
        return thunkAPI.rejectWithValue(response.data.message);
       }
    //    console.log("response", response.data);
       return response.data.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch blogs");
    }
 })

 export const createBlog = createAsyncThunk("blog/create", async(blogData, thunkAPI)=>{
    try {
        const response = await api.post("/users/create-blog", blogData);
        if(!response.data.success){
            return thunkAPI.rejectWithValue(response.data.message);
        }
        console.log("response-creatw", response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create blog");
    }
 })

export const toggleLike = createAsyncThunk('blog/toggle-like', async(blogId, thunkAPI)=>{
    try {
        const response = await api.post('/users/toggle-like', blogId);
        if(!response.data.success){
            return thunkAPI.rejectWithValue(response.data.message);
        }
        // console.log("response-like", response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to like blog");
    }
})



 const initialState = {
    blogs: [],
    loading: false,
    error: null,
    createBlogLoading: false,
    createBlogError: null,
    createBlogSuccess: false,
 }

 const userBlogsSlice = createSlice({
    name: "userBlogs",
    initialState,
    reducers: {
        resetCreateBlogState: (state) => {
            state.createBlogLoading = false;
            state.createBlogError = null;
            state.createBlogSuccess = false;
        },
    },
    extraReducers: (builder) => {
        // get blogs
        builder.addCase(getBlogs.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getBlogs.fulfilled, (state, action) => {
            state.loading = false;
            state.blogs = action.payload;
            state.error = null;
        })
        .addCase(getBlogs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // create blog
        .addCase(createBlog.pending, (state) => {
            state.createBlogLoading = true;
            state.createBlogError = null;
            state.createBlogSuccess = false;
        })
        .addCase(createBlog.fulfilled, (state, action) => {
            state.createBlogLoading = false;
            state.createBlogSuccess = true;
            state.blogs.push(action.payload.data);
        })
        .addCase(createBlog.rejected, (state, action) => {  
            state.createBlogLoading = false;
            state.createBlogSuccess = false;
            state.createBlogError = action.payload;
        })

        // like blog
        .addCase(toggleLike.fulfilled, (state, action) => {
            state.blogs = state.blogs.map((blog) => blog._id === action.payload.data._id ? action.payload.data : blog);
        })
        .addCase(toggleLike.rejected, (state, action) => {
            state.error = action.payload;
        })
        
        
    }
 })     

 export const {resetBlogsState, resetCreateBlogState} = userBlogsSlice.actions;
 export default userBlogsSlice.reducer;
