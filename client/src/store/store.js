import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth-slice"
import adminProductsSlice from "./admin/product-slice"
import shoppingProductSlice from './user/products-slice'
import shoppingCartSlice from "./user/cart-slice/index"
const store = configureStore({
    reducer:{
     auth:authReducer,
     adminProducts:adminProductsSlice,
     shoppingProducts:shoppingProductSlice,
     shoppingCart:shoppingCartSlice
    }
})

export default store