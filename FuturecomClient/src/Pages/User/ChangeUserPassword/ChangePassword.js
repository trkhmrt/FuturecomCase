import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import Snackbar from '../../../components/Snackbar/Snackbar';

const PasswordValidator = () => {
  const [token,setToken] = useState('')
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackmessage, setSnackmessage] = useState('');
  const [messagetype, setMessageType] = useState('');

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('refreshtoken')}`,
      id:localStorage.getItem('userId')
    }
  };

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


  const handleChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
    setErrorMessage('');
  };

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
    setErrorMessage('');
  };

  const handleSnack = (status, message, type) => {
    setSnackbarOpen(status);
    setSnackmessage(message);
    setMessageType(type);
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 4000);
  };

  const handleSubmit = async (e) => {
    
    checkToken()

    e.preventDefault();

    const consecutiveCharsRegex = /012|123|234|345|456|567|678|789|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|ABC|BCD|CDE|DEF|EFG|FGH|GHI|HIJ|IJK|JKL|KLM|LMN|MNO|NOP|OPQ|PQR|QRS|RST|STU|TUV|UVW|VWX|WXY|XYZ/;
    const consecutiveDigitsRegex = /(\d)\1\1/;

    if (newPassword.length < 8) {
      setErrorMessage('Parola en az 8 karakter olmalıdır.');
    } else if (consecutiveCharsRegex.test(newPassword)) {
      setErrorMessage('Parola ardışık üç rakam veya üç harf içeremez.');
    } else if (consecutiveDigitsRegex.test(newPassword)) {
      setErrorMessage('Parola ardışık üç rakam içeremez.');
    } else {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('refreshtoken')}`,
            id:localStorage.getItem('userId')
          }
        };
        const response = await axios.post('https://localhost:7069/User/changepw', {
          CurrentPassword: currentPassword,
          NewPassword: newPassword,
          Id: localStorage.getItem('userId'),
          Token: localStorage.getItem('accesstoken')
        },config);
        
        if (response.data === 'Password changed successfully') {
          handleSnack(true, 'Şifre değiştirildi', 'success');
        } else {
          setErrorMessage(response.data);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Şifre değiştirilirken bir hata oluştu');
      }
    }
  };

  return (
    <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: '30vw', maxHeight: '60vh', display: 'flex', flexDirection: 'column', padding: 20, justifyContent: 'space-evenly', minHeight: '60vh', borderRadius: 20 ,gap:10}}>
      <h1 className='header'>Change Password</h1>

      <TextField
        label="Current Password"
        type="password"
        value={currentPassword}
        onChange={handleChangeCurrentPassword}
      />
      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={handleChangeNewPassword}
      />

      <Button variant="contained" color="success" onClick={handleSubmit}>
        Change Password
      </Button>
      {errorMessage && <p>{errorMessage}</p>}
      {snackbarOpen && <Snackbar status={snackbarOpen}  message={snackmessage} type={messagetype} />}
    </div>
  );
};

export default PasswordValidator;
