import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListUser.css'

const ListUser = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://localhost:7069/User");
        setList(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, [list]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 320 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'status', headerName: 'Status', width: 100},
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </button>
          <button onClick={() => navigate(`/myaccount/${params.row.id}`)}>
            View Details
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = async (userId) => {
    if (!userId) {
      console.error('Error: User ID is missing.');
      return; 
    }

    const confirmation = window.confirm(`Are you sure you want to delete user ${userId}?`);
    if (confirmation) {
      try {
        const response = await axios.post(`https://localhost:7069/User/delete`, {
          id: userId,
        });
        if (response.status === 200) {
          const updatedList = list.filter((item) => item.id !== userId);
          setList(updatedList);
        } else {
          console.error('Error deleting user:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting user:', error.message);
      }
    }
  };

 

  return (
    <div style={{ height: 400, width: '1000px' }}>
      <DataGrid
        rows={list}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
       
      />
    </div>
  );
};

export default ListUser;
