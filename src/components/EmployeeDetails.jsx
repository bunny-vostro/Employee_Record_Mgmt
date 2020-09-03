import React from "react";
import { useParams, useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ADD_EMPLOYEE, ADD_EMPLOYEE_SUCCESSED, GET_EMPLOYEE_DETAIL, GET_EMPLOYEE_DETAIL_FAILED, GET_EMPLOYEE_DETAIL_SUCESSED, UPDATE_EMPLOYEE, UPDATE_EMPLOYEE_SUCESSED } from "../constants/constant";
import { useState } from "react";
import { useRef } from "react";
import { getEmployeeInfo } from "../api";

import "../styles/EmployeeDetails.css";
import { useEffect } from "react";
import Loader from "./Loader";

const backButton = require("../images/back-button.png");

function EmployeesDetails(props) {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const nameRef = useRef(null);
    const skillRef = useRef(null);
    const projectRef = useRef(null);

    const loader = useSelector(state => state.reducer.loading);

    const [techStack, setTechStack] = useState([]);

    useEffect(() => {
        async function fetchEmployeeData() {
            if (id) {
                try {
                    dispatch({type: GET_EMPLOYEE_DETAIL});
                    const employeeDetail = await getEmployeeInfo(id);
                    
                    nameRef.current.value = employeeDetail[0].name;
                    projectRef.current.value = employeeDetail[0].projectAssigned;
                    let techStack = [...employeeDetail[0].techStack];
                    setTechStack(techStack);
                    dispatch({type: GET_EMPLOYEE_DETAIL_SUCESSED});
                }
                catch(err) {
                    dispatch({type: GET_EMPLOYEE_DETAIL_FAILED});
                }
            }
        }   
        fetchEmployeeData();     
    }, id);

    function goBack() {
        history.goBack();
    }

    function AddEmployee() {
        const detail = {
            name: nameRef.current.value,
            projectAssigned: projectRef.current.value,
            techStack: techStack
        };
        dispatch({ type: ADD_EMPLOYEE, detail });
        dispatch({ type: ADD_EMPLOYEE_SUCCESSED});
        
        nameRef.current.value = "";
        projectRef.current.value = "";

        history.goBack();
    }

    function resetValues() {
        nameRef.current.value = "";
        projectRef.current.value = "";
        setTechStack([]);
    }

    function cancel() {
        nameRef.current.value = "";
        projectRef.current.value = "";
        setTechStack([]);
        history.goBack();
    }

    function addTechStack() {
        const oldStack = [...techStack, skillRef.current.value];
        setTechStack(oldStack);
        skillRef.current.value = "";
    }

    function updateEmployee() {
        const detail = {
            id: id,
            name: nameRef.current.value,
            projectAssigned: projectRef.current.value,
            techStack: techStack
        };
        dispatch({ type: UPDATE_EMPLOYEE, detail });
        dispatch({ type: UPDATE_EMPLOYEE_SUCESSED });
        cancel();
    }

    function removeFromTechStack(index) {
        let oldStack = [...techStack];
        setTechStack(oldStack.filter((v, i) => i != index));
    }

    return <div>
        {loader && <Loader />}
        <div className={["banner"]}>
            <h2> {id ? "Edit Employee" : "Create Employee"} </h2>
        </div>
        
        <form className={["form"]}>
            {id && <div className={["form-group"]}>
                <label htmlFor="name">Id:</label>
                <input type="text" className={["form-control"]} id="id_id" readOnly value={id} name="_id" />
            </div>}
            <div className={["form-group"]}>
                <label htmlFor="name">Name:</label>
                <input type="text" ref={nameRef} className={["form-control"]} readonly= {id} id="name"  placeholder="Enter Employee Name" name="name" />
            </div>
            <div className={["form-group"]}>
                <label htmlFor="tech_stack">Assign Skill:</label>
                <input type="text" ref={skillRef} className={["form-control"]} id="tech_name" placeholder="Enter Skill Name" name="skill_name" />
                <div className={["techStack"]}>                    
                    {techStack && 
                    <div>
                        {techStack.map((skill, index) => 
                        <span key={index} className={["badge badge-secondary badge-space"]}>
                            {skill}  
                            <span onClick={() => removeFromTechStack(index)} className={["badge close-badge"]}>x</span>
                        </span>)}
                    </div>}
                    <div>
                        <input type="button" className={["btn btn-secondary"]} value="Add Skill" onClick={addTechStack} />
                    </div>
                </div>
            </div>
            <div className={["form-group"]}>
                <label htmlFor="project_name">Assign Project:</label>
                <input type="text" className={["form-control"]} ref={projectRef} id="project_name" placeholder="Enter Project Name" name="project_name" />
            </div>
            <div>
                <input type="button" className={["btn btn-primary mg-rt-15"]} value={id ? "Update" : "Create"} onClick={id ? updateEmployee : AddEmployee} /> 
                <input type="button" className={["btn btn-secondary mg-rt-15"]} value="Cancel" onClick={cancel} /> 
                <input type="button" className={["btn btn-secondary"]} value="Reset" onClick={resetValues} /> 
            </div>
        </form>


    </div>;
}

export default withRouter(EmployeesDetails);