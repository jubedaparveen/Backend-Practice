import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import parentCategorySlice from "./slices/parentCategorySlice";
import productCategorySlice from "./slices/productCategorySlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
    reducer:{
        user: userSlice,
        parentCategory: parentCategorySlice,
        productCategory: productCategorySlice,
        products: productSlice,
        cart: cartSlice
    }
});