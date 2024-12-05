import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isLoading:false,
    productList:[]
}
const adminProductSlice = createSlice({
    name:'adminProducts',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        
    }
})