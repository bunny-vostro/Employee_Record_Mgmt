import React from "react";
import "../styles/Modal.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { DELETE_EMPLOYEE, DELETE_EMPLOYEE_SHOW_MODAL, DELETE_EMPLOYEE_SUCESSED, DELETE_EMPLOYEE_HIDE_MODAL, ID } from "../constants/constant";

export function List(props) {
    return <div>
        <table className={["table table-stripped"]}>
            <thead className={["primary"]}>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Project Assigned</th>
                    <th>Technology Stack</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.list.map(item => <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.projectAssigned}</td>
                    <td>{item.techStack}</td>
                    <td>
                        <button type="button" className="btn btn-primary" onClick={() => props.edit(item.id)} data-dismiss="grid">Edit</button>
                    </td>
                    <td>
                        <button type="button" className="btn btn-secondary" onClick={() => props.delete(item.id)} data-dismiss="grid">Delete</button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </div>;
}

export default function Grid(props) {
    const dispatch = useDispatch();
    const modalShow = useSelector(state => state.reducer.showModel);
    let idToDelete = useSelector(state => state.reducer.id);

    function onDeleteClick(id) {
        dispatch({type: ID, id});
        dispatch({type: DELETE_EMPLOYEE_SHOW_MODAL});
    }

    function onDeleteBoxConfirmation() {
        props.delete(idToDelete);
        dispatch({type: DELETE_EMPLOYEE_HIDE_MODAL});
    }

    function onDeleteBoxConfirmationNegate() {
        dispatch({type: DELETE_EMPLOYEE_HIDE_MODAL});
    }

    return <div>
        <List  {...props} delete={onDeleteClick}/>
        {modalShow && <Modal>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Delete Employee Confirmation</h4>
                    </div>
                    <div className="modal-body">
                        <p> Are you Sure You want to delete Employee ? </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={() => onDeleteBoxConfirmation()} data-dismiss="modal">Confirm</button>
                        <button type="button" className="btn btn-secondary" onClick={() => onDeleteBoxConfirmationNegate()} data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </Modal> 
        }
    </div>
}