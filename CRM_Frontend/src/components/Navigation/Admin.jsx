import { Link, NavLink } from "react-router-dom";
import { MdAutoGraph } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { dLogout } from "../../http/index";
import { setAuth } from "../../store/auth-slice";

const Admin = () => {
  const { name, image } = useSelector((state) => state.authSlice.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = async () => {
    await dLogout();

    // ✅ Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    dispatch(setAuth(null));

    return history.push("/login");
  };
  return (
    <>
      <aside
        className="d-flex flex-column justify-content-between bg-light  min-vh-100"
        style={{ width: "260px", borderRight: "1px dashed #ddd9d9" }}
      >
        <div
          className=" pt-4"
          style={{
            overflowY: "auto",
            padding: "0 24px",
            height: "calc(100vh - 120px)",
            borderRadius: "7px",
          }}
        >
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
          <hr style={{ width: "100%", border: "1px dashed #a9a7a7" }} />
          <ul className="nav flex-column sidebar-menu small fw-medium">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/home"
              >
                <i class="bi bi-house-fill mx-2"></i>Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/employees"
              >
                <i className="fas fa-users"></i> Employees
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/leaders"
              >
                <i className="fas fa-user-friends"></i> Leaders
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/salaryslip"
              >
                <i className="fas fa-user-friends"></i> Salary Slip
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/alltask"
              >
                <i className="fas fa-users"></i> Tech & caller Task
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/events"
              >
                <i className="fas fa-users"></i> Events
              </NavLink>
            </li>
            <li className="nav-item">
              <a
                className="nav-link d-flex justify-content-between align-items-center"
                data-bs-toggle="collapse"
                href="#salesSubmenu"
                role="button"
                aria-expanded="false"
                aria-controls="salesSubmenu"
              >
                <span>
                  <i className="bi bi-bar-chart-line-fill me-2 ms-3"></i> Sales
                  Tasks{" "}
                </span>
                <i className="bi bi-chevron-down"></i>
              </a>
              <div className="collapse ps-3" id="salesSubmenu">
                <ul className="nav flex-column ps-0">
                  <li>
                    <NavLink
                      to="/deals"
                      className={({ isActive }) =>
                        `nav-link ${
                          isActive
                            ? "active text-primary fw-bold bg-white rounded shadow-sm"
                            : "text-secondary"
                        }`
                      }
                    >
                      <i className="bi bi-percent me-2"></i>Deals
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/leaderlead"
                      className={({ isActive }) =>
                        `nav-link ${
                          isActive
                            ? "active text-primary fw-bold bg-white rounded shadow-sm"
                            : "text-secondary"
                        }`
                      }
                    >
                      <MdAutoGraph className="me-2" />
                      Leader
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/admins"
              >
                <i className="fas fa-users-cog"></i> Admins
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/teams"
              >
                <i className="fas fa-fire"></i> Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/all-employee-attandance"
              >
                <i className="fas fa-user"></i> All-Attendance
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/attendance-approve"
              >
                <i className="fas fa-user"></i> Approve Attendance
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/regularize-attendance"
              >
                <i className="fas fa-user"></i> Regularize Attendance
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/leaves"
              >
                <i className="fas fa-book"></i>Leaves
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/assest"
              >
                <i className="fas fa-book"></i>Assest
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/assignSalary"
              >
                <i class="fas fa-pen"></i> Assign Salary
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/assignlater"
              >
                <i class="fas fa-pen"></i> Assign Later
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/salaries"
              >
                <i class="fas fa-piggy-bank"></i> Salaries
              </NavLink>
            </li>

            <li className="menu-header">Starter</li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/adduser"
              >
                <i className="fas fa-user-plus"></i> Add User
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/addteam"
              >
                <i className="fas fa-address-card"></i> Add Team
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/home"
              >
                <i className="far fa-square"></i> Blank Page
              </NavLink>
            </li>

            <li className="menu-header">Settings</li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/home"
              >
                <i className="fab fa-teamspeak"></i> Contact Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/home"
              >
                <i className="fas fa-info-circle"></i> About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? "active text-primary fw-bold bg-white rounded shadow-sm"
                      : "text-secondary"
                  }`
                }
                to="/"
                onClick={logout}
              >
                <i className="fas fa-sign-out-alt"></i> Logout
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
            <NavLink to="/" onClick={logout} className="ms-auto me-2 ">
              <i class="bi bi-power text-danger fw-semibold"></i>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Admin;
