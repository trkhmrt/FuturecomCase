import { Password } from '@react-login-page/page7';
import {
    React,
    useState,
    Select,
    InputLabel,
    useParams,
    useEffect,
    TextField,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    Button,
    IconButton,
    DeleteIcon,
    EditIcon,
    Switch,
    Modal,
    FormControlLabel,
    FormControl,
    FormGroup,
    useNavigate,
    axios,
    Snackbar
  
} from '../../CustomImports/CustomImports.js';


export default function AdminUserInfo(){
    const [token,setToken] = useState('')
    const {userId} = useParams()
    const [user,setUser] = useState('')
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('NormalUser');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackmessage,setSnackmessage] = useState('')
    const [messagetype,setMessageType] = useState('')
    

    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('refreshtoken')}`,
          id:localStorage.getItem('userId')
        }
      };


    const checkToken = async ()=>{
  
        const features={
   
         refreshtoken:localStorage.getItem('refreshtoken'),
         accesstoken:localStorage.getItem('accesstoken'),
         userId:localStorage.getItem('userId')
        }
      
      
       
       
       const response = await axios.post(`https://localhost:7069/token/checktoken`,features,config)
      
       if(response.status==200)
       {
        localStorage.removeItem('accesstoken')
        const t=localStorage.setItem('accesstoken',response.data)
        setToken(t)
       }
       
       
     }
    
    const handleChange = (event) => {
        setRole(event.target.value);
    };
   
    

    const fetchUserData= async ()=>{
       
        try{
            const response = await axios.get(`https://localhost:7069/user/${userId}`,config)
            setUser(response.data.user)
            
            
        }
        catch{
            

        }

    }
    const updateUser=async()=>{
      
        checkToken()
        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
              id:localStorage.getItem('userId')
            }
          };
          try{
            const userData = {
                
                firstName: firstName || user.firstName, 
                surname: surname || user.surname,
                username: username || user.username,
                mail: mail || user.email,
                phone: phone || user.phoneNumber,
                role: role,
              };

            const response= await axios.put(`https://localhost:7069/user/adminupdate/${userId}`,userData,config)
          }
            catch(error){
                console.log(error.message)    
            }
          }
    

    useEffect(()=>{
        fetchUserData()
    },[userId])

    return(
        <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: '30vw', maxHeight: '60vh', display: 'flex', flexDirection: 'column', padding: 20, justifyContent: 'space-evenly', minHeight: '60vh', borderRadius: 20 ,gap:10}}>
        <h1 className='header'>UPDATE USER</h1>
        <TextField label={user.firstName} placeholder="type new firstname " value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <TextField label={user.lastName} placeholder="type new lastname" value={surname} onChange={(e) => setSurname(e.target.value)} />
        <TextField label={user.userName} placeholder="type new username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField label={user.email} placeholder="type new email" value={mail} onChange={(e) => setMail(e.target.value)} />
        <TextField label={user.phoneNumber} placeholder="type phonenumber" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                onChange={handleChange}
            >
               
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="NormalUser">Normal User</MenuItem>
            </Select>
        </FormControl>
        <Button variant="contained" color="success" onClick={updateUser}>
            Update User
        </Button>
        {snackbarOpen==true ? <Snackbar status={snackbarOpen}  message={snackmessage} type={messagetype} />: <></>}
    </div>
    )
    }