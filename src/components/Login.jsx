import React from 'react';
import "../styles/LoginComponent.css";

const avatar = require("./../images/login.png");

function Login(props) {
    return <div className={["login-main-window"]}>
        <div>
            <img alt="avatar" className={["mx-auto d-block rounded-circle avatar"]} src={avatar} />
        </div>
        {returnLoginForm()}
    </div>;
}

function returnLoginForm() {
    return <form>
        <div className={["form-group"]}>
            <label for="user">Name:</label>
            <input type="text" className={["form-control"]} placeholder="Enter username" name="username" />
        </div>
        <div className={["form-group"]}>
            <label for="password">Password:</label>
            <input type="password" className={["form-control"]} placeholder="Enter password" name="password" />
        </div>
        <button type="submit" className={["btn btn-primary mx-auto d-block btn-lg"]}>
            Submit
        </button>
    </form>;
}

export default Login;