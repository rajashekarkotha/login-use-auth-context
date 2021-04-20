import { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import './App.css';
import { AuthContext } from './context/auth';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './PrivateRoute';

function App() {
  const[authTokens,setAuthTokens] = useState();

  const setTokens = (data) => {
    localStorage.setItem('tokens',JSON.stringify(data));
    setAuthTokens(data);
  }
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens:setTokens}}>
      <Router>
        <div>
          <ul>
             <li><Link to="/">Home page</Link></li>
             <li><Link to="/admin">Admin page</Link></li>
          </ul>
          <Route exact path="/" component={Home}/>
          <Route  path="/login" component={Login}/>
          <Route  path="/signup" component={Signup}/>
          <PrivateRoute  path="/admin" component={Admin}/>
        </div>
      </Router>
    
    </AuthContext.Provider>
  );
}

export default App;
