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


function App() {

  return (
 <div className="flex flex-col overflow-hidden bg-white">
 <Routes>
  <Route path="/auth" element={<AuthLayout/>}>
   <Route path="login" element={<AuthLogin/>}/>
   <Route path="register" element={<AuthRegister/>}/>
  </Route>
  {/* Admin related pages */}
  <Route path="/admin" element={<AdminLayout/>}>
    <Route path="dashboard" element={<AdminDashboard/>}/>
    <Route path="products" element={<AdminProducts/>}/>
    <Route path="orders" element={<AdminOrders/>}/>
    <Route path="features" element={<AdminFeatures/>}/>
  </Route>

  {/* Shopping related pages */}
  <Route path="/shop" element={<ShoppingLayout/>}>
   <Route path="home" element={<ShoppingHome/>}/>
   <Route path="listing" element={<ShoppingListing/>}/>
   <Route path="checkout" element={<ShoppingCheckout/>}/>
   <Route path="account" element={<ShoppingAccount/>}/>
  </Route>
  
  <Route path="*" element={<NotFound/>}/>
 </Routes>
 </div>
  )
}

export default App
