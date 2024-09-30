export const SERVER_BASE_URL = `http://localhost:3000/api/v1`;

export const API = {
  users: {
    login: `${SERVER_BASE_URL}/login`,
  },
  employee: {
    fetchEmployeeList: `${SERVER_BASE_URL}/employee-list`,
    createEmployee: `${SERVER_BASE_URL}/employee/create`,
    deleteEmployee: (id: string) => `${SERVER_BASE_URL}/delete/${id}`, 
    getEmployee: (id: string) => `${SERVER_BASE_URL}/get-employee/${id}`, 
    editEmployee: (id: string) => `${SERVER_BASE_URL}/edit-employee/${id}`, 
  },
};
