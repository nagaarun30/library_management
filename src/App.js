import './App.css';
import { BrowserRouter, HashRouter, Link, Route, Routes} from 'react-router-dom';
import Home from './Components/ADMIN/Home';

import Base from './Components/Base';
import Login from './Components/ADMIN/Login';
import UserLogin from './Components/users/UserLogin';
import Account from './Components/users/Account';
import UserHome from './Components/users/UserHome';
import UserSignUp from './Components/users/UserSignUp';
import AddBooks from './Components/ADMIN/Manage Books/AddBooks';
import DeleteBooks from './Components/ADMIN/Manage Books/DeleteBooks';
import Editbooks from './Components/ADMIN/Manage Books/editbooks';
import UserManage from './Components/ADMIN/Manage User/UserManage';
import Deleteuser from './Components/ADMIN/Manage User/Deleteuser';
import Adduser from './Components/ADMIN/Manage User/Adduser';
import LibAcc from './Components/Lib Acc/LibAcc';
import Libgetbooks from './Components/Lib Acc/Libgetbooks';


function App() {
  return (
    <div className="App">
      <HashRouter basename='/'>        
        <Routes>
          <Route path="/" element={<Base/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/userlogin" element={<UserLogin/>} />
          <Route path="/account" element={<Account/>} />
          <Route path="/userhome" element={<UserHome/>} />
          <Route path="/usersignup" element={<UserSignUp/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/deletebooks" element={<DeleteBooks/>} />
          <Route path="/addbooks" element={<AddBooks/>} />
          <Route path="/editbooks" element={<Editbooks/>} />
          <Route path="/usermanage" element={<UserManage/>} />
          <Route path="/deleteuser" element={<Deleteuser/>} />
          <Route path="/adduser" element={<Adduser/>} />
          <Route path="/libgetbook" element={<Libgetbooks/>} />
          <Route path="/libaccount" element={<LibAcc/>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
