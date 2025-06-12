import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { updateUserProfile } from "./userProfileSlice";



 export const userLogoutGet= createAsyncThunk("userLogout/get", 
    async (_, thunkAPI) => {
        try {
            const response = await axios.post("/api/v1/users/logout", {}, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, // ✅ This is the correct way for Axios
            });

        

            if (!response.data.success) {
                return thunkAPI.rejectWithValue(response.data.message);
            }

            // thunkAPI.dispatch(updateUserProfile({ user: null, isLoggedIn: false }));

            return response.data.success;
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to logout");
        }
})

const initialState = {
    data: null,
    loading: false,
    error : null,
    isLoggedOut: false,
}

const userLogoutSlice = createSlice({
    name: "userLogout",
    initialState,
    reducers: {
        resetLogoutState: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
            state.isLoggedOut = false;
          }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogoutGet.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(userLogoutGet.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            state.isLoggedOut = true;
        })
        builder.addCase(userLogoutGet.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isLoggedOut = false;
        })
    }
})

export const { resetLogoutState } = userLogoutSlice.actions;
export default userLogoutSlice.reducer;