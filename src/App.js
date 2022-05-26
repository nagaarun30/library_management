import './App.css';
import { BrowserRouter, HashRouter, Link, Route, Routes} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import DeleteBooks from './Components/DeleteBooks';
import AddBooks from './Components/AddBooks';
import Viewbooks from './Components/Viewbooks';
import Editbooks from './Components/editbooks';


function App() {
  return (
    <div className="App">
      <HashRouter basename='/'>        
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/deletebooks" element={<DeleteBooks/>} />
          <Route path="/addbooks" element={<AddBooks/>} />
          <Route path="/editbooks" element={<Editbooks/>} />
        </Routes>
      </HashRouter>

    </div>
  );
}

export default App;
