import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userProfileGet = createAsyncThunk("userProfile/get", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/api/v1/users/profile", {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // ← ADD THIS! Includes cookies in requests
        });
     
        // console.log("Profile response:", response.data.success);
      
        if (!response.data.success) {
            return thunkAPI.rejectWithValue(response.data.message);
        }
        
        return response.data.data;

    } catch (error) {
        console.error("Profile error:", error);
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
})

const initialState = {
    user: null,
    loading: false,
    error: null
}

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userProfileGet.pending, (state) => {
            state.loading = true;
            state.error = null;   
        });
        builder.addCase(userProfileGet.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        }); 
        builder.addCase(userProfileGet.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        });
    }
})


export default userProfileSlice.reducer;

