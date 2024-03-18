import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios

const NormalUserInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://localhost:7069/User/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, [id]); // Add id to dependency array

  return (
    <div>
      {user ? (
        <>
          <p>Role: {user.Role}</p>
          <p>User Name: {user.User.name}</p> {/* Adjust for other user data fields */}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default NormalUserInfo;
