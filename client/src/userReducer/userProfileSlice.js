import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../utils/ApiAxios";

export const userProfileGet = createAsyncThunk("userProfile/get", async (_, thunkAPI) => {
    try {
        const response = await api.get("/users/profile");
     
        if(!response.data.success){
            return thunkAPI.rejectWithValue(response.data.message);
        }
        
        return response.data.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
})

const initialState = {
    user: null,
    loading: false,
    errorMessage: null,
    isLoggedIn: false,
}
 
const userProfileSlice = createSlice({
    name: "userProfile",    
    initialState,
    reducers: {
        updateUserProfile: (state, action)=>{
            state.user = action.payload.user;
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userProfileGet.pending, (state) => {
            state.loading = true;
            state.errorMessage = null;      
        });
        builder.addCase(userProfileGet.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.errorMessage = null;
            state.isLoggedIn = true;
        }); 
        builder.addCase(userProfileGet.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
            state.user = null;
            state.isLoggedIn = false;
        });
    }
})

export const { logout, login, updateUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;

