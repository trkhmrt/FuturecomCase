import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import './MyProfile_style.css'



const MyProfile = () => {
  const [token,setToken] = useState('')
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('refreshtoken')}`,
      id:localStorage.getItem('userId')
    }
  };
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleUpdate = async () => {

    const checkToken = async ()=>{
  
      const features={
 
       refreshtoken:localStorage.getItem('refreshtoken'),
       accesstoken:localStorage.getItem('accesstoken'),
       userId:localStorage.getItem('userId')
      }
    
    
     
     
     const response = await axios.post(`https://localhost:7069/token/checktoken`,features,config)
    
     if(response.status==200)
     {
 
     }
      localStorage.removeItem('accesstoken')
      const t=localStorage.setItem('accesstoken',response.data)
      setToken(t)
     
   }


    const userId = localStorage.getItem('userId');
    try {
      checkToken()
      const response = await axios.put(`https://localhost:7069/User/normaluser/${userId}`, {
        mail: email,
        phone: phone
      }, config);
      console.log('Kullanıcı güncellendi:', response);
    } catch (error) {
      console.error('Kullanıcı güncellenirken hata oluştu:', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: '30vw', maxHeight: '60vh', display: 'flex', flexDirection: 'column', padding: 20, justifyContent: 'space-evenly', minHeight: '60vh', borderRadius: 20 ,gap:10}}>
      <h2 style={{textAlign:'center',color:'white'}}>Update Your Info</h2>
      <TextField 
        label="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <TextField 
        label="Phone" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
      />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Güncelle
      </Button>
    </div>
  );
};

export default MyProfile;
