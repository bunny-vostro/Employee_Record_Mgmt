import React, { useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import "../styles/Employees.css";

import { GET_EMPLOYEES, GET_EMPLOYEES_SUCESSED, GET_EMPLOYEES_FAILED, DELETE_EMPLOYEE, DELETE_EMPLOYEE_SUCESSED } from "../constants/constant";
import { getEmployees } from "../api";
import Grid from "./List";
import Loader from './Loader';

function EmployeeList() {
    const history = useHistory();

    const state = useSelector(state => state.reducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type:GET_EMPLOYEES});

        async function fetchData () {
            try {
                const employees = await getEmployees();
                dispatch({
                    type: GET_EMPLOYEES_SUCESSED,
                    data: employees
                });
            }
            catch(err) {
                dispatch({
                    type: GET_EMPLOYEES_FAILED,
                    data: err
                });
            }
        }
        fetchData();
    }, [state.employees]);

    function viewEmployeeDetails (id) {
        const _path = `/employeeDetails/${id}`;
        history.push(_path);
    }

    function createEmployeeWindow() {
        history.push("/employeeDetails");
    }

    function editEmployeeWindow(id) {
        history.push("/employeeDetails/"+id);
    }

    function deleteEmployeeWindow(id) {
        dispatch({ type: DELETE_EMPLOYEE, id});
        dispatch({type: DELETE_EMPLOYEE_SUCESSED});
    }

    return <div>
        {state.loading && <Loader />}
        <div className={["banner"]}>
            <h2>Employee Dashboard </h2>
        </div>
        <div className={["form"]}>
            <div className={["form-group"]}>
            <input type="button" className={["btn btn-primary"]} onClick={() => createEmployeeWindow()} value="Add New Employee" />
            </div>

            <Grid list={state.employees || []} edit={editEmployeeWindow} delete={deleteEmployeeWindow}/>
        </div>
    </div>;
}
export default withRouter(EmployeeList);