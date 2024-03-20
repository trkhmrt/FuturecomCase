import {
    React,
    useState,
    useEffect,
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
    axios
  
} from '../../CustomImports/CustomImports.js';

export default function ListUser() {
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [open,setOpen] = useState(false)
  const [token,setToken] = useState('')
  const rowsPerPage = 5;
  const navigate=useNavigate()
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
      id:localStorage.getItem('userId')
    }
  };

  const handleModalOpen = (id) => {
    setOpen(true);
  };

  const handleModalClose = (id) => {
    setOpen(false);
  };




  useEffect(() => {
 

   fetchData() 
   
  }, []); 

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7069/User/listuser',config);
      setUserData(response.data);
    

      

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {

      const response = await axios.delete(`https://localhost:7069/User/delete/${userId}`,config);

      if (response.status === 200) {
        
        setUserData(userData.filter((user) => user.id !== userId));
      } else {
        console.error('Error deleting user:', response.data);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleEditClick = (userId) => {
    navigate(`/userinfo/${userId}`); 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TableContainer component={Paper} sx={{ width: '50vw', height: '50vh', backgroundColor: 'rgba(255,255,255,0.2)' }}>
        <Table sx={{ minWidth: '50vw' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
            
            
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Edit</TableCell>
           
            </TableRow>
          </TableHead>
          <TableBody >
            {userData.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((user) => (
              
              <TableRow key={user.id} style={{ backgroundColor: user.status === false ? 'red' : 'inherit'}}>
                <TableCell component="th" scope="row">
                  {user.userName}
                </TableCell>
                <TableCell align="center">{user.firstName}</TableCell>
                <TableCell align="center">{user.lastName}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phoneNumber}</TableCell>
                
              
                <TableCell align="right">
                    
                    <FormControlLabel
                      value="top"
                      control={<Switch color="primary" />}
                      label="Top"
                      labelPlacement="end"
                      
                    />
                </TableCell>

                <TableCell align="right">  
                <IconButton aria-label="delete" size="large" onClick={() => handleDeleteUser(user.id)}>
                <DeleteIcon />
                </IconButton>
                </TableCell>
                
                <TableCell align="right" onClick={()=>handleEditClick(user.id)}>
                  <IconButton  >
                  <EditIcon></EditIcon>
                  </IconButton>
                  </TableCell>
                
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
