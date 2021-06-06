import React from "react";
import './index.css';

import {BrowserRouter, Link, Route} from "react-router-dom";
import ProductScreen from "./pages/ProductScreen/productscreen.component.jsx";
import HomeScreen from "./pages/HomeScreen/homescreen.component";
import CartScreen from "./pages/CartScreen/cartscreen";
import { useDispatch, useSelector } from "react-redux";
import SignInScreen from "./pages/SignInScreen/SignInScreen";
import { signout } from "./redux/actions/userActions";
import RegisterScreen from "./pages/RegisterScreen/RegisterScreen";
import ShippingAddressScreen from "./pages/ShippingAddressScreen/ShippingAddressScreen";
import PaymentMethodScreen from "./pages/PaymentMethodScreen/PaymentMethodScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen/PlaceOrderScreen";
import OrderScreen from "./pages/OrderScreen/OrderScreen";
import OrderHistoryScreen from "./pages/OrderHistoryScreen/OrderHistoryScreen";
import ProfileScreen from "./pages/ProfileScreen/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./pages/ProductListScreen/ProductListScreen";
import ProductEditScreen from "./pages/ProductEditScreen/ProductEditScreen";
import OrderListScreen from "./pages/OrderListScreen/OrderListScreen";
import UserListScreen from "./pages/UserListScreen/UserListScreen";
import UserEditScreen from "./pages/UserEditScreen/UserEditScreen";
import AboutScreen from "./pages/AboutScreen/AboutScreen";

function App() {

  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
     dispatch(signout());
  }

  const currentYear= new Date().getFullYear();

  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/" alt="home">MC</Link>
        </div>
        <div>
          <Link to="/cart">Cart
          {
            cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )
          }
          </Link>
          <Link to="/about">
             About
          </Link>
          {
            userInfo ? (
              <div className="dropdown">
              <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
               <li>
                 <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
               </li>
               <li>
                 <Link to="/profile">User</Link>
               </li>
               <li>
                 <Link to="/orderhistory">Order History</Link>
               </li>
              </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )
          }
          {
            userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">Admin {' '} <i className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )
          }
        </div>
      </header>
      <main className="main">
      <Route path="/cart/:id?" component={CartScreen} exact></Route>
      <Route path="/about" component={AboutScreen}></Route>
      <Route path="/product/:id" component={ProductScreen} exact></Route>
      <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
      <Route path="/signin" component={SignInScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Route path="/shipping" component={ShippingAddressScreen}></Route>
      <Route path="/payment" component={PaymentMethodScreen}></Route>
      <Route path="/placeorder" component={PlaceOrderScreen}></Route>
      <Route path="/order/:id" component={OrderScreen}></Route>
      <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
      <PrivateRoute 
      path="/profile"
      component={ProfileScreen}>
       </PrivateRoute>
       <AdminRoute
       path="/productlist"
       component={ProductListScreen}>
       </AdminRoute>
       <AdminRoute
       path="/orderlist"
       component={OrderListScreen}>
       </AdminRoute>
       <AdminRoute
       path="/userlist"
       component={UserListScreen}>
       </AdminRoute>
       <AdminRoute
       path="/user/:id/edit"
       component={UserEditScreen}>
       </AdminRoute>
      <Route path="/" component={HomeScreen} exact></Route>
      </main>
      <footer className="row center column">
         <div className="icons">
           <Link className="f-icon">
             <i className="fa-2x social-icon fab fa-twitter"></i>
           </Link>
           <Link className="f-icon">
             <i className=" fa-2x social-icon fab fa-facebook"></i>
           </Link>
           <Link className="f-icon">
             <i className="fa-2x social-icon fab fa-instagram"></i>
           </Link>
           <Link className="f-icon">
             <i className="fa-2x social-icon fas fa-envelope"></i>
           </Link>
         </div>
         <p className="copyright">© copyright {currentYear} Emsi's Fluid Acrylics</p>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
