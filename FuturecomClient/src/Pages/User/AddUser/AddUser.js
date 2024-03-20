import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import './AddUser.css';
import { Button } from '@mui/material';
import axios from 'axios';
import Snackbar from '../../../components/Snackbar/Snackbar';

const AddUser = () => {
    const [token,setToken] = useState('')
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('NormalUser');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackmessage,setSnackmessage] = useState('')
    const [messagetype,setMessageType] = useState('')


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
    
    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSnack=(status,message,type)=>{
      setSnackbarOpen(status);
      setSnackmessage(message)
      setMessageType(type)
      setTimeout(() => {
       setSnackbarOpen(false)
    }, 4000);
    }

    const addUser = async () => {
        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('refreshtoken')}`,
              id:localStorage.getItem('userId')
            }
          };

        const user = {
            FirstName: firstName,
            LastName: surname,
            UserName: username,
            Password: password,
            Email: email,
            PhoneNumber: phone,
            Role: role
        };

        try {
            const response = await axios.post("https://localhost:7069/User/adduser", user,config);
            if(response.status===200){
              handleSnack(true,'Kayıt BAŞARILI','success')
            }
           
            
        } catch (error) {
            console.error(error.message);
            handleSnack(true,error.response.data.message,'error')
           
        }
    };

    return (
        <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: '30vw', maxHeight: '60vh', display: 'flex', flexDirection: 'column', padding: 20, justifyContent: 'space-evenly', minHeight: '60vh', borderRadius: 20 ,gap:10}}>
            <h1 className='header'>ADD USER</h1>
            <TextField label="Firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <TextField label="Lastname" value={surname} onChange={(e) => setSurname(e.target.value)} />
            <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    onChange={handleChange}
                >
                    <MenuItem value="TeamLead">Takım Lideri</MenuItem>
                    <MenuItem value="TestUzmanı">Test Uzmanı</MenuItem>
                    <MenuItem value="VeritabanıUzmanı">Veritabanı Uzmanı</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="NormalUser">Normal User</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" color="success" onClick={addUser}>
                Add User
            </Button>
            {snackbarOpen==true ? <Snackbar status={snackbarOpen}  message={snackmessage} type={messagetype} />: <></>}
        </div>
    );
};

export default AddUser;
