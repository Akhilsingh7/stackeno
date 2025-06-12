import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";



export const postLoginUser = createAsyncThunk(
    "user/loginUser",
    async (userData, thunkApi) => {
        try {
            const response = await fetch("/api/v1/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", 
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            
            if (!data.success) {
                return thunkApi.rejectWithValue(data);
            }

            return data;
        }
        catch (error) {
            return thunkApi.rejectWithValue({
                message: error.response.data.message || "An error occurred"
            });
        }
    }
)

const initialState = {
    data: null,
    loading: false,
    error: null,
}


const userLoginSlice = createSlice({
    name: "userLogin",
    initialState,
    reducers: {
        resetLoginState: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        },
        clearLoginError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postLoginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postLoginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null; 
            })
            .addCase(postLoginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }               
})

export const { resetLoginState, clearLoginError } = userLoginSlice.actions;
export default userLoginSlice.reducer;

