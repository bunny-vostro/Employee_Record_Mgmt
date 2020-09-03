import React from 'react';
import "../styles/LoginComponent.css";
import { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN, LOGOUT } from '../constants/constant';

const avatar = require("./../images/login.png");
function Login(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.reducer.isLogin);

    useEffect(() => {
        if (isLogin) 
            dispatch({type: LOGOUT});
    });

    const [showError, setShowError] = useState(false);
    
    const username = useRef();
    const password = useRef();

    function login() {
        if (username.current.value === "admin" && password.current.value === "admin") {
            dispatch({type: LOGIN});
            history.push("/list");
        }

        else {
            username.current.value = "";
            password.current.value = "";
            history.push("/");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 5000);
        }
    }

    return <div className={["login-main-window"]}>
        {showError && <div className={["alert alert-warning"]} role="alert">
            Please Enter Valid username and password
        </div>}
        <div>
            <img alt="avatar" className={["mx-auto d-block rounded-circle avatar"]} src={avatar} />
        </div>
        <form>
            <div className={["form-group"]}>
                <label for="user">Name:</label>
                <input type="text" ref={username} className={["form-control"]} placeholder="Enter username" name="username" />
            </div>
            <div className={["form-group"]}>
                <label for="password">Password:</label>
                <input type="password" ref={password} className={["form-control"]} placeholder="Enter password" name="password" />
            </div>
            <button type="button" onClick={() => login()} className={["btn btn-primary mx-auto d-block btn-lg"]}>
                Submit
            </button>
        </form>
    </div>;
}


export default Login;