import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    isLoading:false,
    productList:[]
}

// add new product
export const addNewProduct  = createAsyncThunk("/product/addNewProduct",async(formData)=>{
   const result = await axios.post('http://localhost:5000/api/admin/products/add-product',formData,{
    headers:{'Content-Type':"application/json"}
   })
   return result?.data
})

// get All the products
export const getAllProducts  = createAsyncThunk("/product/getAllProducts",async()=>{
    const result = await axios.get('http://localhost:5000/api/admin/products/get-products')
    return result?.data
 })

//  Delete product
 export const deleteProduct  = createAsyncThunk("/product/deleteProduct",async(id)=>{
    const result = await axios.delete(`http://localhost:5000/api/admin/products/delete-product/${id}`)
    return result?.data
 })

//  update product
 export const editProduct  = createAsyncThunk("/product/editProduct",async({id,formData})=>{
    const result = await axios.put(`http://localhost:5000/api/admin/products/edit-product/${id}`)
    return result?.data
 })
const AdminProductsSlice = createSlice({
    name:'adminProducts',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.pending,(state,action)=>{
            state.isLoading=true;
           
        }).addCase(getAllProducts.fulfilled,(state,action)=>{
            console.log('actionpayload: ', action.payload);
            state.isLoading=false
            state.productList =action.payload.data
        }).addCase(getAllProducts.rejected,(state,action)=>{
            state.isLoading=false
            state.productList=[]
        })
    }
})

export default AdminProductsSlice.reducer