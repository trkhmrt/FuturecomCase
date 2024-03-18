import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import './MyProfile_style.css'

const MyProfile = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleUpdate = async () => {
    const userId = localStorage.getItem('userId');
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('refreshtoken')}`,
        id:localStorage.getItem('userId')
      }
    };
    try {
      const response = await axios.put(`https://localhost:7069/User/${userId}`, {
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
