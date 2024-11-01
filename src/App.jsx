import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AboutUs from "./AboutUs";
import Cart from "./Cart";
import ContactUs from "./ContactUs";
import Home from "./Home";
import NonVeg from "./NonVeg";
import PurchaseHistory from "./PurchaseHistory";
import Veg from "./Veg";

import './App.css';
import { useSelector } from "react-redux";
import GoogleLoginComponent from "./GoogleLoginComponent";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App()
{
  const cart = useSelector((state) =>state.cart);
  const totalItems = cart.reduce((sum,item) => sum + item.quantity,0);
 
  return(
          <>
            <GoogleOAuthProvider clientId="652399850956-vo5m0icf87nns21shggs3bdbk2lf4ceu.apps.googleusercontent.com">
            <GoogleLoginComponent />
            </GoogleOAuthProvider>
  

             <BrowserRouter>
             <nav>
                  <Link to='/home'> Home </Link>
                  <Link to='/veg'> Veg Items</Link>
                  <Link to='/nonveg'> NonVeg Items</Link>
                  <Link to='/cart'> Cart ({totalItems}) </Link>
                  <Link to='/purchase-history'> PurchaseHistory </Link>
                  <Link to='/aboutus'> AboutUs </Link>
                  <Link to='/contactus'> ContactUs </Link>
              </nav>

                        
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/veg" element={<Veg  />} />
                    <Route path="/nonveg" element={<NonVeg />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/purchase-history" element={<PurchaseHistory />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/contactus" element={<ContactUs />} />
                  </Routes>
             
             </BrowserRouter>
             
          
          </>
  )
}
export default App;