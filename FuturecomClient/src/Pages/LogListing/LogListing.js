import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';


const LogListing = () => {


  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://localhost:7069/Log");
        setList(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, [list]); 

  const columns = [
  
    { field: 'userLogID', headerName: 'ID', width: 100 },
    { field: 'userID', headerName: 'User ID', width: 300 },
    { field: 'type', headerName: 'Type', width: 50 },
    {field:'createdDate',headerName:'Date',width:200, valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('en-EN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        });
      },},
    {field:'token',headerName:'Token',width:300},
   
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
     
    },
  ];


  const getRowId2 = (row) => row.userLogID;
 

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={list}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
       getRowId={getRowId2}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default LogListing;
