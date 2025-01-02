import axios from "axios";
import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";


const initialState={
cartItems:[],
isLoading:false
}

// Async thunk API call 

// ADD TO CART API CALL
export const addToCart = createAsyncThunk("cart/addToCart",async({userId,productId,quantity})=>{
 try {
  const res = await axios.post(`http://localhost:5000/api/shop/cart/add`,{userId,productId,quantity})  
  console.log('res: ', res);
  return res.data
 } catch (error) {
    console.log('error: ', error);
     }
})

// GET CART ITEM API CALL
export const fetchCartItem = createAsyncThunk("cart/fetchCart",async(userId)=>{
  try{
const res = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`)
return res.data
  }catch(error){
    console.log('error: ', error);

  }
})

// UPDATED CART ITEM API CALL
export const updateCartItem = createAsyncThunk("cart/updateCart",async({userId,productId,quantity})=>{
  try{
const res =  await axios.put(`http://localhost:5000/api/shop/cart/update-cart`,{userId,productId,quantity})
 return res.data
  }catch(error){
    console.log('error: ', error);

  }
})

// DELETE CART ITEM API CALL
export const deleteCartItem = createAsyncThunk("cart/deleteCartItem",async({userId,productId})=>{
    try {
     const res = await axios.delete(`http://localhost:5000/api/shop/cart/${userId}/${productId}`)  
     return res.data 
    } catch (error) {
        console.log('error: ', error);
        
    }
})

const shoppingCartSlice = createSlice({
name:'shoppingCart',
initialState,
reducers:{},
extraReducers:(builder)=>{
builder.addCase(addToCart.pending,(state)=>{
    state.isLoading=true
    }).addCase(addToCart.fulfilled,(state,action)=>{
         state.isLoading=false,
         state.cartItems=action.payload?.data
    }).addCase(addToCart.rejected,(state)=>{
        state.isLoading=false,
        state.cartItems=[]
    }).addCase(fetchCartItem.pending,(state)=>{
        state.isLoading=true
    }).addCase(fetchCartItem.fulfilled,(state,action)=>{
        state.isLoading=false,
        state.cartItems=action.payload?.data
    }).addCase(fetchCartItem.rejected,(state)=>{
        state.isLoading=false,
        state.cartItems=[]
    }).addCase(updateCartItem.pending,(state)=>{
        state.isLoading=true
    }).addCase(updateCartItem.fulfilled,(state,action)=>{
        state.isLoading=false,
        state.cartItems=action.payload?.data
    }).addCase(updateCartItem.rejected,(state)=>{
        state.isLoading=false,
        state.cartItems=[]
    }).addCase(deleteCartItem.pending,(state)=>{
        state.isLoading=true
    }).addCase(deleteCartItem.fulfilled,(state,action)=>{
        state.isLoading=false,
        state.cartItems=action.payload?.data
    }).addCase(deleteCartItem.rejected,(state)=>{
        state.isLoading=false,
        state.cartItems=[]
    })
}
})

export default shoppingCartSlice.reducer