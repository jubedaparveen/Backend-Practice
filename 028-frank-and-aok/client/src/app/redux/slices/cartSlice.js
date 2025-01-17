
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const  fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (user, thunkApi) => {
        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}website/cart/read-cart/${user}`);
            console.log(response.data, 'cart-response.data------>')
            return response.data;
        }
        catch(error){
            return thunkApi.rejectWithValue(error.message);
        }
    }
)

const initialState = {
    value:{},
    loading:false,
    error:null
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchCart.fulfilled, (state, action)=>{
            console.log('cart =-------=>', action.payload);
            state.value = action.payload;
        })
        .addCase(fetchCart.rejected, (state, action)=>{
            console.log('cart error =--------- => ', action.payload);
            state.error = action.payload;
        })
    }
});

export default cartSlice.reducer;
