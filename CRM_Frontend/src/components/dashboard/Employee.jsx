import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Employee = () => {
    const { user } = useSelector((state) => state.authSlice);
    const isActive = true;
   
    const employees = [
      {
        name: "Jennie Duncan",
        image:
          "https://storage.googleapis.com/a1aa/image/c2bd0146-dff9-4b60-9b6e-215fbdd1dfa5.jpg",
        dob: "1995-05-05",
      },
      {
        name: "Alex Carter",
        image: "https://example.com/alex.jpg",
        dob: "1990-11-23",
      },
    ];
  
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();
  
    const birthdaysToday = employees.filter((emp) => {
      const dob = new Date(emp.dob);
      return dob.getMonth() + 1 === todayMonth && dob.getDate() === todayDate;
    });
  
    const holidays = [
      {
        title: "Diwali",
        date: "02-12-2023",
        duration: "7 Days only",
        icon: "./assets/icons/diwali.png",
      },
      {
        title: "Christmas",
        date: "25-12-2023",
        duration: "1 Day only",
        icon: "./assets/icons/diwali.png",
      },
      {
        title: "New Year",
        date: "01-01-2024",
        duration: "1 Day only",
        icon: "./assets/icons/diwali.png",
      },
      {
        title: "Holi",
        date: "14-03-2025",
        duration: "2 Days only",
        icon: "./assets/icons/bucket.png",
      },
    ];
    const [showAnimation, setShowAnimation] = useState(true);
  
    useEffect(() => {
      if (birthdaysToday.length > 0) {
        const timer = setTimeout(() => {
          setShowAnimation(false);
        }, 10000);
        return () => clearTimeout(timer);
      } else {
        setShowAnimation(false); 
      }
    }, [birthdaysToday]);

  return (
    // <div className="">
    //   <section className="">
    //     <div className="card">
    //       <div className="card-header d-flex justify-content-between">
    //         <h4>Welcome {user?.name}</h4>
    //       </div>
    //     </div>

    //     <div className="card">
    //       <div className="card-body row">
    //         <div className="col-md-3 ">
    //           <img className='img-fluid img-thumbnail' src={user.image} alt="" />
    //         </div>
    //         <div className="col-md-9">
    //           <table className='table'>
    //             <tbody>
    //               <tr>
    //                 <th>Name</th>
    //                 <td>{user.name}</td>
    //               </tr>
    //               <tr>
    //                 <th>Username</th>
    //                 <td>{user.username}</td>
    //               </tr>
    //               <tr>
    //                 <th>Email</th>
    //                 <td>{user.email}</td>
    //               </tr>
    //               <tr>
    //                 <th>Usertype</th>
    //                 <td>{user.type}</td>
    //               </tr>
    //               <tr>
    //                 <th>Status</th>
    //                 <td>{user.status}</td>
    //               </tr>
    //               <tr>
    //                 <th>Mobile</th>
    //                 <td>{user.mobile}</td>
    //               </tr>
    //               <tr>
    //                 <th>Address</th>
    //                 <td>{user.address}</td>
    //               </tr>
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
    <>
    <div className="row">
      {/* <section className="section">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <h4>Welcome {user?.name}</h4>
          </div>
        </div>

        <div className="card">
          <div className="card-body row">
            <div className="col-md-3 ">
              <img className='img-fluid img-thumbnail' src={user.image} alt="" />
            </div>
            <div className="col-md-9">
              <table className='table'>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <th>Username</th>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th>Usertype</th>
                    <td>{user.type}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>{user.status}</td>
                  </tr>
                  <tr>
                    <th>Mobile</th>
                    <td>{user.mobile}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{user.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section> */}
      <div className="col-xl-4">
        <div className="card cardborder overflow-hidden p-0 rounded-3 ">
          <div className="bg-primary-subtle">
            <div className="row">
              <div className="col-7">
                <div className="text-primary p-3">
                  <h5 className="text-primary">Welcome Back !</h5>
                  <p>{user?.user?.name}</p>
                </div>
              </div>
              <div className="col-5 align-self-end">
                <img
                  src="./assets/icons/undraw_hello_ccwj.svg"
                  alt="Profile"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="row">
              <div className="col-sm-5">
                <div className="avatar-md profile-user-wid mb-4 position-relative">
                  <img
                    src="./assets/icons/user-1.jpg"
                    alt="User Avatar"
                    className="img-thumbnail rounded-circle"
                  />
                  <span
                    className="activedot"
                    style={{
                      backgroundColor: isActive ? "#65d500" : "red",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      display: "inline-block",
                      position: "absolute",
                      bottom: "3px",
                      right: "12px",
                    }}
                  ></span>
                </div>
                <h5
                  className="font-size-15 text-truncate mb-0"
                  style={{ fontSize: "16px" }}
                >
                  {user?.user?.username}
                </h5>
                <p
                  className="text-muted mb-0 text-truncate"
                  style={{ fontSize: "14px" }}
                >
                  {user?.user?.type}
                </p>
                <p
                  className="text-muted mb-0 text-truncate"
                  style={{ fontSize: "14px" }}
                >
                  UI/UX Designer
                </p>
              </div>

              <div className="col-sm-7">
                <div className="pt-4">
                  <div className="row">
                    <div className="col-12">
                      <h5
                        className="font-size-15 mb-0"
                        style={{ fontSize: "14px" }}
                      >
                        Contact
                      </h5>
                      <p
                        className="text-muted mb-0"
                        style={{ fontSize: "13px" }}
                      >
                        {user?.user?.email}
                      </p>
                      <p
                        className="text-muted mb-0"
                        style={{ fontSize: "13px" }}
                      >
                        {user?.user?.mobile}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="row">
      {/* Holiday Section */}
      <div className="col-md-4">
        <div className="card cardborder rounded-4">
          <div class="employees-card">
            <h2 class="employees-title d-flex align-items-center">
              {" "}
              <img
                src="./assets/icons/sunbed.png"
                alt="holiday"
                class="me-3"
                width="40"
                height="40"
                style={{ objectFit: "cover" }}
              />
              Company holiday
            </h2>

            {holidays.map((holiday, index) => (
              <div
                key={index}
                className={`d-flex justify-content-between align-items-center ${
                  index !== holidays.length - 1
                    ? "border-bottom pb-3 mb-3"
                    : "pt-2"
                }`}
              >
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={holiday.icon}
                    alt={holiday.title}
                    className={
                      holiday.title === "Holi"
                        ? "rounded-circle"
                        : "img-fluid"
                    }
                    width="40"
                    height="40"
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <p
                      className="mb-0 employee-name"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {holiday.title}
                    </p>
                    <p
                      className="mb-0 employee-desc"
                      style={{
                        fontSize: "0.75rem",
                        whiteSpace: "normal",
                        maxWidth: "none",
                      }}
                    >
                      {holiday.date}
                    </p>
                  </div>
                </div>
                <p className="red-text mb-0">{holiday.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Birthday Section */}
      <div className="col-md-4">
        {showAnimation && birthdaysToday.length > 0 && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 9999,
            }}
          >
            <iframe
              src="https://lottie.host/embed/2d8d036d-43ea-4820-9f17-b6631846aed5/uqTlmKSbkU.lottie"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
              title="Birthday Animation"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="">
          {birthdaysToday.length > 0 ? (
            birthdaysToday.map((employee, index) => (
              <div key={index} className="cardborder p-3 mb-3 rounded-4">
                <div
                  className="d-flex gap-2 align-items-center birthday-card mb-4 cardborder"
                  style={{
                    backgroundImage:
                      "url(./assets/icons/freepik__adjust__63979.png)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="rounded-circle"
                    width="48"
                    height="48"
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <p className="mb-0 employee-name">{employee.name}</p>
                    <p className="mb-0 employee-desc">Has birthday today.</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center cardborder p-4 rounded-4">
              <p className="text-muted">No Events today</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </>
  )
}

export default Employee;
