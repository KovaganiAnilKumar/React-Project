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
import FacebookLoginComponent from "./FaceBookLoginComponent";
import NotFound from "./NotFound";

import '@fortawesome/fontawesome-free/css/all.min.css'

function App()
{
  const cart = useSelector((state) =>state.cart);
  const totalItems = cart.reduce((sum,item) => sum + item.quantity,0);
 
  return(
          <>
            {/* <GoogleOAuthProvider clientId="652399850956-vo5m0icf87nns21shggs3bdbk2lf4ceu.apps.googleusercontent.com">
            <GoogleLoginComponent />
            </GoogleOAuthProvider> */}
            {/* <FacebookLoginComponent/> */}

             <BrowserRouter>
             <nav>
                  <Link to='/home'> <i className="fa-solid fa-house"></i> Home </Link>
                  <Link to='/veg'> <i className="fa-solid fa-carrot"></i> Veg Items</Link>
                  <Link to='/nonveg'> <i className="fa-solid fa-drumstick-bite"></i> NonVeg Items</Link>
                  <Link to='/cart'> <i className="fa-solid fa-cart-shopping"></i> Cart ({totalItems}) </Link>
                  <Link to='/purchase-history'> <i className="fa-solid fa-clock-rotate-left"></i> PurchaseHistory </Link>
                  <Link to='/aboutus'> <i className="fa-solid fa-address-card"></i> AboutUs </Link>
                  <Link to='/contactus'> <i className="fa-solid fa-address-book"></i> ContactUs </Link>
              </nav>

                        
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/veg" element={<Veg  />} />
                    <Route path="/nonveg" element={<NonVeg />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/purchase-history" element={<PurchaseHistory />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/contactus" element={<ContactUs />} />

                    {/* <Route path="*" element={<NotFound />} /> */}
                  </Routes>
             
             </BrowserRouter>
             
          
          </>
  )
}
export default App;