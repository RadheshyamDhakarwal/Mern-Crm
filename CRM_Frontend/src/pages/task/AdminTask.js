import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import "../../assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import api, { getMembers_Leader } from "../../http"; // Assuming this function exists to fetch team members
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Task from "./Task";
function AdminTask() {
  const { user } = useSelector((state) => state.authSlice);
  const [tasks, setTask] = useState([]);
  const [todaytasks, settodayTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTask, setEditTask] = useState(null);
  const [employees, setEmployees] = useState();
  const [employeeMap, setEmployeeMap] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState();

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showtask, setShowtask] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Todo",
    assignedTo: "", // added to store selected user for task assignment
  });
  const [teamMembers, setTeamMembers] = useState([]); // state to store team members
  const [file, setFile] = useState(null); // state for file upload

  // Get user from localStorage
  const users = (localStorage.getItem("user"));
  const userId = users?.id;
  console.log("User ID: ", userId);

  // Fetch team members for task assignment
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await getMembers_Leader();
        setTeamMembers(res.data); // Populate team members
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchMembers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // store file in state
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = (localStorage.getItem("user"))?.id || ""; // Get user ID safely

    const updatedFormData = {
      ...formData,
      createdBy: userId,
      createdFor: formData.assignedTo,
    };

    const data = new FormData();
    data.append("title", updatedFormData.title);
    data.append("description", updatedFormData.description);
    data.append("Status", updatedFormData.status);
    data.append("assignedTo", updatedFormData.assignedTo);
    data.append("createdBy", updatedFormData.createdBy); // 👈 Important!
    data.append("createdFor", updatedFormData.createdFor); // 👈 Important!

    if (file) {
      data.append("file", file);
    }

    try {
      const res = await api.post("api/task", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTask([...tasks, res.data]);
      setShowModal(false);
      setFormData({
        title: "",
        description: "",
        status: "Todo",
        assignedTo: "",
      });
      setFile(null);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const searchEmployeeTask = async () => {
    setShowtask((prev) => !prev); // toggles true ↔ false
  };

  const cards = [
    {
      title: "App Development",
      team: "Marketing Team",
      timeLeft: "1 Week Left",
      icon: "fas fa-mobile-alt",
      bgColor: "#e94f73",
      progress: "34%",
      members: [
        "https://storage.googleapis.com/a1aa/image/d2b21da2-d6fa-42fe-a81a-49624e3885f0.jpg",
        "https://storage.googleapis.com/a1aa/image/2ddea612-2f9e-46be-0626-a34eace8c643.jpg",
        "https://storage.googleapis.com/a1aa/image/50a40006-9e32-4193-d761-e80d87f52970.jpg",
      ],
    },
    {
      title: "Web Design",
      team: "Core UI Team",
      timeLeft: "3 Weeks Left",
      icon: "fas fa-laptop",
      bgColor: "#1abc9c",
      progress: "76%",
      members: [
        "https://storage.googleapis.com/a1aa/image/2ddea612-2f9e-46be-0626-a34eace8c643.jpg",
      ],
    },
    {
      title: "Landing Page",
      team: "Marketing Team",
      timeLeft: "2 Days Left",
      icon: "fas fa-window-maximize",
      bgColor: "#4a90e2",
      progress: "4%",
      members: [
        "https://storage.googleapis.com/a1aa/image/d2b21da2-d6fa-42fe-a81a-49624e3885f0.jpg",
        "https://storage.googleapis.com/a1aa/image/50a40006-9e32-4193-d761-e80d87f52970.jpg",
        "https://storage.googleapis.com/a1aa/image/2ddea612-2f9e-46be-0626-a34eace8c643.jpg",
      ],
    },
    {
      title: "Business Compare",
      team: "Marketing Team",
      timeLeft: "1 Month Left",
      icon: "fas fa-chart-pie",
      bgColor: "#f7931e",
      progress: "90%",
      members: [
        "https://storage.googleapis.com/a1aa/image/d2b21da2-d6fa-42fe-a81a-49624e3885f0.jpg",
        "https://storage.googleapis.com/a1aa/image/2ddea612-2f9e-46be-0626-a34eace8c643.jpg",
      ],
    },
  ];
  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div
                  className="card cardborder overflow-hidden p-0 rounded-3 "
                  style={{ boxShadow: "none" }}
                >
                  <div className="card-header d-flex justify-content-between">
                    <h4>Leader Leads</h4>
                    <Button
                      className="badge rounded bg-label-primary px-4 py-2"
                      onClick={() => setShowModal(true)}
                    >
                      <i className="fas fa-plus mr-2"></i> Add Task
                    </Button>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-9">
                        <label for="selectemployee" class="form-label">
                          Select Employee
                        </label>
                        <select
                          class="form-select"
                          name="assignedTo"
                          className="form-control select2"
                          value={selectedEmployee}
                          onChange={(e) => setSelectedEmployee(e.target.value)}
                          required
                        >
                          <option value="">Select Team Member</option>
                          {teamMembers.map((member) => (
                            <option key={member.id} value={member.id}>
                              {member.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <div class="mt-4">
                          <button
                            onClick={searchEmployeeTask}
                            className="btn bg-primary rounded-sm px-3 py-2 text-white border-0 "
                          >
                            <i class="bi bi-search me-2"></i>Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {showtask ? (
                <div className="col-md-12">
                  <div
                    className="card cardborder overflow-hidden p-0 rounded-3 "
                    style={{ boxShadow: "none" }}
                  >
                    <div className="card-header">
                      <h4>Letest Leads</h4>
                    </div>
                    <div className="card-body mt-3">
                      <div className="row gy-4">
                        {cards.map((card, index) => (
                          <div className="col-md-6 col-xl-3" key={index}>
                            <div className="card position-relative shadow-sm rounded-4">
                              {/* Edit Button */}
                              <Link
                                to={"/viewlead"}
                                className="btn btn-sm  position-absolute top-0 end-0 m-2"
                              >
                                {/* <i class="bi bi-pencil-square fs-6"></i> */}
                                View Lead
                              </Link>
                              <div
                                className="position-absolute d-flex align-items-center justify-content-center rounded-circle"
                                style={{
                                  top: "-20px",
                                  left: "20px",
                                  width: "40px",
                                  height: "40px",
                                  backgroundColor: card.bgColor,
                                  boxShadow:
                                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                                }}
                              >
                                <i className={`${card.icon} text-white`}></i>
                              </div>
                              <div className="card-body pt-4 mt-3">
                                <h5 className="card-title fw-semibold">
                                  {card.title}
                                </h5>
                                <div className="text-muted small mb-1">
                                  <i className="fas fa-crosshairs me-1 text-secondary" />
                                  {card.team}
                                </div>
                                <div className="text-muted small">
                                  <i className="fas fa-shield-alt me-1 text-secondary" />
                                  {card.timeLeft}
                                </div>
                                <div className="d-flex mt-2 pt-3 px-2 justify-content-between align-items-center mt-3 text-muted small fw-semibold">
                                  <span>Team Member</span>
                                  <span>Progress</span>
                                </div>
                                <div className="d-flex align-items-center mt-2 pt-3 px-3 border-top">
                                  {card.members.map((img, i) => (
                                    <img
                                      key={i}
                                      src={img}
                                      className="rounded-circle me-2"
                                      alt="member"
                                      width="28"
                                      height="28"
                                      style={{
                                        objectFit: "cover",
                                        marginLeft: "-10px",
                                      }}
                                    />
                                  ))}
                                  <span className="ms-auto fw-semibold text-muted">
                                    {card.progress}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Task selectedEmployee={selectedEmployee} />
              )}
            </div>
          </div>
        </section>

        {/* <div className="d-flex justify-content-center align-items-center w-100">
          <div className="form-group col-md-6">
            <label>Employee</label>
            <select
              name="assignedTo"
              className='form-control select2'
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              required
            >
              <option value="">Select Team Member</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>

          </div>

          <button onClick={searchEmployeeTask} className="btn btn-lg btn-primary col">Search</button>
        </div> */}
      </div>

      {/* Add Task Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Add New Task</Modal.Title>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowModal(false)}
          >
            <FaTimes /> {/* Place the icon inside the button */}
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Assign Toooooooo</Form.Label>
              <Form.Select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                required
              >
                <option value="">Select Team Member</option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Todo">Todo</option>
                <option value="Progress">Progress</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload File (Optional)</Form.Label>
              <Form.Control
                type="file"
                name="file"
                accept="*/*"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Task
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AdminTask;
