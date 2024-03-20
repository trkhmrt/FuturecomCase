import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {useNavigate} from "react-router-dom";

export default function MenuList() {
 
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [userId,setUserId] =React.useState(localStorage.getItem('userId'))

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{height:'100%', width:'40vh',maxWidth: 360, backgroundColor: 'rgba(64, 64, 64, 0.1)'
      
       }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      
    >
         {localStorage.getItem('role')==='Admin' ? <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
       
        <ListItemText primary="Logs" sx={{color:'white'}} onClick={()=>navigate('/loglist')}/>
      </ListItemButton> : <></>}
      
    
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder/>
            </ListItemIcon>
            <ListItemText primary="MyProfile" sx={{color:'white'}} onClick={()=>navigate(`/myprofile`)} />
            

          </ListItemButton>
         
        </List>
      </Collapse>
    </List>
  );
}