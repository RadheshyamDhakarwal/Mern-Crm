import { useEffect, useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import api, { getCounts } from "../../http";
import { setCount } from "../../store/main-slice";
import CountsCard from "./CountsCard";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Admin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const res = await getCounts();
      if (res?.success) dispatch(setCount(res?.data));
    })();
  }, []);

  const { counts } = useSelector((state) => state.mainSlice);
  const { admin, employee, leader, team } = counts;
  const [state, setState] = React.useState({
    series: [
      {
        name: "Present",
        data: [25, 28, 22, 30, 27, 26, 29],
      },
      {
        name: "Absent",
        data: [5, 2, 8, 0, 3, 4, 1],
      },
    ],
    options: {
      chart: {
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      title: {
        text: "Weekly Attendance Report",
        align: "left",
      },
      yaxis: {
        title: {
          text: "Number of Employees",
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} employees`,
        },
      },
    },
  });

  const developerTasks = [
    {
      time: "09:00 am",
      color: "primary",
      description: (
        <>
          <p style={{ fontSize: "12px", fontWeight: "600" }} className="mb-0">
            Commit pushed
          </p>
        </>
      ),
    },
    {
      time: "10:30 am",
      color: "success",
      description: (
        <>
          <p style={{ fontSize: "12px", fontWeight: "600" }} className="mb-0">
            Deployed to staging
          </p>
        </>
      ),
    },
    {
      time: "12:15 pm",
      color: "warning",
      description: (
        <>
          <p style={{ fontSize: "12px", fontWeight: "600" }} className="mb-0">
            Bug fixed
          </p>
        </>
      ),
    },
    {
      time: "02:00 pm",
      color: "info",
      description: (
        <>
          <p style={{ fontSize: "12px", fontWeight: "600" }} className="mb-0">
            Code reviewed
          </p>
        </>
      ),
    },
    {
      time: "03:45 pm",
      color: "danger",
      description: (
        <>
          <p style={{ fontSize: "12px", fontWeight: "600" }} className="mb-0">
            Rollback performed
          </p>
        </>
      ),
    },
  ];
  // 1. Declare employees FIRST

  const [birthdaysToday, setBirthdaysToday] = useState([]);
  const [loading, setLoading] = useState(true);
  const [holiday, setHoliday] = useState(3);
  const [preview, setPriview] = useState(0);
  useEffect(() => {
    api
      .get("task/todayevents?type=birthday") // <-- API endpoint
      .then((res) => {
        setBirthdaysToday(res.data); // 👈 make sure 'users' match backend response
      })
      .catch((err) => {
        console.error("Error fetching birthday data:", err);
      })
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    api
      .get("task/todayevents?type=birthday") // <-- API endpoint
      .then((res) => {
        setBirthdaysToday(res.data); // 👈 make sure 'users' match backend response
      })
      .catch((err) => {
        console.error("Error fetching birthday data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const [showAnimation, setShowAnimation] = useState(true); // start with animation visible

  useEffect(() => {
    if (showAnimation && birthdaysToday) {
      const timer = setTimeout(() => {
        setShowAnimation(false); // close after 5 seconds
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation, birthdaysToday]);

  // console.log("testing", birthdaysToday?.data);

  const holidays = [
    {
      title: "New Year's Day",
      date: "01-01-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-calendar2-week" />,
    },
    {
      title: "Guru Gobind Singh Jayanti",
      date: "06-01-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-person-bounding-box" />,
    },
    {
      title: "Swami Vivekananda Jayanti",
      date: "12-01-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-award" />,
    },
    {
      title: "Makar Sankranti",
      date: "14-01-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-sunrise-fill" />,
    },
    {
      title: "Republic Day",
      date: "26-01-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-flag-fill" />,
    },
    {
      title: "Vasant Panchami",
      date: "10-02-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-flower3" />,
    },
    {
      title: "Women's Day",
      date: "08-03-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-gender-female" />,
    },
    {
      title: "Holi",
      date: "17-03-2025",
      duration: "2 Days only",
      icon: <i className="bi bi-bucket-fill" />,
    },
    {
      title: "Good Friday",
      date: "29-03-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-cross" />,
    },
    {
      title: "Eid-ul-Fitr",
      date: "10-04-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-moon-stars-fill" />,
    },
    {
      title: "Ambedkar Jayanti",
      date: "14-04-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-book" />,
    },
    {
      title: "Ram Navami",
      date: "18-04-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-person-standing" />,
    },
    {
      title: "Labour Day",
      date: "01-05-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-tools" />,
    },
    {
      title: "Buddha Purnima",
      date: "23-05-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-fire" />,
    },
    {
      title: "Bakrid",
      date: "17-06-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-moon-fill" />,
    },
    {
      title: "Muharram",
      date: "17-07-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-droplet-fill" />,
    },
    {
      title: "Independence Day",
      date: "15-08-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-flag" />,
    },
    {
      title: "Raksha Bandhan",
      date: "19-08-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-heart-fill" />,
    },
    {
      title: "Teachers' Day",
      date: "05-09-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-journal-bookmark-fill" />,
    },
    {
      title: "Milad-un-Nabi",
      date: "16-09-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-star-fill" />,
    },
    {
      title: "Mahalaya Amavasya",
      date: "30-09-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-circle-half" />,
    },
    {
      title: "Gandhi Jayanti",
      date: "02-10-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-person-check" />,
    },
    {
      title: "Dussehra",
      date: "12-10-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-crosshair" />,
    },
    {
      title: "Halloween",
      date: "31-10-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-emoji-dizzy-fill" />,
    },
    {
      title: "Kannada Rajyotsava",
      date: "01-11-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-bookmark-star-fill" />,
    },
    {
      title: "Diwali",
      date: "03-11-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-brightness-high-fill" />,
    },
    {
      title: "Bhai Dooj",
      date: "06-11-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-people-fill" />,
    },
    {
      title: "Chhath Puja",
      date: "07-11-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-water" />,
    },
    {
      title: "Govardhan Puja",
      date: "15-11-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-cloud-fog2-fill" />,
    },
    {
      title: "Constitution Day",
      date: "26-11-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-journal-code" />,
    },
    {
      title: "Christmas Day",
      date: "25-12-2025",
      duration: "1 Day only",
      icon: <i className="bi bi-gift-fill" />,
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-xl-4">
          <div className="card cardborder overflow-hidden p-0 rounded-3 ">
            <div className="bg-primary-subtle">
              <div className="row">
                <div className="col-7">
                  <div className="text-primary p-3">
                    <h5 className="text-primary">Welcome Back !</h5>
                    <p>Developer Dashboard</p>
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
                  <div className="avatar-md profile-user-wid mb-4">
                    <img
                      src="./assets/icons/user-1.jpg"
                      alt="User Avatar"
                      className="img-thumbnail rounded-circle"
                    />
                  </div>
                  <h5
                    className="font-size-15 text-truncate mb-0"
                    style={{ fontSize: "16px" }}
                  >
                    John Deo
                  </h5>
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
                          john.smith@company.com
                        </p>
                        <p
                          className="text-muted mb-0"
                          style={{ fontSize: "13px" }}
                        >
                          +91 2837 283793
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <CountsCard title="Total Employees" icon="fa-user" count={employee} />
          <CountsCard title="Team Leaders" icon="fa-user" count={leader} />
          {/* <div
            class="rounded-3 p-2 shadow-sm d-flex flex-column justify-content-between"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <div class="d-flex bg-white p-3 rounded-3 position-relative">
              <div
                class="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white"
                style={{ width: "32px", height: "32px" }}
              >
                <i class="bi bi-person-fill"></i>
              </div>
              <div className="ms-2 ">
                <span
                  class="text-muted small fw-medium"
                  style={{ fontSize: "19px" }}
                >
                  Total Employe
                </span>
                <p class="fw-bold text-dark mb-0">30</p>
              </div>
              <div class="d-flex align-items-center text-success small" style={{position:"absolute",right:"10px", bottom:"10px"}}>
                <i class="fas fa-arrow-up me-1"></i>
                <span class="fw-semibold">2.5%</span>
                <span class="ms-1 text-muted fw-normal">vs last month</span>
              </div>
            </div>
          </div> */}
        </div>
        <div className="col-xl-4">
          <CountsCard title="Total Admins" icon="fa-user" count={admin} />
          <CountsCard title="Team Department" icon="fa-user" count={team} />
        </div>
      </div>

      <div className="row mb-3">
        {/* <div className="col-md-4">
          <div className="card timeline-card shadow-sm rounded-0">
            <div className="card-body">
              <h5 className="card-title mb-4">Developer Recent Tasks</h5>
              <ul className="timeline-widget mb-0 position-relative mb-n5 ps-0">
                {developerTasks.map((task, index) => (
                  <li
                    key={index}
                    className="timeline-item d-flex position-relative overflow-hidden"
                  >
                    <div className="timeline-time text-dark flex-shrink-0 text-end" style={{ width: '69px',  }}>
                      {task.time}
                    </div>
                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                      <span className={`timeline-badge border border-${task.color} flex-shrink-0`} style={{ width: '12px', height: '12px', borderRadius: '50%' }}></span>
                      {index !== developerTasks.length - 1 && (
                        <span className="timeline-badge-border d-block flex-shrink-0" style={{ width: '2px', backgroundColor: '#dee2e6', height: '100%' }}></span>
                      )}
                    </div>
                    <div className="timeline-desc text-dark mt-n1 flex-grow-1" style={{height:"fit-content"}}>{task.description}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div> */}
        {/* Holiday Section */}
        <div className="col-md-6">
          <div
            className="card cardborder rounded-4 shadow-sm"
            style={{ border: "none" }}
          >
            <div className="employees-card p-4">
              <div className="d-flex align-items-center mb-4">
                <div className="icon-wrapper bg-warning bg-opacity-10 p-3 rounded-circle me-3">
                  <img
                    src="./assets/icons/sunbed.png"
                    alt="holiday"
                    width="28"
                    height="28"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h2 className="employees-title mb-0 fw-bold text-dark">
                  Company Holidays
                </h2>
              </div>

              <div className="holiday-list">
                {holidays.slice(preview, holiday).map((holiday, index) => (
                  <div
                    key={index}
                    className={`d-flex justify-content-between align-items-center holiday-item ${
                      index !== holidays.length - 1
                        ? "border-bottom pb-3 mb-3"
                        : "pt-2"
                    }`}
                    style={{ transition: "all 0.3s ease" }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="holiday-icon-wrapper bg-light p-2 rounded">
                        {/* <img
                          src={holiday.icon}
                          alt={holiday.title}
                          className={
                            holiday.title === "Holi"
                              ? "rounded-circle"
                              : "img-fluid"
                          }
                          width="36"
                          height="36"
                          style={{ objectFit: "cover" }}
                        /> */}
                        {holiday.icon}
                      </div>
                      <div>
                        <p
                          className="mb-0 fw-semibold text-dark"
                          style={{ fontSize: "0.9rem" }}
                        >
                          {holiday.title}
                        </p>
                        <p
                          className="mb-0 text-muted"
                          style={{
                            fontSize: "0.75rem",
                          }}
                        >
                          <i className="far fa-calendar-alt me-1"></i>{" "}
                          {holiday.date}
                        </p>
                      </div>
                    </div>
                    <span className="badge bg-danger bg-opacity-10 text-danger py-2 px-3 rounded-pill">
                      {holiday.duration}
                    </span>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between">
                <div className="text-center mt-4">
                  <button
                    onClick={() => {
                      setHoliday(holiday - 3);
                      setPriview(preview - 3);
                    }}
                    disabled={holiday == 3}
                    className={`btn btn-orange btn-lg px-4 py-2 animated-button hover-scale `}
                  >
                    <i className="fas fa-eye me-1"></i> View Less
                  </button>
                </div>
                <div className="text-center mt-4">
                  <button
                    onClick={() => {
                      setHoliday(holiday + 3);
                      setPriview(preview + 3);
                    }}
                    className={`btn btn-orange btn-lg px-4 py-2 animated-button hover-scale  ${
                      holidays.length <= holiday && "d-none"
                    }`}
                  >
                    <i className="fas fa-eye me-1"></i> View More Holidays
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Birthday Section */}
        <div className="col-md-6">
          <div>
            {showAnimation && birthdaysToday && (
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
                <audio src="./assets/icons/cl.mp3" autoPlay />
              </div>
            )}

            <div className="cardborder p-3 mb-3 rounded-4">
              {loading ? (
                <p>Loading...</p>
              ) : birthdaysToday ? (
                birthdaysToday?.map((employee, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center birthday-card mb-4 "
                    style={{
                      backgroundImage:
                        "url(./assets/icons/freepik__adjust__63979.png)",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={`${employee.image || "/bithday.jpg"}`} // 👈 Adjust this path if needed
                        alt={employee.name}
                        className="rounded-circle"
                        width="48"
                        height="48"
                        style={{ objectFit: "cover" }}
                      />
                      <div>
                        <p className="mb-0 employee-name">{employee.name}</p>
                        <p className="mb-0 employee-desc">
                          Has birthday today.
                        </p>
                        <p className="mb-0 employee-desc">{employee.quote}</p>
                        {/* <p className="mb-0 employee-desc">{employee.dob}</p> */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center mb-4 cardborder rounded-4 p-4 h-100 d-flex flex-column align-items-center justify-content-center  bg-white">
                  <img
                    src="/bithday.jpg"
                    alt="No birthdays"
                    className="rounded-circle mb-3 shadow"
                    width="200"
                    height="200"
                    style={{
                      objectFit: "cover",
                      opacity: 0.7,
                      border: "4px solid #f0f0f0",
                    }}
                  />
                  <h5 className="fw-semibold text-secondary">
                    No Birthdays Today 🎉
                  </h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div id="chart" className="rounded-4">
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="line"
              height={350}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
