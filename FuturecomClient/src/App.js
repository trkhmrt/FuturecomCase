import './App.css';
import NotFound from './Pages/ErrorPages/404'
import Home from './Pages/Home/Home';
import Yetki from './Pages/ErrorPages/403'
import Login from './Pages/LoginScreen/Login';
import Adduser from './Pages/User/AddUser/AddUser';
import ListUser from './Pages/User/ListUser/ListUser';
import LogListing from './Pages/LogListing/LogListing';
import UserInfo from './Pages/User/UserInfo/UserInfo';
import ChangePassword from './Pages/User/ChangeUserPassword/ChangePassword';
import { BrowserRouter as Router, Routes, Route,Redirect, Navigate } from "react-router-dom";
import Layout from './Pages/Layout/Layout';
import React,{ useEffect,useState } from 'react';

function App() {

  const [role,setRole]= useState('standart')
  const [countdown, setCountdown] = useState(180);

useEffect(()=>{


  
},[role])

useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    if (countdown === 0) {
      alert('Süre doldu!');
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    
    
      <Router>
       <Routes>
       
       <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<Layout sure={countdown}/>}>
        <Route index element={<Home/>}></Route>
        <Route  path="/listuser" element={<ListUser/>}></Route>
        <Route  path="/adduser" element={<Adduser/>}></Route> 
        <Route   path="/loglist" element={role==='admin' ? <LogListing/> : 
       <Navigate to="/403" />}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/403" element={<Yetki/>}></Route>
        </Routes>
 
        
       
      </Router>
    
  );
}

export default App;
