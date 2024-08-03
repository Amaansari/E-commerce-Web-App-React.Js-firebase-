import "remixicon/fonts/remixicon.css"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import "animate.css"

import NotFound from "./components/NotFound"
import AdminProducts from "./components/Admin/Product"
import Orders from "./components/Admin/Orders"
import Payments from "./components/Admin/Payments"
import Dashboard from "./components/Admin/Dashboard"
import Customers from "./components/Admin/Customers"
import Settings from "./components/Admin/Settings"
import Home from "./components/Home"
import Products from "./components/Products"
import Category from "./components/Category"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Contact from "./components/Contact"
import PreGuard from "./components/Guard/PreGuard"
import Cart from "./components/Cart"
import Profile from "./components/Profile"
import Failed from "./components/Failed"

const App=()=>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home slider />} />
        <Route path="/products" element={<Home slider={false} title="All Products" />} />
        <Route path="/category" element={<Category />} />

        <Route element={<PreGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="/cart" element={<Cart />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/admin">
          <Route path="payments" element={<Payments />} />
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<Orders />}/>

        </Route>
        <Route path="/failed" element={<Failed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;