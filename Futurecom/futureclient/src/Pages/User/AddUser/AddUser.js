import { useEffect, useState } from 'react'
import './AddUser.css'
import { Button } from '@mui/material'
import axios from 'axios'
import Authorize from '../../404/404'
const AddUser=()=>{

    const [FirstName,setFirstName]=useState('')
    const [surname,setSurname]=useState('')
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [role, setRole] = useState('NormalUser')

    const addUser = async () => {
        const user = {
            FirstName: FirstName,
            LastName:surname,
            UserName:username,
            Password:password,
            Email:email,
            PhoneNumber:phone,
            Role:role
          };
        
        try {
          const response = await axios.post("https://localhost:7069/User/AddUser",user);
          alert('Kullanıcı Eklendi')
        } catch (error) {
          console.error(error.message); 
          alert("HATA")
        }
      };

      const handleFirstName = (event) => {
        setFirstName(event.target.value);
      };
      const handleSurName = (event) => {
        setSurname(event.target.value);
      };
      const handleUsername = (event) => {
        setUsername(event.target.value);
      };
      const handlePassword = (event) => {
        setPassword(event.target.value);
      };
      const handleEmail = (event) => {
        setEmail(event.target.value);
      };
      const handlePhone = (event) => {
        setPhone(event.target.value);
      };
      const handleRoleChange = (event) => {
        setRole(event.target.value);
      };

   

    return (

        
        <div className='AddUserContainer'>
         <h1>ADD USER PAGE</h1>
         <label>Name</label>
         <input value={FirstName} onChange={handleFirstName}></input> 
         <label>Surname</label>
         <input value={surname} onChange={handleSurName}></input> 
         <label>Username</label>
         <input value={username} onChange={handleUsername}></input>   
         <label>Password</label>
         <input value={password} onChange={handlePassword}></input>  
         <label>E-mail</label>
         <input value={email} onChange={handleEmail} type="email"></input> 
         <label>Phone Number</label> 
         <input value={phone} onChange={handlePhone} ></input> 
         <label>
          <input
            type="radio"
            value="NormalUser"
            checked={role === 'NormalUser'}
            onChange={handleRoleChange}
          />
          Normal User
        </label>
        <label>
          <input
            type="radio"
            value="Moderator"
            checked={role === 'Moderator'}
            onChange={handleRoleChange}
          />
          Moderator
        </label>
         <Button onClick={addUser} style={{border:'2px solid black',width:'100px',height:'50px'}}>ADD USER</Button>
         </div>

    )
}

export default AddUser