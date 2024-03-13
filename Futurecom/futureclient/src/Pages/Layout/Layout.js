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
    <div style={{width:1280,height:'100%',display:'flex',flexDirection:'column'}}>
      <AppBar position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
             
              fontWeight: 300,
              
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
        
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                 <Link to={`/${page.toLowerCase()}`} style={{ my: 2, color: 'white', display: 'block' ,marginRight:20}}>
                 {page}
               </Link>
            ))}
          </Box>

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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Button  onClick={()=>NavToMenu(setting)} >{setting}</Button>
                 
                   
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <div style={{width:'100%',height:'100vh',display:'flex',flexDirection:'row'}}>
      <div style={{background:'#B4B4B8',width:'100%',height:'50%',display:'flex',flexDirection:'row',borderRadius:5}} >
      {role =='Admin' ?   <TreeView/> : <UserTreeView/>   }
     </div>
     <div style={{width:'1900px',height:'50%',display:'flex',justifyContent:'center',alignItems:'center'}}>

   
     <Outlet></Outlet>
    
        
     </div>
  
      </div>
   
    </div>
  );
}
export default ResponsiveAppBar;