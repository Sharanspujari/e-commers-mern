import { Routes,Route } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import AdminLayout from "./components/admin-section/layout"
import AdminDashboard from "./pages/admin-section/dashboard"
import AdminProducts from "./pages/admin-section/products"
import AdminOrders from "./pages/admin-section/orders"
import AdminFeatures from "./pages/admin-section/features"
import ShoppingLayout from "./components/shopping-section/layout"
import NotFound from "./pages/not-found"
import ShoppingHome from "./pages/shopping-section/home"
import ShoppingListing from "./pages/shopping-section/listing"
import ShoppingCheckout from "./pages/shopping-section/checkout"
import ShoppingAccount from "./pages/shopping-section/account"
import CheckAuth from "./components/common/check-auth"
import UnauthPage from "./pages/unauth-page"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"
import { Skeleton } from "@/components/ui/skeleton"


function App() {
//  const isAuthenticated =false;
//  const userInfo = null;

 const {user,isAuthenticated,isLoading} = useSelector((state)=>state.auth)
 console.log('user: ', user);
 console.log('isAuthenticated: ', isAuthenticated);
 console.log('isLoading: ', isLoading);
 const dispatch = useDispatch();

 useEffect(()=>{
  
  dispatch(checkAuth())
  
 },[dispatch])
 
 if(isLoading) return <Skeleton className="w-full bg-gray-500 h-[600px]" />

 
  return (
 <div className="flex flex-col overflow-hidden bg-white">
 <Routes>
  
  <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} userInfo={user}>
    <AuthLayout/>
  </CheckAuth>}>
   <Route path="login" element={<AuthLogin/>}/>
   <Route path="register" element={<AuthRegister/>}/>
  </Route>

  {/* Admin related pages */}
  <Route path="/admin"
   element={
   <CheckAuth isAuthenticated={isAuthenticated} userInfo={user}>
    <AdminLayout/>
  </CheckAuth>}
   >

    <Route path="dashboard" element={<AdminDashboard/>}/>
    <Route path="products" element={<AdminProducts/>}/>
    <Route path="orders" element={<AdminOrders/>}/>
    <Route path="features" element={<AdminFeatures/>}/>
  </Route>

  {/* Shopping related pages */}
  <Route path="/shop" element={<CheckAuth isAuthenticated={isAuthenticated} userInfo={user}>
    <ShoppingLayout/>
  </CheckAuth>}>
   <Route path="home" element={<ShoppingHome/>}/>
   <Route path="listing" element={<ShoppingListing/>}/>
   <Route path="checkout" element={<ShoppingCheckout/>}/>
   <Route path="account" element={<ShoppingAccount/>}/>
  </Route>

  <Route path="/unauth-page" element={<UnauthPage/>}/>
  <Route path="*" element={<NotFound/>}/>
 </Routes>
 </div>
  )
}

export default App
