import './App.css';
import Home from './Pages/Home/Home';
import NotFound from './Pages/ErrorPages/404'
import Yetki from './Pages/ErrorPages/403'
import Login from './Pages/LoginScreen/Login';
import Adduser from './Pages/User/AddUser/AddUser';
import ListUser from './Pages/User/ListUser/ListUser';
import LogListing from './Pages/LogListing/LogListing';
import MyProfile from './Pages/User/UserInfo/MyProfile';
import AdminUserInfo from './Pages/User/UserInfo/AdminUserInfo'
import ChangePassword from './Pages/User/ChangeUserPassword/ChangePassword';
import { BrowserRouter as Router, Routes, Route,Redirect, Navigate } from "react-router-dom";
import Layout from './Pages/Layout/Layout';
import React,{ useEffect,useState } from 'react';

function App() {

  const [role,setRole]= useState(localStorage.getItem('role'))
 
  const [token,setToken]= useState(localStorage.getItem(''))
 
useEffect(()=>{
   
setRole(localStorage.getItem('role'))
setToken(localStorage.getItem('accesstoken'))
},[role,token])

useEffect(()=>{
   
  setRole(localStorage.getItem('role'))
  setToken(localStorage.getItem('accesstoken'))
  },[])



  return (
    <>
     
   
     
      
      <Routes>
        <Route  exact >
          <Route index  path="/"  element={<Login/>}/>
        <Route  element={<Layout/>}>
          <Route path="/home" element={<Home/>}></Route>
          <Route  path="/listuser" element={<ListUser/>}></Route>
          <Route  path="/adduser" element={<Adduser/>}></Route> 
          <Route  path="/myprofile" element={<MyProfile/>}></Route> 
          <Route  path="/userinfo/:userId" element={<AdminUserInfo/>}></Route> 
          
          <Route   path="/loglist" element={role==='Admin' ? <LogListing/> : 
          <Navigate to="/403" />}></Route>
          <Route path="/changepassword" element={<ChangePassword/>}></Route>
        </Route>

          <Route path="*" element={<NotFound />} />
          <Route path="/403" element={<Yetki/>}></Route>
          </Route>
        </Routes>
 

     
      </>
  );
}

export default App;
