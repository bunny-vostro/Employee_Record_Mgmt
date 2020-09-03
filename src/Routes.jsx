import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from "./components/Login";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeList from "./components/Employees";
import { useSelector } from "react-redux";
import GuardedRoute from "./components/GuardedRoute";


export default function Routes() {
    const isLogin = useSelector(state => state.reducer.isLogin);
    return (
      <Router>
          <Switch>
            <GuardedRoute component={EmployeeList} path="/list" auth={isLogin} />
            <GuardedRoute path="/employeeDetails/:id?" component={EmployeeDetails} auth={isLogin} />
            <Route exact path="/">
              <Login />
            </Route>
          </Switch>
      </Router>
    );
  }
  