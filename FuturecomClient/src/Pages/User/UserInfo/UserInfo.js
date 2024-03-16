import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminUserInfo from './AdminUserInfo'
import NormalUserInfo from './NormalUserInfo'
import { useParams } from 'react-router-dom';

const UserInfo = () => {
  const [user, setUser] = useState([]);
  const [role,setRole] =useState('')
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
        setRole(localStorage.getItem('role'))
      try {
        const response = await axios.get(`https://localhost:7069/User/${id}`); 
        setUser(response.data);
        
      } catch (error) {
        console.error(error.message);
      }
    }

    if (id) { 
      fetchData();
    }
  }, [id]);

  return (
    <div>
       
     {role =='Admin' ? <AdminUserInfo user={user}/> : <NormalUserInfo user={user}/>}
    </div>
  );
};

export default UserInfo;
