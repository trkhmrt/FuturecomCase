import './App.css';
import NotFound from './Pages/ErrorPages/404'
import Home from './Pages/Home/Home';
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
 
  
 
useEffect(()=>{
   
setRole(localStorage.getItem('role'))
  
},[role])

const [countdown, setCountdown] = useState(3 * 60); // 3 dakika * 60 saniye
/*
useEffect(() => {
  const timer = setInterval(() => {
    setCountdown((prevCountdown) => {
      if (prevCountdown === 0) {
        clearInterval(timer);
        alert("Süreniz doldu!");
      }
      return prevCountdown - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);
*/
useEffect(()=>{

})
const formatCountdown = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

  return (
    
 
      <Router>
       <Routes>
       
       <Route  index path="/Login"  element={<Login/>}></Route>
        <Route  element={<Layout/>}>
        <Route path="/home" element={<Home/>}></Route>
        <Route  path="/listuser" element={<ListUser/>}></Route>
        <Route  path="/adduser" element={<Adduser/>}></Route> 
        <Route  path="/myprofile" element={<MyProfile/>}></Route> 
        <Route  path="/userinfo/:id" element={<AdminUserInfo/>}></Route> 
        <Route   path="/loglist" element={role==='Admin' ? <LogListing/> : 
       <Navigate to="/403" />}></Route>
       <Route path="/changepassword" element={<ChangePassword/>}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/403" element={<Yetki/>}></Route>
        </Routes>
 
        
       
      </Router>
    
  );
}

export default App;
