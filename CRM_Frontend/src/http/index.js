import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  // baseURL: `https://api.sevenunique.com/api`,
  baseURL: `http://localhost:5500/api`,
  // baseURL: `http://192.168.1.76:5500/api`,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = (
      localStorage.getItem("accessToken") || "null"
    );
    const refreshToken = (
      localStorage.getItem("refreshToken") || "null"
    );

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      config.headers["x-refresh-token"] = refreshToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 'https://api.sevenunique.com/api'
//Auth
// export const doLogin = (data) => api.post("/auth/login", data);

export const doLogin = async (data) => {
  console.log(data, 'data');

  const res = await fetch("http://localhost:5500/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // Backend se JSON parse karke direct return karo
  const responseData = await res.json();
  console.log(responseData, 'responseData');

  return responseData;
};


export const forgotPassword = (data) => api.post("/auth/forgot", data);
export const resetPassword = (data) => api.patch("/auth/reset", data);
export const dLogout = () => api.get("/auth/logout");

//Admin
export const getCounts = () => api.get("/admin/counts");
export const getEmployees = () => api.get("/admin/employees");
export const getLeaders = () => api.get("/admin/leaders");
export const getFreeLeaders = () => api.get("/admin/leaders/free");
export const getAdmins = () => api.get("/admin/admins");
export const getTeams = () => api.get("/admin/teams");

export const getTeamMembers = (data) => api.get(`/admin/team/${data}/members`);
export const addUser = (data) => api.post("/admin/user", data);
export const updateUser = (id, data) => api.patch(`/admin/user/${id}`, data);
export const addTeam = (data) => api.post("/admin/team", data);
export const updateTeam = (id, data) => api.patch(`/admin/team/${id}`, data);
export const getEmployee = (data) => api.get(`/admin/employee/${data}`);
export const getLeader = (data) => api.get(`/admin/leader/${data}`);
export const getFreeEmployees = () => api.get("/admin/employees/free");
export const getTeam = (data) => api.get(`/admin/team/${data}`);
export const removeMember = (data) =>
  api.patch("/admin/team/member/remove", data);
export const addMember = (data) => api.patch("/admin/team/member/add", data);
export const removeLeader = (data) =>
  api.patch("/admin/team/leader/remove", data);
export const addLeader = (data) => api.patch("/admin/team/leader/add", data);
export const getUser = (data) => api.get(`/admin/user/${data}`);
export const getAttendance = (data) =>
  api.post("admin/view-employee-attendance", data);
export const viewassest = (data) =>
  api.post("admin/view-assest-applications", data);
export const viewLeaves = (data) =>
  api.post("admin/view-leave-applications", data);
export const updateLeave = (id, data) =>
  api.post(`admin/update-leave/${id}`, data);
export const updateAssest = (id, data) =>
  api.post(`admin/update-assest/${id}`, data);
export const assignSalary = (data) =>
  api.post("admin/assign-employee-salary", data);
export const sendLetter = (data) =>
  api.post("admin/assign-employee-later", data);
export const updateSalary = (data) =>
  api.post("admin/update-employee-salary", data);
export const viewAllSalaries = (data) =>
  api.post("admin/view-all-salary", data);
export const viewEmployeeAttendanceAdmin = (data) =>
  api.post("admin/all-employee-attendance", data);
// for recepstion
export const getAllTodayInRequests = (data) =>
  api.get("admin/view-reception-attendance", { params: data });
export const approveInRequest = (data) =>
  api.post("admin/view-reception-approve", data);
export const getAllOutRegularizeRequests = (data) =>
  api.post("admin/all-regularize-request", data);

//Leader
export const getMembers_Leader = () => api.get("/leader/team/members");
export const getTeam_Leader = () => api.get("/leader/team/");

// Employee
export const getEmployeeTeam = (data) => api.get(`/employee/team/${data}`);
export const getEmployeeTeamMembers = (data) =>
  api.get(`/employee/team/${data}/members`);
export const markInAttendance = (data) =>
  api.post("/employee/mark-employee-in", data);
export const markOutAttendance = (data) =>
  api.post("/employee/mark-employee-out", data);
export const viewEmployeeAttendance = (data) =>
  api.post("/employee/view-employee-attendance", data);
export const regularizeRequest = (data) =>
  api.post("/employee//regularize-attendance", data);
export const applyforleave = (data) =>
  api.post("/employee/apply-leave-application", data);
export const applyforassest = (data) =>
  api.post("/employee/apply-assest-admin", data);
export const viewAssestApplications = (data) =>
  api.post("/employee/view-assest-applications", data);
export const viewLeaveApplications = (data) =>
  api.post("/employee/view-leave-applications", data);
export const viewEmployeeSalary = (data) =>
  api.post("employee/view-salary", data);

// Task
export const getTask = () => api.get("/task/my");
export const addTask = (data) => api.post("/");

// api.interceptors.response.use(
//   (response) => {
//     // console.log("All Cookies", document.cookie);
//     return response?.data;
//   },
//   (error) => {
//     console.log(error);
//     return error?.response?.data;
//   }
// );

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      config.headers["x-refresh-token"] = refreshToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default api;
