import React,{useEffect,useState} from "react"

const Anasayfa=({aT})=>{

  const [name,setName] = useState('')
  const [lastname,setLastname] = useState('')
  const [accesstoken,setAccesstoken] = useState('')
  const [refreshToken,setRefreshtoken] = useState('')
  const [role,setRole] = useState('')

  const displayAccessToken = (token) => {
    if (!token) {
      return ""; // Handle empty token case
    }

    const firstChars = token.slice(0, 10); // Show first 5 characters
    const lastChars = token.slice(-20); // Show last 5 characters
    const maskedPart = "..."; // Mask the middle characters

    return `${firstChars}${maskedPart}${lastChars}`;
  };

  useEffect(()=>{
    setName(localStorage.getItem('firstname'))
    setLastname(localStorage.getItem('lastname'))
    setAccesstoken(accesstoken)
    setRefreshtoken(localStorage.getItem('refreshtoken'))
    setRole(localStorage.getItem('role'))
    console.log(accesstoken)
   
  },[aT])

 

    return (
       
                <div style={{width:'80%',height:'100%',backgroundColor:
                'rgba(64, 64, 64, 0.1)',borderRadius:15,justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column'}}>
                    <h1 style={{color:'white',width:'100%',textAlign:'center'}}>{name} {lastname}</h1>

                   <div style={{width:'100%',backgroundColor:'rgba(255,255,255,0.1)',height:300}}>
                      
                           
                    <h2 style={{color:'white'}}>Refresh Token: {displayAccessToken(refreshToken)}</h2> 
                    <h2 style={{color:'white'}}>Role: {role}</h2>                             
                   </div>
                   
                </div>
                
    )
}

export default Anasayfa