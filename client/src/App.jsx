import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
// import UserNavBar from './components/userNavbar'
import { AuthContext, AuthProvider } from './context/AuthContext'

import Home from './pages/shared/Home'
import SharedNavbar from "./components/SharedNavbar";
import Shopping from './pages/users/shopping'
import Login from './pages/shared/login'

import ManageProducts from './pages/admin/ManageProducts'
import ManageOrders from './pages/admin/Orders'
import MyOrders from './pages/users/MyOrders';

 


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <SharedNavbar /> <Home />
      </>
    )
  },
  {
    path: "/products",
    element: (
      <>
        <SharedNavbar /> <Shopping />
      </>
    )
  },
  {
    path: "/login",
    element: (
      <>
        <SharedNavbar /> <Login />
      </>
    )
  },
  {
    path: "/manageproducts",
    element: (
      <>
        <SharedNavbar /> <ManageProducts />
      </>
    )
  },
  {
    path: "/allorders",
    element: (
      <>
        <SharedNavbar /> <ManageOrders />
      </>
    )
  },
  ,
  {
    path: "/myorders",
    element: (
      <>
        <SharedNavbar /> <MyOrders />
      </>
    )
  },
  
  
  

])

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  // const logout = () => {
  //   localStorage.removeItem('token');
  //   setIsAuthenticated(false);
  // };
 
 
  return (
    <Container>
      <AuthProvider>
        <RouterProvider router={router} ></RouterProvider>
      </AuthProvider>
    </Container>
  )
}

export default App
