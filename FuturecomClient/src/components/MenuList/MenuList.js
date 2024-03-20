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
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import BadgeIcon from '@mui/icons-material/Badge';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import {useNavigate} from "react-router-dom";

export default function MenuList() {
 
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width:'40vh',maxWidth: 360, backgroundColor: 'rgba(64, 64, 64, 0.1)'
      
       }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      
    >
      <ListItemButton>
        <ListItemIcon>
          <SyncAltIcon />
        </ListItemIcon>
        <ListItemText primary="Logs" sx={{color:'white'}} onClick={()=>navigate('/loglist')}/>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BadgeIcon />
        </ListItemIcon>
        <ListItemText primary="Roles" sx={{color:'white'}} />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
        <ManageAccountsIcon/>
        </ListItemIcon>
        <ListItemText primary="User Management" sx={{color:'white'}} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PersonAddIcon/>
            </ListItemIcon>
            <ListItemText primary="Add New User" sx={{color:'white'}} onClick={()=>navigate('/adduser')} />
            

          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <RecentActorsIcon/>
            </ListItemIcon>
            <ListItemText primary="User List" sx={{color:'white'}} onClick={()=>navigate('/listuser')} />
            
            
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}