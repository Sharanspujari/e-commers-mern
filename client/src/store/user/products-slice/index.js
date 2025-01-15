import axios from "axios";

import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading:false,
    productList:[],
    productDetail:null
}

export const fetchAllShoppingProducts =createAsyncThunk("/shop/filteredProducts",async({filterParams,sortParams})=>{
    
        const query = new URLSearchParams({
        ...filterParams,
        sortBy:sortParams
    }) 
    const result = await axios.get(`http://localhost:5000/api/shop/products/get?${query}`)
    return result?.data
})

export const fetchProductDetail = createAsyncThunk("/shop/product-detail",async(id)=>{
 const result = await axios.get(`http://localhost:5000/api/shop/products/get/${id}`)
 return result?.data
})

const shoppingProductSlice = createSlice({
 name:'shoppingProducts',
 initialState,
 reducers:{
    setProductDetails:(state)=>{
        state.productDetail=null
    }
 },
 extraReducers:(builder)=>{
    builder.addCase(fetchAllShoppingProducts.pending,(state)=>{
        state.isLoading=true
    }).addCase(fetchAllShoppingProducts.fulfilled,(state,action)=>{
        
        state.isLoading=false,
        state.productList=action.payload?.data
    }).addCase(fetchAllShoppingProducts.rejected,(state)=>{
        
        state.isLoading=false,
        state.productList=[]
    }).addCase(fetchProductDetail.pending,(state)=>{
        state.isLoading=true
     }).addCase(fetchProductDetail.fulfilled,(state,action)=>{
        state.isLoading=false,
        state.productDetail=action.payload?.data
     }).addCase(fetchProductDetail.rejected,(state)=>{
        state.isLoading=false,
        state.productDetail=null
     })
 }
})
export const {setProductDetails} = shoppingProductSlice.actions
export default shoppingProductSlice.reducer