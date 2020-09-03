import { GET_EMPLOYEES_SUCESSED, GET_EMPLOYEES_FAILED, GET_EMPLOYEES, ADD_EMPLOYEE, ADD_EMPLOYEE_SUCCESSED, GET_EMPLOYEE_DETAIL_SUCESSED, GET_EMPLOYEE_DETAIL, DELETE_EMPLOYEE_SHOW_MODAL, DELETE_EMPLOYEE_HIDE_MODAL, DELETE_EMPLOYEE, DELETE_EMPLOYEE_SUCESSED, DELETE_EMPLOYEE_FAILED, UPDATE_EMPLOYEE, UPDATE_EMPLOYEE_SUCESSED, UPDATE_EMPLOYEE_FAILED, ID} from "./../constants/constant";
import cloneDeep from "lodash/cloneDeep";

let initialState = {
  loading: false,
  employees: [],
  showModel: false,
  employeeIdCost: 100
};

function reducer(state = initialState, action){
switch (action.type) {
    case GET_EMPLOYEE_DETAIL:
    case GET_EMPLOYEES:
      return {...state, loading: true};

    case GET_EMPLOYEE_DETAIL_SUCESSED:
    case GET_EMPLOYEES_SUCESSED: 
    return {
      ...state,
      loading: false
    };

    case ID:
      return {
        ...state,
        id: action.id
      }

    case ADD_EMPLOYEE: {
      let id = state.employeeIdCost;
      action.detail.id = id + 1;
      let employees = [...state.employees, action.detail];
      return {
        ...state,
        employees: employees,
        loading: true,
        employeeIdCost: id + 1
      }
    }

    case ADD_EMPLOYEE_SUCCESSED:
      return {
        ...state,
        loading: false
      }
    
    case DELETE_EMPLOYEE_SHOW_MODAL:
      return {
        ...state,
        showModel: true
      }
    
    case DELETE_EMPLOYEE_HIDE_MODAL:
      return {
        ...state,
        showModel: false
      }

    case DELETE_EMPLOYEE: {
      const idToDelete  = action.id;
      const newEmployees = state.employees.filter(e => e.id != idToDelete);
      return {
        ...state,
        employees: newEmployees,
        loading: true
      };
    }

    case UPDATE_EMPLOYEE: {
      const idToUpdate = action.detail.id;
      const employeesList = cloneDeep(state.employees);
      employeesList.map(e => {
        if (e.id == idToUpdate) {
          e.name = action.detail.name;
          e.projectAssigned = action.detail.projectAssigned;
          e.techStack = action.detail.techStack;
        }
      });
      return {
        ...state,
        employees: employeesList,
        loading: true
      }
    }

    case UPDATE_EMPLOYEE_SUCESSED:
    case UPDATE_EMPLOYEE_FAILED:
    case DELETE_EMPLOYEE_FAILED:
    case DELETE_EMPLOYEE_SUCESSED: 
    default:
    return {
      ...state,
      loading: false
    };
  }
}
 
export default reducer;