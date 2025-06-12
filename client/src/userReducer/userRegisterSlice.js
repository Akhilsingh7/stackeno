import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postRegisterUser = createAsyncThunk(
    "user/registerUser",
    
    async (userData, thunkApi) => {
        try {
            const response = await fetch("/api/v1/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            
            const data = await response.json();

            
            if (!data.success) {
                return thunkApi.rejectWithValue(data);
            }

            return data;
           
        } catch (error) {
            return thunkApi.rejectWithValue({
                message: error.message || "Registration failed"
            });
        }
    }
);


const initialState = {
    data: null,
    loading: false,
    error: null
}


const userRegisterSlice = createSlice({
    name: "userRegister",
    initialState,
    reducers: {
        resetRegistrationError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postRegisterUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postRegisterUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(postRegisterUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetRegistrationError } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;