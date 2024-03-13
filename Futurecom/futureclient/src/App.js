import './App.css';
import Anasayfa from './Pages/Home/Home';
import Login from './Pages/LoginScreen/LoginScreen';
import Adduser from './Pages/User/AddUser/AddUser';
import ListUser from './Pages/User/ListUser/ListUser';
import LogListing from './Pages/LogListing/LogListing';
import UserInfo from './Pages/User/UserInfo/UserInfo';
import ChangePassword from './Pages/User/ChangeUserPassword/ChangePassword';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './Pages/Layout/Layout';

function App() {
  return (
    <div>
      <Router>
        <Routes>
   
          <Route path="/" index element={<Login />} />

        
          <Route element={<Layout />}>
            
            <Route path="/anasayfa" element={<Anasayfa />} />
            <Route path="/adduser" element={<Adduser />} />
            <Route path="/listuser" element={<ListUser />} />
            <Route path="/listlog" element={<LogListing />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/myaccount/:id" element={<UserInfo />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
