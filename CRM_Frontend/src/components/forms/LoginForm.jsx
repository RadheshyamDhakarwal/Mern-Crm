import { useState } from "react";
import { NavLink } from "react-router-dom";
import { doLogin } from "../../http";
import { useDispatch } from "react-redux";
import { setAuth } from '../../store/auth-slice';
import { toast } from "react-toastify";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormData((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("All Fields Required");
      return;
    }

    try {
      const res = await doLogin({ email, password });
      console.log("Login Response:", res);
      const data = res?.data || res;   // ✅ ensure safe access

      if (!data) {
        toast.error("No response from server");
        return;
      }

      if (data.success) {
        // ✅ Save user data in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        // ✅ Store in Redux
        dispatch(setAuth(data.user));
        toast.success("Login successful");
        window.location.reload();
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <div id="app">
      <section className="">
        {/* <div className="container">
          <div className="row">
            <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
              <div className="login-brand">
                <img src="https://www.pockethrms.com/wp-content/uploads/2022/01/Happy-Workforce.jpg" alt="logo" width="200" className="" />
              </div>

              <div className="card card-primary">
                <div className="card-header"><h4>Login</h4></div>
                <div className="card-body">
                  
                </div>
              </div>
              <div className="simple-footer">
                Developed by Rajayvardhan
                <a class="mt-5 ml-2" target="_blank" href="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div> */}
        <div className="container-fluid">
          <div className="row bg-white">
            <div className="col-md-7 ps-0 rightsidelogin">
              <div className="loginimg">
                {/* <iframe src="https://lottie.host/embed/05e5189b-6641-40dc-ab27-0af880acffd3/Ra2Wz9Jx0w.lottie"></iframe> */}
                <img src="./assets/icons/24148025_page_266.jpg" width={"100%"} style={{ padding: "90px" }} />
              </div>
            </div>
            <div className="col-md-5">
              <div className="loginform d-flex justify-content-center align-items-center h-100 p-6" style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px", backgroundColor: "#fbfbfb" }}>
                <div className="d-flex flex-column gap-3 w-100 p-5 w-md-100 text-left" style={{ maxWidth: "400px" }}>
                  <h1 className='text-left'>Welcome Back!</h1>
                  <p>Please sign-in to your account and start the adventure</p>
                  <form onSubmit={onSubmit} className="needs-validation" noValidate="">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input id="email" onChange={inputEvent} value={formData.email} type="email" className="form-control" name="email" tabIndex="1" required autoFocus />
                      <div className="invalid-feedback">
                        Please fill in your email
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="d-block">
                        <label htmlFor="password" className="control-label">Password</label>
                        <div className="float-right">
                          <NavLink to='/forgot' className="text-small">
                            Forgot Password?
                          </NavLink>
                        </div>
                      </div>
                      <input id="password" onChange={inputEvent} value={formData.password} type="password" className="form-control" name="password" tabIndex="2" required />
                      <div className="invalid-feedback">
                        please fill in your password
                      </div>
                    </div>


                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-lg btn-block" tabIndex="4">
                        Login
                      </button>
                    </div>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                     Don’t have an account? <Link to="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up here</Link>
                    </p>
                  </form>
                </div>


              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  )
}

export default LoginForm;