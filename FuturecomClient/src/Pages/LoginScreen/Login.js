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
    setControl(false); // Close the modal by setting kontrol state to false
  };

  const handleLogin = async () => {
  
       
       
          
           
              try {
                if (isFieldEmpty(username) && !isFieldEmpty(password)) 
                  {
                    setHeader("UYARI")
                    setMessage("Kullanıcı adı boş geçilemez")
                    setControl(true)
                     
                  }
                  else if(!isFieldEmpty(username) && isFieldEmpty(password) ) 
                  {
                    setHeader("UYARI")
                    setMessage("Şifre boş geçilemez")
                    setControl(true)
                  }
                  else if(isFieldEmpty(username) && isFieldEmpty(password) )
                  {
                    setHeader("UYARI")
                    setMessage("Kullanıcı adı ve şifre boş geçilemez")
                    setControl(true)
                  }
                  else{
                   const response = await axios.post('https://localhost:7069/auth/login', {
                        UserName: username,
                        Password: password,
                      });
                   
                     if(response.status==200)
                     {
                        const token = response.data.token
                        const decodedToken = jwtDecode(token);
                        localStorage.setItem('userinfo',decodedToken)
                        const userId = decodedToken.id; // NameIdentifier için
const role = decodedToken.role; // Role için
const firstName = decodedToken.name; // İsim için
const lastName = decodedToken.lastname; // Soyisim için
const expDateInSeconds = decodedToken.exp;
const expDate = new Date(expDateInSeconds * 1000);

console.log('User ID:', userId);
console.log('Role:', role);
console.log('First Name:', firstName);
console.log('Last Name:', lastName);
console.log('Süre:',expDate)


                         


                        
                        navigate('/')
                     } 
                  }
               
              
                }
                catch (error) {
                    if (error.response) {
                        
                        setHeader(error.response.data.message)
                        setMessage("Kullanıcı adı veya parola hatalı")
                        setControl(true);
                      } 
                      else if (error.request) {
                        setHeader("SERVER HATASI")
                        setMessage(`İstek yapıldı, ancak yanıt alınamadı ${error.request}`)
                        setControl(true);
                      }
                     else if(error.response==200)
                     {
                       navigate('/anasayfa')
                     }
                      else {
                        // İstek yapılamadı
                        console.log('İstek yapılamadı:', error.message);
                      } 
                    
                }
                
                
                  
                
          }
     
        
     
  

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  useEffect(() => {}, [control]);

  return (
    <LoginPage style={{ height: '100vh' }}>
      <form onSubmit={handleSubmit}>
        <Username value={username} onChange={handleUsername}></Username>
        <Modal open={control} onClose={handleCloseModal} header={header} message={message} /> {/* Pass handleCloseModal function */}
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
