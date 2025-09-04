import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { dLogout } from "../http";
import { setAuth } from "../store/auth-slice";

const Navigation = () => {
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = async () => {
    await dLogout();

    // ✅ Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // ✅ Clear Redux state
    dispatch(setAuth(null));
    // ✅ Redirect to login
    return history.push("/login");
  };

  return (
    <>
      {/* <div className="navbar-bg"></div> */}
      <nav
        className="navbar navbar-expand-lg"
        style={{
          position: "fixed",
          padding: "24px",
          background: "#fff",
        //   boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
          margin: "11px 20px",
          borderRadius: "20px",
        }}
      >
        <form className="form-inline mr-auto">
          <ul className="navbar-nav align-items-center">
            <li>
              <NavLink
                to="/"
                id="sidebarCollapse"
                data-toggle="sidebar"
                className="nav-link nav-link-lg"
              >
                <i class="bi bi-layout-sidebar-inset-reverse"></i>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                data-toggle="search"
                className="nav-link nav-link-lg d-sm-none"
              >
                <i className="fas fa-search"></i>
              </NavLink>
            </li>
            <li>
              <input type="text" className="py-2 ps-3  pr-5 border search-header rounded-3" placeholder="Search" style={{fontSize:"14px"}}/>
            </li>
          </ul>
        </form>
        <ul className="navbar-nav navbar-right">
        <li>
            <hr
              className="border border-1 opacity-5"
              style={{
                height: "38px",
                position: "absolute",
                bottom: "0px",
                borderColor: "#e9e9e9",
              }}
            />
          </li>
          <li className="dropdown dropdown-list-toggle">
            <a
              href="#"
              data-toggle="dropdown"
              className="nav-link notification-toggle nav-link-lg beep"
            >
              <i className="far fa-bell mt-1"></i>
            </a>
            <div className="dropdown-menu dropdown-list dropdown-menu-right">
              <div className="dropdown-header">
                Notifications
                <div className="float-right">
                  <NavLink to="/">Mark All As Read</NavLink>
                </div>
              </div>
              <div className="dropdown-list-content dropdown-list-icons">
                <NavLink to="/" className="dropdown-item dropdown-item-unread">
                  <div className="dropdown-item-icon bg-primary text-white">
                    <i className="fas fa-code"></i>
                  </div>
                  <div className="dropdown-item-desc">
                    Template update is available now!
                    <div className="time text-primary">2 Min Ago</div>
                  </div>
                </NavLink>
                <NavLink to="/" className="dropdown-item">
                  <div className="dropdown-item-icon bg-info text-white">
                    <i className="far fa-user"></i>
                  </div>
                  <div className="dropdown-item-desc">
                    <b>You</b> and <b>Dedik Sugiharto</b> are now friends
                    <div className="time">10 Hours Ago</div>
                  </div>
                </NavLink>
                <NavLink to="/" className="dropdown-item">
                  <div className="dropdown-item-icon bg-success text-white">
                    <i className="fas fa-check"></i>
                  </div>
                  <div className="dropdown-item-desc">
                    <b>Kusnaedi</b> has moved task <b>Fix bug header</b> to{" "}
                    <b>Done</b>
                    <div className="time">12 Hours Ago</div>
                  </div>
                </NavLink>
                <NavLink to="/" className="dropdown-item">
                  <div className="dropdown-item-icon bg-danger text-white">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <div className="dropdown-item-desc">
                    Low disk space. Let's clean it!
                    <div className="time">17 Hours Ago</div>
                  </div>
                </NavLink>
                <NavLink to="/" className="dropdown-item">
                  <div className="dropdown-item-icon bg-info text-white">
                    <i className="fas fa-bell"></i>
                  </div>
                  <div className="dropdown-item-desc">
                    Welcome to Stisla template!
                    <div className="time">Yesterday</div>
                  </div>
                </NavLink>
              </div>
              <div className="dropdown-footer text-center">
                <NavLink to="/">
                  View All <i className="fas fa-chevron-right"></i>
                </NavLink>
              </div>
            </div>
          </li>
          <li>
            <hr
              className="border border-1 opacity-5"
              style={{
                height: "38px",
                position: "absolute",
                bottom: "0px",
                marginLeft: "3px",
                borderColor: "#e9e9e9",
              }}
            />
          </li>
          <li className="dropdown">
            <a
              href="#"
              data-toggle="dropdown"
              className="nav-link dropdown-toggle nav-link-lg nav-link-user d-flex"
            >
              <img
                alt="image"
                src="/assets/icons/user-1.jpg"
                className="rounded-circle "
                style={{ width: "40px", height: "40px" }}
              />
              <div className="ms-2 mt-0" style={{ lineHeight: "0px" }}>
                <p
                  className="m-0 text-muted text-sm"
                  style={{ fontSize: "12px" }}
                >
                  Welcom Back
                </p>
                <h6
                  className="d-sm-none d-lg-inline-block mb-0"
                  style={{ fontSize: "14px" }}
                >
                  {user?.user?.name}
                </h6>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="dropdown-title">Logged in 5 min ago</div>
              <NavLink
                to="features-profile.html"
                className="dropdown-item has-icon"
              >
                <i className="far fa-user"></i> Profile
              </NavLink>
              <NavLink
                to="features-activities.html"
                className="dropdown-item has-icon"
              >
                <i className="fas fa-bolt"></i> Activities
              </NavLink>
              <NavLink
                to="features-settings.html"
                className="dropdown-item has-icon"
              >
                <i className="fas fa-cog"></i> Settings
              </NavLink>
              <div className="dropdown-divider"></div>
              <NavLink
                to="/"
                onClick={logout}
                className="dropdown-item has-icon text-danger"
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </NavLink>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
