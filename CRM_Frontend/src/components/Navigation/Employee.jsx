import { NavLink } from "react-router-dom";
import { dLogout } from "../../http";
import { setAuth } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Employee = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector(state => state.authSlice);

  const logout = async () => {
    await dLogout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(setAuth(null))
    return history.push('/login');
  }


  return (
    <>

      <ul className="sidebar-menu">
        <li><NavLink className="nav-link" to="/home"><i className="fas fa-fire"></i> <span>Dashboard</span></NavLink></li>
        <li><NavLink className="nav-link" to="/userTeams"><i className="fas fa-users"></i> <span>Team</span></NavLink></li>

        {(user?.user?.branch === 'tech' || user?.user?.branch === 'telecaller') && <li><NavLink className="nav-link" to="/task"><i className="fas fa-users"></i> <span>Task</span></NavLink></li>}
        {user?.user?.branch === 'sales' && <li><NavLink className="nav-link" to="/deals"><i className="fas fa-users"></i> <span>Deals</span></NavLink></li>}
        <li><NavLink className="nav-link" to="/userAttendance"><i className="fas fa-user"></i> <span>Attendance</span></NavLink></li>
        <li><NavLink className="nav-link" to="/events"><i className="fas fa-users"></i> <span>Events</span></NavLink></li>
        <li><NavLink className="nav-link" to="/applyforleave"><i className="fas fa-pen"></i> <span>Apply For Leave</span></NavLink></li>
        <li><NavLink className="nav-link" to="/userLeaveApplications"><i className="fas fa-book"></i> <span>Leave Applications</span></NavLink></li>
        <li><NavLink className="nav-link" to="/useassestApplications"><i className="fas fa-book"></i> <span>Assest Request Track</span></NavLink></li>
        <li><NavLink className="nav-link" to="/userSalary"><i class="fas fa-piggy-bank"></i> <span>Salary</span></NavLink></li>
        <li><NavLink className="nav-link" to="/applyforadmin"><i className="fas fa-pen"></i> <span>Apply For Assest</span></NavLink></li>

        <li className="menu-header">Settings</li>
        <li><NavLink className="nav-link" to="/home"><i className="fab fa-teamspeak"></i> <span>Contact me</span></NavLink></li>
        <li><NavLink className="nav-link" to="/home"><i className="fas fa-info-circle"></i> <span>About me</span></NavLink></li>
        <li><NavLink onClick={logout} className="nav-link" to="/home"><i className="fas fa-sign-out-alt"></i> <span>Logout</span></NavLink></li>
      </ul>

    </>
  )
}

export default Employee;