import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Switch from '@mui/material/Switch';


export default function ListUser() {
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const rowsPerPage = 5;
 


  useEffect(() => {
    fetchData();
  }, []); // Fetch data on initial render

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7069/User/listuser');
      setUserData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TableContainer component={Paper} sx={{ width: '50vw', height: '50vh', backgroundColor: 'rgba(255,255,255,0.2)' }}>
        <Table sx={{ minWidth: '50vw' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
            
            
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Edit</TableCell>
           
            </TableRow>
          </TableHead>
          <TableBody >
            {userData.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((user) => (
              <TableRow key={user.id} style={{ backgroundColor: user.status === false ? 'red' : 'inherit'}}>
                <TableCell component="th" scope="row">
                  {user.userName}
                </TableCell>
                <TableCell align="right">{user.firstName}</TableCell>
                <TableCell align="right">{user.lastName}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.phoneNumber}</TableCell>
                
              
                <TableCell align="right">{user.status===false ? <p>Passive</p> : <p>Active</p>}</TableCell>

                <TableCell align="right">  
                <IconButton aria-label="delete" size="large">
                <DeleteIcon />
                </IconButton>
                </TableCell>
                
                <TableCell align="right"><EditNoteIcon></EditNoteIcon></TableCell>
                
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(userData.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          sx={{ justifyContent: 'center', mt: 2 }}
        />
      </div>
    </div>
  );
}
