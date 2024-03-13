import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import {useNavigate} from "react-router-dom";
import './button_style.css'

import axios from 'axios';

const data = [
    {
      id: 'parent1',
      name: 'Loglar',
      children: [
        { id: 'P1C1', name: 'Logları Listele',address:'listlog' },
      ],
    },
    {
        id: 'parent3',
        name: 'Kullanıcılar',
        children: [
          { id: 'P3C1', name: 'Kullanici Ekle',address:'adduser' },
          { id: 'P3C2', name: 'Kullanici Listele',address:'listuser' },
        ],
      },
  ]






  export default function TreeViewObject() {

    const navigate = useNavigate();
    function Validate(){


      const token = localStorage.getItem('token');
      axios.get('https://localhost:7069/User', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
        navigate('/listuser')
      })
      .catch(error => {
        console.error('Hata:', error);
      });
    }

    function NavToMenu(islem){
      if(islem=='listuser')
      {
        navigate('/listuser');
      }
      else if(islem=='adduser')
      {
        navigate('/adduser');
      }
      else if(islem=='Logout')
      {
         localStorage.removeItem('token'); 
          navigate('/login');
      }
      else if(islem=='listlog')
      {
        navigate('/listlog')
      }
     
    }
    

    return (
      <Box sx={{ minHeight: 110,maxWidth: 200}}>
        <TreeView
          aria-label="rich object"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {data.map((parent) => (
            <TreeItem key={parent.id} nodeId={parent.id} label={parent.name}>
              {parent.children && parent.children.map((child) => (
                 
                 <button 
                
                 className='button'
                 key={child.id}
                 nodeId={child.id}
                 onClick={()=>NavToMenu(child.address)}
                >
                 {child.name}
               </button>
              
              ))}
            </TreeItem>
          ))}
        </TreeView>
      </Box>
    );
  }