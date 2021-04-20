import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { useAuth } from '../context/auth';
import axios from 'axios';


function Login(props) {
    const[isLoggedIn,setLoggedIn] = useState(false);
    const[isError,setIsError] = useState(false);
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const[setAuthTokens] = useAuth();
    const referer = props.location.state.referer || '/';

    function postLogin(){
        axios.post("https://www.somePlace.com/auth/login"
        // {
        //     userName,
        //     password
        //   }
          ).then(result => {
              if(result.status === 200){
                  setAuthTokens(result.data)
                  setLoggedIn(true)
              }else{
                  setIsError(true);
              }
          }).catch(e => {
            setIsError(true)
          });
    }

    if(isLoggedIn){
        return <Redirect to={referer}/>
    }
    return (
        <div>
        <div>
            <div className="form-label">
                <input type="text" value={username} placeholder="email"   onChange={e => setUsername(e.target.value)}/>
                <input type="password" value={password} placeholder="password" onChange={e => setPassword(e.target.value)}/>
            </div>
            <button onClick={postLogin}>Sign In</button>
        </div>
       <Link to="/signup">Don't have an account?</Link>
        { isError &&<span>The username or password provided were incorrect!</span> }
        </div>
    );
}

export default Login;