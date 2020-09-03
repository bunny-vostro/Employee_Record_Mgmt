import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from "./components/Login";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeList from "./components/Employees";


export default function Routes() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/list">
              <EmployeeList />
            </Route>
            <Route path="/employeeDetails/:id?">
              <EmployeeDetails />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  