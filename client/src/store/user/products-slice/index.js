import axios from "axios";

import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLoading:false,
    productList:[]
}

export const fetchAllShoppingProducts =createAsyncThunk("/shop/filteredProducts",async()=>{
    const result = await axios.get("http://localhost:5000/api/shop/products/get")
    return result?.data
})

const shoppingProductSlice = createSlice({
 name:'shoppingProducts',
 initialState,
 reducers:{},
 extraReducers:(builder)=>{
    builder.addCase(fetchAllShoppingProducts.pending,(state,action)=>{
        state.isLoading=true
    }).addCase(fetchAllShoppingProducts.fulfilled,(state,action)=>{
        console.log('actionPayload: ', action.payload);
        state.isLoading=false,
        state.productList=action.payload?.data
    }).addCase(fetchAllShoppingProducts.rejected,(state,action)=>{
        console.log('actionPayload: ', action.payload);
        state.isLoading=false,
        state.productList=[]
    })
 }
})
export default shoppingProductSlice.reducer