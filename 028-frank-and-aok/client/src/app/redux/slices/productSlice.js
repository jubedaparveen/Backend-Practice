
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const  fetchProducts = createAsyncThunk(
    'parentCategory/fetchProducts',
    async (category, thunkApi) => {
        try{
            const response = await axios.get(`http://localhost:4800/api/website/products/active-products/${category}`);
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

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchProducts.fulfilled, (state, action)=>{
            console.log('products =>', action.payload);
            state.value = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action)=>{
            console.log('product error => ', action.payload);
            state.error = action.payload;
        })
    }
});

export default productSlice.reducer;
