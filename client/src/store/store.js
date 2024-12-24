import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth-slice"
import adminProductsSlice from "./admin/product-slice"
import shoppingProductSlice from './user/products-slice'
const store = configureStore({
    reducer:{
     auth:authReducer,
     adminProducts:adminProductsSlice,
     shoppingProducts:shoppingProductSlice
    }
})

export default store