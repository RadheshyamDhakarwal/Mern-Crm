import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import api, { getMembers_Leader } from "../../http";

const Leader = () => {
  const authState = useSelector(state => state.authSlice);
  const user = authState?.user?.user || {};
  const [meetingsToday, setMeetingsToday] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deals, setDeals] = useState([]);
  const [users, setUsers] = useState();

  const [filters, setFilters] = useState({
    status: 'won',
    assigned_employee: '',
    startDate: '',
    endDate: ''
  });
  const [loadingDeals, setLoadingDeals] = useState(false);

  const employees = [
    {
      name: "Jennie Duncan",
      image: "https://storage.googleapis.com/a1aa/image/c2bd0146-dff9-4b60-9b6e-215fbdd1dfa5.jpg",
      dob: "1995-05-05",
    },
    {
      name: "Alex Carter",
      image: "https://example.com/alex.jpg",
      dob: "1990-11-23",
    },
  ];

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


  useEffect(() => {
    (async () => {
      const res = await getMembers_Leader();
      if (res.success) {
        setUsers(res.data);
        console.log(res.data);
      }
    })();
  }, [])

  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayDate = today.getDate();

  const birthdaysToday = employees.filter((emp) => {
    const dob = new Date(emp.dob);
    return dob.getMonth() + 1 === todayMonth && dob.getDate() === todayDate;
  });

  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    if (birthdaysToday?.length > 0) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 10000);
      return () => clearTimeout(timer);
    } else {
      setShowAnimation(false);
    }
  }, [birthdaysToday]);

  // Fetch Today's Meetings
  useEffect(() => {
    const fetchMeetingsForToday = async () => {
      try {
        const response = await api.get(
          `https://api.sevenunique.com/api/task/meetings/today/${user.id}`
        );
        setMeetingsToday(response.data);
      } catch (error) {
        console.error("Error fetching today's meetings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user || user.id) {
      fetchMeetingsForToday();
      fetchFilteredDeals();
    }
  }, [user]);

  // Fetch filtered deals
  const fetchFilteredDeals = async () => {
    setLoadingDeals(true);
    try {
      const params = {
        assigned_leader: user.id,
        status: filters.status,
        ...(filters.assigned_employee && { assigned_employee: filters.assigned_employee }),
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate })
      };

      const response = await api.get('/task/filterDeals', { params });
      setDeals(response.data);
    } catch (error) {
      console.error('Error fetching filtered deals:', error);
    } finally {
      setLoadingDeals(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    fetchFilteredDeals();
  };

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
                    <p>{user?.name}</p>
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

            <div className="card-body pt-0" style={{ paddingBottom: "185px" }}>
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
                        backgroundColor: "#65d500",
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
                    {user.username}
                  </h5>
                  <p
                    className="text-muted mb-0 text-truncate"
                    style={{ fontSize: "14px" }}
                  >
                    {user.type}
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
                          {user.email}
                        </p>
                        <p
                          className="text-muted mb-0"
                          style={{ fontSize: "13px" }}
                        >
                          {user.mobile}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Holidays Section */}
        <div className="col-md-8">
          <div className="card cardborder rounded-4">
            <div className="employees-card">
              <h2 className="employees-title d-flex align-items-center">
                {" "}
                <img
                  src="./assets/icons/sunbed.png"
                  alt="holiday"
                  className="me-3"
                  width="40"
                  height="40"
                  style={{ objectFit: "cover" }}
                />
                Company holiday
              </h2>

              {holidays?.map((holiday, index) => (
                <div
                  key={index}
                  className={`d-flex justify-content-between align-items-center ${index !== holidays?.length - 1
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
      </div>

      {/* Meetings Section */}
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card cardborder rounded-4">
            <h5 className="card-header">Today's Meetings</h5>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Venue</th>
                      <th>Location</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : meetingsToday?.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No meetings scheduled for today.
                        </td>
                      </tr>
                    ) : (
                      meetingsToday?.map((meeting, index) => (
                        <tr key={index} className="text-danger">
                          <td className="text-danger">{meeting.title}</td>
                          <td className="text-danger">{new Date(meeting.startDate).toLocaleString()}</td>
                          <td className="text-danger">{new Date(meeting.endDate).toLocaleString()}</td>
                          <td className="text-danger">{meeting.venue}</td>
                          <td className="text-danger">{meeting.location}</td>
                          <td className="text-danger">{meeting.dealId?.status}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Section with Filters */}
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card cardborder rounded-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>Deals</h5>
              <div className="d-flex gap-2">
                <select
                  className="form-select form-select-sm"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="won">Won</option>
                  <option value="untouched">Untouched</option>
                  <option value="next_meeting">Next Meeting</option>
                  <option value="quotation">Quotation</option>
                  <option value="Loss">Loss</option>
                </select>

                <select
                  className="form-select form-select-sm"
                  name="assigned_employee"
                  value={filters.assigned_employee}
                  onChange={handleFilterChange}
                >
                  <option value="">All Employees</option>
                  {users?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={applyFilters}
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Lead</th>
                      <th>Assigned Employee</th>
                      <th>Assigned leader</th>
                      <th>Status</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingDeals ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          Loading deals...
                        </td>
                      </tr>
                    ) : deals.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No deals found
                        </td>
                      </tr>
                    ) : (
                      deals.map((deal) => (
                        <tr key={deal._id}>
                          <td>{deal.lead?.name || 'N/A'}</td>
                          <td>{deal.assigned_employee?.name || 'N/A'}</td>
                          <td>{deal.assigned_leader?.name || 'N/A'}</td>

                          <td>
                            <span className={`badge bg-${deal.status === 'won' ? 'success' : deal.status === 'Loss' ? 'danger' : 'warning'}`}>
                              {deal.status}
                            </span>
                          </td>
                          <td>{new Date(deal.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leader;