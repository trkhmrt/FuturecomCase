import React, { useEffect,useState } from 'react';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";

const Navbar=()=>{
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('refreshtoken')}`,
      id:localStorage.getItem('userId')
    }
  };
  const [token,setToken] = useState('')
 

  const navigate = useNavigate();
 
    const handleLogout = async () => {
    
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('refreshtoken')}`,
            id:localStorage.getItem('userId')
          }
        };
        const features={
          token:localStorage.getItem('accesstoken'),
          id:localStorage.getItem('userId')
         }
        const response = await axios.post('https://localhost:7069/Auth/logout',features,config)
        localStorage.clear(); 
        navigate("/")
       
      } catch (error) {
        console.error('Logout hataı:', error);
        
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


 const settings = [{label:'Refresh Token',onClick:checkToken}, {label:'Change Password',onClick:()=>navigate('/changepassword')}, {label:'Logout',onClick:handleLogout}];
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const GoToHome = () => {
        navigate('/home')
      };

    return (

        <div style={{width:'auto',backgroundColor:'white',height:50,display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',border:'2px solid white',borderRadius:100,gap:20,padding:5}}>
            
            <Chip icon={<HomeIcon name="home" color="#fff"/>} label="Home" onClick={GoToHome} ></Chip>
            
          
         
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.label} onClick={setting.onClick ? setting.onClick : handleCloseUserMenu}>
                  <Typography textAlign="center" >{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </div>


    )
}

export default Navbar