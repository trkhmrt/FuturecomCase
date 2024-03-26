import Button from '@mui/material/Button';
import unauthorize from './unauthorize.json'
import {useNavigate,useParams} from "react-router-dom";
import { Player, Controls } from '@lottiefiles/react-lottie-player';

const AuthorizePage=()=>{
    const navigate=useNavigate()
    const backTo=()=>{
       navigate('/home')
    }
    return(
       <div style={{width:'100vw',height:'100vh',backgroundImage: '  linear-gradient( 109.6deg,  rgba(24,138,141,1) 11.2%, rgba(96,221,142,1) 91.1% )',
       display:"flex",flexDirection:'column'
       }}>
          <Player
        autoplay
        controls
        loop
        mode="normal"
        src={unauthorize}
        style={{ width: 1000,height:500 }}
      >
       
      
      </Player>
      <Button onClick={backTo} >Back</Button>
       </div>
    )
}

export default AuthorizePage