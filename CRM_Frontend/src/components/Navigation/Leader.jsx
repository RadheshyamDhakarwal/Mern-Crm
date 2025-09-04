import { Link, NavLink } from "react-router-dom";
import { MdAutoGraph } from "react-icons/md";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { dLogout } from "../../http/index";
import { setAuth } from "../../store/auth-slice";
import { useSelector } from "react-redux";
const Leader = () => {
  const { name, image } = useSelector((state) => state.authSlice.user);
  const { user } = useSelector(state => state.authSlice);
  console.log("dfgjdcjkdsjh", user.user.branch);

  const dispatch = useDispatch();
  const history = useHistory();

  const logout = async () => {
    await dLogout();

    // ✅ Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(setAuth(null));

    return history.push('/login');
  };
  return (
    <aside className="d-flex flex-column justify-content-between bg-light  min-vh-100" style={{ width: '260px', borderRight: "1px dashed #ddd9d9" }}>
      {/* Top Section */}
      <div className=" pt-4" style={{
        overflowY: "auto",
        padding: "0 24px",
        height: "calc(100vh - 120px)",
        borderRadius: "7px",
      }}>
        {/* Logo */}
        <div className="d-flex align-items-center mb-4">
          <img
            src="/assets/icons/logo.png"
            alt="Finunique logo"
            width={50}
            height={50}
            className="me-2"
          />
        </div>

        {/* Search */}
        <div className="mb-4 position-relative">
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Search"
            style={{ background: "#ededed" }}
          />
          <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ps-3 text-secondary"></i>
        </div>
        <hr style={{ width: '100%', border: "1px dashed #a9a7a7" }} />
        {/* Menu */}
        <ul className="nav flex-column sidebar-menu small fw-medium">
          <li className="nav-item">
            <NavLink to="/home" className={({ isActive }) => `nav-link ${isActive ? 'active text-primary fw-bold bg-white rounded shadow-sm' : 'text-secondary'}`}>
              <i class="bi bi-house-fill mx-2"></i>Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/members" className={({ isActive }) => `nav-link ${isActive ? 'active text-primary fw-bold bg-white rounded shadow-sm' : 'text-secondary'}`}>
              <i className="bi bi-people-fill mx-2"></i>Members
            </NavLink>
          </li>
          {(user?.user?.branch === 'tech' || user?.user?.branch === 'telecaller') && (
            <li className="nav-item">
              <NavLink
                to="/all-task"
                className={({ isActive }) =>
                  `nav-link ${isActive
                    ? 'active text-primary fw-bold bg-white rounded shadow-sm'
                    : 'text-secondary'
                  }`
                }
              >
                <i className="bi bi-person-lines-fill mx-2"></i>Employee Task
              </NavLink>
            </li>
          )}

          <li className="nav-item">
            <NavLink to="/userAttendance" className={({ isActive }) => `nav-link ${isActive ? 'active text-primary fw-bold bg-white rounded shadow-sm' : 'text-secondary'}`}>
              <i className="bi bi-person-check-fill mx-2"></i>Attendance
            </NavLink>
          </li>
          <li><NavLink className="nav-link" to="/events"><i className="fas fa-users"></i> <span>Events</span></NavLink></li>
          {/* Sales Dropdown */}
          {user?.user?.branch === 'sales' && (
            <li className="nav-item">
              <a
                className="nav-link d-flex justify-content-between align-items-center"
                data-bs-toggle="collapse"
                href="#salesSubmenu"
                role="button"
                aria-expanded="false"
                aria-controls="salesSubmenu"
              >
                <span><i className="bi bi-bar-chart-line-fill me-2 ms-3" ></i> Sales </span>
                <i className="bi bi-chevron-down"></i>
              </a>
              <div className="collapse ps-3" id="salesSubmenu">
                <ul className="nav flex-column ps-0">
                  <li>
                    <NavLink to="/deals" className={({ isActive }) => `nav-link ${isActive ? 'active text-primary fw-bold bg-white rounded shadow-sm' : 'text-secondary'}`}>
                      <i className="bi bi-percent me-2"></i>Deals
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/leaderlead" className={({ isActive }) => `nav-link ${isActive ? 'active text-primary fw-bold bg-white rounded shadow-sm' : 'text-secondary'}`}>
                      <MdAutoGraph className="me-2" />Leader
                    </NavLink>
                  </li>

                </ul>
              </div>
            </li>
          )}


          {/* Other Menu Items */}
          <li className="nav-item">
            <NavLink to="/applyforleave" className={({ isActive }) => `nav-link ${isActive ? 'active text-primary fw-bold bg-white rounded shadow-sm' : 'text-secondary'}`}>
              <i className="bi bi-door-open-fill mx-2"></i>Apply For Leave
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/userLeaveApplications" className={({ isActive }) => `nav-link ${isActive ? 'active text-primary fw-bold bg-white rounded shadow-sm' : 'text-secondary'}`}>
              <i className="bi bi-file-earmark-text-fill mx-2"></i>Leave Applications
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/userSalary" className={({ isActive }) => `nav-link ${isActive ? 'active text-primary fw-bold bg-white rounded shadow-sm' : 'text-secondary'}`}>
              <i className="bi bi-currency-rupee mx-2"></i>Salary
            </NavLink>
          </li>

          {/* Section Header */}
          <li className="nav-item text-uppercase text-muted mt-3 mb-1 small">Settings</li>

          <li className="nav-item">
            <NavLink to="/home" className={({ isActive }) => `nav-link ${isActive ? 'active text-primary fw-bold bg-white rounded shadow-sm' : 'text-secondary'}`}>
              <i className="fab fa-teamspeak me-2"></i>Contact Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/home" className={({ isActive }) => `nav-link ${isActive ? 'active text-primary fw-bold bg-white rounded shadow-sm' : 'text-secondary'}`}>
              <i className="fas fa-info-circle me-2"></i>About Us
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Bottom Section: Profile */}
      <div className="fixed-profile p-3  bg-white mt-3 Bottom-profile">
        <div className="hstack gap-3">
          <img
            src="https://storage.googleapis.com/a1aa/image/a30f4b0f-bf59-42e4-9877-79dc397bc7ec.jpg"
            alt="Jenny Stacy"
            className="rounded-circle object-fit-cover"
            width={32}
            height={32}
          />
          <div className="small">
            <strong className="text-dark d-block">{name}</strong>
            <span className="text-secondary">Developer</span>
          </div>
          <NavLink to='/' onClick={logout} className="ms-auto me-2 ">
            <i class="bi bi-power text-danger fw-semibold"></i>
          </NavLink>
        </div>

      </div>
    </aside>
  )
}

export default Leader;