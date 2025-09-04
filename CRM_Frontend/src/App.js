import { Redirect, Switch, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Forgot from './pages/auth/Forgot'
import Home from './pages/Home'
import { useSelector } from 'react-redux';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import '@popperjs/core';
import './App.css';
import Loading from './components/Loading';
import { useAutoLogin } from './hooks/useAutoLogin';
import Employees from './pages/employee/Employees';
import Admins from './pages/admin/Admins';
import Teams from './pages/team/Teams';
import AddUser from './pages/user/AddUser';
import AddTeam from './pages/team/AddTeam';
import Employee from './pages/employee/Employee';
import Team from './pages/team/team/Team';
import EditUser from './pages/user/EditUser';
import EditTeam from './pages/team/EditTeam';
import Task from './pages/task/Task';
import Admin from './pages/admin/Admin';
import './App.css';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/styles.css';
import './assets/css/components.css';
import Leaders from './pages/leader/Leaders';
import SideBar from './components/sidebar';
import Navigation from './components/navigation';
import Members from './pages/leaderpage/Members';
import UserTeams from './components/Employees/UserTeams';
import Attendance from './components/Employees/Attendance';
import LeaveApplications from './components/Employees/LeaveApplications';
import Salary from './components/Employees/Salary';
import ApplyForLeave from './components/Employees/ApplyForLeave';
import EmployeeTeam from './pages/team/team/EmployeeTeam';
import LeaveApplication from './components/Employees/LeaveApplication';
import DashboardEmployee from './components/DashboardEmployee';
import AttendanceView from './components/Admin/AttendanceView';
import LeaveView from './components/Admin/LeaveView';
import Leave from './components/Admin/Leave';
import AssignSalary from './components/Admin/AssignSalary';
import AssignLater from './components/Admin/AssignLater';
import Salaries from './components/Admin/Salaries';
import SalaryView from './components/Admin/Salary';
import AdminTask from './pages/task/AdminTask';
import ApplyForAdmin from './components/Employees/ApplyForAdmin';
import Assest from './components/Admin/Assest';
import AssestView from './components/Admin/AssestView';
import AssestApplications from './components/Employees/AssestApplications';
import AssestApplication from './components/Employees/AssestApplication';
import ApproveAttendance from './components/Admin/ApproveAttendance';
import RegulariseAttendance from './components/Admin/RegulariseAttendance';
import EmployeeAttendance from './components/Admin/EmployeeAttendance';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Deals from './components/Deals/Deals';
import Editdeals from './components/Deals/Editdeals';
import LeaderLead from './components/Leaders/LeaderLead';
import ViewLead from './pages/task/ViewLead';
import Events from './components/Events/Events';
import EmployeTask from './components/Admin/EmployeTask';
import GenrateSalarySlip from './components/Admin/SalarySlip/GenrateSalarySlip';
import { useEffect } from 'react';

const App = () => {
  const { loading } = useAutoLogin();
  const { isAuth, user } = useSelector((state) => state.authSlice);
  console.log(user,"isAuth")
  // Check for accessToken in localStorage on component mount
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken && window.location.pathname !== '/' && window.location.pathname !== '/login' && window.location.pathname !== '/forgot') {
      window.location.href = '/login';
    }
  }, []);

  return loading ?
    <Loading /> : (
      <Switch>
        <EmployeeRoute exact path='/userTeams'>
          <UserTeams />
        </EmployeeRoute>
        <EmployeeRoute exact path='/userteam/:id'>
          <EmployeeTeam />
        </EmployeeRoute>
        <EmployeeRoute exact path='/dashboardEmployee'>
          <DashboardEmployee />
        </EmployeeRoute>
        <EmployeeRoute exact path='/userAttendance'>
          <Attendance />
        </EmployeeRoute>
        <EmployeeRoute exact path='/applyforleave'>
          <ApplyForLeave />
        </EmployeeRoute>
        <EmployeeRoute exact path='/applyforadmin'>
          <ApplyForAdmin />
        </EmployeeRoute>
        <EmployeeRoute exact path='/userSalary'>
          <Salary />
        </EmployeeRoute>
        <EmployeeRoute exact path='/userLeaveApplications'>
          <LeaveApplications />
        </EmployeeRoute>
        <EmployeeRoute exact path='/useassestApplications'>
          <AssestApplications />
        </EmployeeRoute>
        <EmployeeRoute exact path='/userAssestApplications/:id'>
          <AssestApplication />
        </EmployeeRoute>
        <EmployeeRoute exact path='/userLeaveApplications/:id'>
          <LeaveApplication />
        </EmployeeRoute>
        <EmployeeRoute exact path='/task'>
          <Task />
        </EmployeeRoute>
        <GuestRoute exact path='/' >
          <Login />
        </GuestRoute>
        <GuestRoute exact path='/login' >
          <Login />
        </GuestRoute>
        <GuestRoute exact path='/forgot' >
          <Forgot />
        </GuestRoute>
        <ProtectedRoute exact path='/home'>
          <Home />
        </ProtectedRoute>
        <AdminRoute exact path='/employees'>
          <Employees />
        </AdminRoute>
        <LeaderRoute exact path='/members'>
          <Members />
        </LeaderRoute>
        <MultiRoleRoute exact path='/deals' allowedRoles={['Admin', 'Leader', 'Employee']}>
          <Deals />
        </MultiRoleRoute>
        <MultiRoleRoute exact path='/leaderlead' allowedRoles={['Admin', 'Leader', 'Employee']}>
          <LeaderLead />
        </MultiRoleRoute>
        <LeaderRoute exact path='/editdeals'>
          <Editdeals />
        </LeaderRoute>
        <AdminRoute exact path='/admins'>
          <Admins />
        </AdminRoute>
        <AdminRoute exact path='/teams'>
          <Teams />
        </AdminRoute>
        <AdminRoute exact path='/adduser'>
          <AddUser />
        </AdminRoute>
        <LeaderRoute exact path='/all-task'>
          <AdminTask />
        </LeaderRoute>

        <MultiRoleRoute exact path='/viewlead/:id' allowedRoles={['Admin', 'Leader', 'Employee']}>
          <ViewLead />
        </MultiRoleRoute>

        <AdminRoute exact path='/attendance'>
          <AttendanceView />
        </AdminRoute>
        <AdminRoute exact path='/attendance-approve'>
          <ApproveAttendance />
        </AdminRoute>
        <AdminRoute exact path='/regularize-attendance'>
          <RegulariseAttendance />
        </AdminRoute>
        <AdminRoute exact path='/all-employee-attandance'>
          <EmployeeAttendance />
        </AdminRoute>
        <AdminRoute exact path='/leaves'>
          <LeaveView />
        </AdminRoute>
        <AdminRoute exact path='/assest'>
          <AssestView />
        </AdminRoute>
        <AdminRoute exact path='/assignSalary'>
          <AssignSalary />
        </AdminRoute>
        <AdminRoute exact path='/assignlater'>
          <AssignLater />
        </AdminRoute>
        <AdminRoute exact path='/salaries'>
          <Salaries />
        </AdminRoute>
        <AdminRoute exact path='/leaves/:id'>
          <Leave />
        </AdminRoute>
        <AdminRoute exact path='/assest/:id'>
          <Assest />
        </AdminRoute>
        <AdminRoute exact path='/salary/:id'>
          <SalaryView />
        </AdminRoute>
        <AdminRoute exact path='/addteam'>
          <AddTeam />
        </AdminRoute>
        <AdminRoute path='/employee/:id'>
          <Employee />
        </AdminRoute>
        <AdminRoute path='/team/:id'>
          <Team />
        </AdminRoute>
        <AdminRoute path='/edituser/:id'>
          <EditUser />
        </AdminRoute>
        <AdminRoute path='/editteam/:id'>
          <EditTeam />
        </AdminRoute>
        <AdminRoute path='/admin/:id'>
          <Admin />
        </AdminRoute>
        <AdminRoute path='/leaders'>
          <Leaders />
        </AdminRoute>
        <AdminRoute exact path='/alltask'>
          <EmployeTask />
        </AdminRoute>
        <AdminRoute exact path='/salaryslip'>
          <GenrateSalarySlip />
        </AdminRoute>
        <MultiRoleRoute allowedRoles={['Admin', 'Leader', 'Employee']} exact path='/events'>
          <Events />
        </MultiRoleRoute>
        
        {/* Catch-all redirect to login if no routes match */}
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    )
}


const GuestRoute = ({ children, ...rest }) => {
  const { isAuth } = useSelector((state) => state.authSlice);
  console.log("isAuth", isAuth);
  const accessToken = localStorage.getItem('accessToken');
  
  return (
    <Route {...rest} render={({ location }) => {
      return isAuth || accessToken ? (
        <Redirect to={{ pathname: '/home', state: { from: location } }} />
      ) : (children);
    }}>
    </Route>
  )
}


const ProtectedRoute = ({ children, ...rest }) => {
  const { isAuth } = useSelector((state) => state.authSlice);
  console.log("isAuth", isAuth);

  const accessToken = localStorage.getItem('accessToken');
  
  return (
    <Route {...rest} render={({ location }) => {
      return isAuth || accessToken ? (
        <>
          <SideBar />
          <Navigation />
          {children}
        </>) : (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              from: location
            }
          }}
        />
      );
    }} />
  );
}

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => state.authSlice);
  // console.log("isAuth", user);

  const accessToken = localStorage.getItem('accessToken');
  
  return (
    <Route {...rest} render={({ location }) => {
      if (!accessToken) {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        );
      }
      
      return user && user.user?.type === 'Admin' ? (
        <>
          <SideBar />
          <Navigation />
          {children}
        </>) : (
        <Redirect
          to={{
            pathname: '/',
            state: {
              from: location
            }
          }}
        />
      );
    }} />
  );
}

const LeaderRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => state.authSlice);
  console.log("isAuth", user);

  const accessToken = localStorage.getItem('accessToken');
  
  return (
    <Route {...rest} render={({ location }) => {
      if (!accessToken) {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        );
      }
      
      return user && user.user?.type === 'Leader' ? (
        <>
          <SideBar />
          <Navigation />
          {children}
        </>) : (
        <Redirect
          to={{
            pathname: '/',
            state: {
              from: location
            }
          }}
        />
      );
    }} />
  );
}

const EmployeeRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => state.authSlice);
  console.log("isAuth", user);

  const accessToken = localStorage.getItem('accessToken');
  
  return (
    <Route {...rest} render={({ location }) => {
      if (!accessToken) {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        );
      }
      
      return user && (user.user?.type === 'Employee' || user.user?.type === 'Leader') ? (
        <>
          <SideBar />
          <Navigation />
          {children}
        </>) : (
        <Redirect
          to={{
            pathname: '/',
            state: {
              from: location
            }
          }}
        />
      );
    }} />
  );
}

const MultiRoleRoute = ({ allowedRoles = [], children, ...rest }) => {
  const { user } = useSelector((state) => state.authSlice);
  console.log("isAuth", user);

  const accessToken = localStorage.getItem('accessToken');

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!accessToken) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          );
        }
        
        if (user && allowedRoles.includes(user.user?.type)) {
          return (
            <>
              <SideBar />
              <Navigation />
              {children}
            </>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
};

export default App;