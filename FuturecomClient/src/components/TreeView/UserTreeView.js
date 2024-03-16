import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const data = [
    {
        id: 'parent3',
        name: 'Hesabım',
        children: [
          { id: 'P3C1', name: 'Hesap Bilgileri',address:'myaccount' },
         
        ],
      },
  ]

function Validate(){
  const token = localStorage.getItem('token');


  axios.get('https://localhost:7069/api/User', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Hata:', error);
  });
}

  export default function UserTreeView() {
    const [id,setId]=useState('')

    const navigate = useNavigate();
  
    function NavToMenu(islem){

        if(islem=='myaccount')
        {
          navigate(`/myaccount/${id}`);
        }
      
       
      }
      
 useEffect(()=>{
    const getid=localStorage.getItem('id')
    setId(getid)
 })
    return (
      <Box sx={{ minHeight: 110, width: 200}}>
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