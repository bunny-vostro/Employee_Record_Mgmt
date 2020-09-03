import store from "./store/index";

export const getEmployees = function() {
    return new Promise(resolve => {
        setTimeout(() => {
          let instance = store.getState();
          resolve(
            instance.reducer.employees || []
          )}, 2000);
      });
}

export const getEmployeeInfo = function(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      let instance = store.getState();
      resolve(
        instance.reducer.employees.filter(e => e.id === parseInt(id))
      )
    }, 2000);
  });
}

