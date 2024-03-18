import React,{useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TreeView from '../../components/TreeView/TreeView'
import UserTreeView from '../../components/TreeView/UserTreeView'
import MenuList from '../../components/MenuList/MenuList'
import MenuListUser from '../../components/MenuList/MenuListUser'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios';

import { Link,Outlet} from "react-router-dom";

import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';


const pages = ['Anasayfa'];
const settings = ['Change Password', 'Refresh Token', 'Logout'];

function ResponsiveAppBar() {
  const [token,setToken] = useState('')
  const [id,setId]=useState('')
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [role,setRole]=useState('')

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = async () => {
    
   
    try {

      const response = await axios.post('https://localhost:7069/Auth/logout', {
        id: id,
        token: token
      });
      
      if(response.status==200)
      {
        alert('Çıkış başarılı')
        localStorage.removeItem('id')
        localStorage.removeItem('role')
        localStorage.removeItem('token')
        navigate('/');

      }
      else if(response.status==401)
      {
        alert('Başarısız')
      }
     
     
    } catch (error) {
      console.error(error.message); 
      console.log('helloo')
    }
  };


  
  function NavToMenu(islem){
    if(islem=='Change Password')
    {
      navigate('/changepassword');
    }
    else if(islem=='Refresh Token')
    {

    }
    else if(islem=='Logout')
    {
    
      logout()
        
      
        
      
     
      
       
    }
   
  }

  useEffect(() => {
    setId(localStorage.getItem('id'))
    setToken(localStorage.getItem('token'))
    setRole(localStorage.getItem('role'))
    
  }, []);

  return (
    
    <div style={{backgroundImage: '  linear-gradient( 109.6deg,  rgba(24,138,141,1) 11.2%, rgba(96,221,142,1) 91.1% )',display:'flex',flexDirection:'row'}}>
    <div>
       {localStorage.getItem('role')=='Admin' ?  <MenuList/>  : <MenuListUser/>  }   
    </div>
    <div style={{width:'100vw',height:'100vh',backgroundColor:'rgba(255,255,255,0.2)',display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'column',gap:30,padding:10}}>
      <Navbar></Navbar>
    <Outlet></Outlet>
    </div>
    
    </div>
  );
}
export default ResponsiveAppBar;