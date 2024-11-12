import Home from './screen/Home';
import './App.css';
import { Card } from './com/Cont.js';
import {
  BrowserRouter as Router,
  Routes,

  Route
} from 'react-router-dom';
import Login from './screen/Login';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import Signup from './screen/Signup.js';
function App() {
  return (
<Card>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/user" element={<Signup/>}/>
        </Routes>
      </div>

    </Router>
    </Card>
  );
}

export default App;
