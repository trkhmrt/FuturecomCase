import React,{useState,useEffect} from 'react'
import './Login.css'
import axios, { HttpStatusCode } from 'axios'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const LoginScreen=()=>{
    const [ka,setKa] = useState('') 
    const [sfr,setSfr] = useState ('')
    const [token, setToken] = useState('');
    const [checkka,setCheckka] = useState(false)
    const [checksfr,setChecksfr] = useState(false)
    const navigate = useNavigate();

    
      


    const handleUserName = (event) => {
        setKa(event.target.value);
      };

      const handlePassword = (event) => {
        setSfr(event.target.value);
      };



      const login = async () => {
        try{
        const data = {
            UserName: ka,
            Password: String(sfr),
          };

        
        if(!ka || !sfr){
            setCheckka(true)
            setChecksfr(true)
        }else{
        
            const response = await axios.post("https://localhost:7069/Auth/Login",data);
           
          
         
              if(response.status===200)
              {
                alert('Giriş başarılı')
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token);
                const decodedToken = jwtDecode(response.data.token);
                localStorage.setItem('id', decodedToken.id);
                localStorage.setItem('role',decodedToken.role)
                console.log(decodedToken.id)
                
                  
                navigate("/anasayfa")
              }
            } 
           
           
            
        }
               
               
               
              
          
        catch{
          alert('Kullanıcı adı veya şifre hatalı')
        }
      };

    
     
     

    return(

        <div className='Login'>
            <label>Username</label>
            <input type="text" value={ka} onChange={handleUserName} ></input>
            {checkka ? <span style={{color:'red'}}>Kullanıcı adı boş geçilemez</span> : <span></span>}
            <label>Password</label>
            <input security='password' value={sfr} onChange={handlePassword} type="password" ></input>
            {checksfr ? <span style={{color:'red'}}>Şifre boş geçilemez</span> : <span></span>}
            <button className='Button' onClick={login}>Login</button>
           
        </div>



    )
}

export default LoginScreen