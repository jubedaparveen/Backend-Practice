import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const userLogin = createAsyncThunk(
//     'user/Login',
//     async (auth, thunkApi)=>{
//         try{
//             const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}website/user-register/user-login`, {auth});
//             return response.data;
//         }
//         catch(error){
//             return thunkApi.rejectWithValue(error.message);
//         }
//     }
// );

export const verifyLogin = createAsyncThunk(
    'user/verifyLogin',
    async (auth, thunkApi)=>{
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}website/user-register/verify-jwt-login`, {auth});
            return response.data;
        }
        catch(error){
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    value: {},
    loading: false,
    error: null
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser : (state, action)=>{
            state.value = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(verifyLogin.pending, (state, action)=>{
            state.loading = true;
            console.log('pending')
        })
        .addCase(verifyLogin.fulfilled, (state, action)=>{
            console.log(action.payload);
            state.value = action.payload;
            state.loading = false;
        })
        .addCase(verifyLogin.rejected, (state, action)=>{
            console.log(action.payload);
            state.error = action.payload;
            state.loading = false;
        })
    }
});

// export const {  } = userSlice.actions

export default userSlice.reducer