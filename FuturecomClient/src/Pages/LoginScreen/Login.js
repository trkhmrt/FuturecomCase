import React, { useState, useEffect } from 'react';
import LoginPage, { Reset, Logo, Password, Footer, Username, Button, Submit, Title } from '@react-login-page/page7';
import LoginLogo from 'react-login-page/logo-rect';
import Modal from '../../components/Dialog/Modal';
import {useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [control, setControl] = useState(false);
  const [message,setMessage] = useState('')  
  const [header,setHeader] = useState('')  
  const navigate = useNavigate();
  const config = {
    headers: {
      username: username,
      password:password,
     
    }
  };

  const isFieldEmpty = (field) => {
    return field.trim() == '';
  };
  

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleCloseModal = () => {
    setControl(false);
  };
  

  const handleLogin = async () => {
    if (isFieldEmpty(username) && !isFieldEmpty(password)) {
      setHeader("UYARI");
      setMessage("Kullanıcı adı boş geçilemez");
      setControl(true);
    } else if (!isFieldEmpty(username) && isFieldEmpty(password)) {
      setHeader("UYARI");
      setMessage("Şifre boş geçilemez");
      setControl(true);
    } else if (isFieldEmpty(username) && isFieldEmpty(password)) {
      setHeader("UYARI");
      setMessage("Kullanıcı adı ve şifre boş geçilemez");
      setControl(true);
    } else {
      try {
        const response = await axios.post('https://localhost:7069/auth/login', {
          UserName: username,
          Password: password,
        }, config);
  
        if (response.status === 200) {
          console.log(response.data.refreshToken);
  
          const token = response.data.accessToken;
          const refreshToken = response.data.refreshToken;
          localStorage.setItem("accesstoken", token);
          localStorage.setItem("refreshtoken", refreshToken);
          const decodedToken = jwtDecode(token);
          console.log(decodedToken);
  
          const userId = decodedToken.id;
          const role = decodedToken.role;
          const firstName = decodedToken.name;
          const lastName = decodedToken.lastname;
          const expDateInSeconds = decodedToken.exp;
          const expDate = new Date(expDateInSeconds * 1000);
          const expMinutes = expDate.getMinutes();
  
          localStorage.setItem('userId', userId);
          localStorage.setItem('role', role);
          localStorage.setItem('firstname', firstName);
          localStorage.setItem('lastname', lastName);
          localStorage.setItem('exp', expDate);
          localStorage.setItem('minute', expMinutes);
  
          navigate('/home');
        } 
       
       
      } 
      catch (error) {
       
        if (error.response) {
         
          setHeader("HATA");
          setMessage("İstek hatası");
          setControl(true);
          
        } 
        if (error.response.status === 401) {
          setHeader("HATA");
          setMessage("Kullanıcı Bulunamadı");
          setControl(true);
        }
       
      }
    }
  };
  
     
  

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  useEffect(() => {}, [control]);

  return (
    <LoginPage style={{ height: '100vh' }}>
      <form onSubmit={handleSubmit}>
        <Username value={username} onChange={handleUsername}></Username>
        <Modal open={control} onClose={handleCloseModal} header={header} message={message} /> 
        <Password value={password} onChange={handlePassword}></Password>
        <Submit type="submit" onClick={handleSubmit}>
          Login
        </Submit>
        <Title>FUTURECOM</Title>
        <Logo>
          <LoginLogo />
        </Logo>
      </form>
    </LoginPage>
  );
};

export default Login;
