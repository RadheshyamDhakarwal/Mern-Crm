import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import "../../assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../http";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Task from "../../pages/task/Task";
import { toast } from "react-toastify";

function EmployeTask() {
  const { user } = useSelector((state) => state.authSlice);
  const [tasks, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState();
  const [employeeMap, setEmployeeMap] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // New state for date
  const [showModal, setShowModal] = useState(false);
  const [showtask, setShowtask] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Todo",
    assignedTo: "",
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [file, setFile] = useState(null);

  const users = JSON.parse(localStorage.getItem("user"));
  const userId = users?.id;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get(
          `https://api.sevenunique.com/api/task/get-allEmployee?type=employee`
        );
        setTeamMembers(res.data);
      } catch (error) {
        console.error("❌ Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel", // .xls
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("❌ Only Excel files (.xlsx or .xls) are allowed.");
      e.target.value = ""; // Reset the input
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!file) {
    //   toast.error("Please attach an Excel file before submitting.");
    //   return;
    // }
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
    data.append("createdBy", updatedFormData.createdBy);
    data.append("createdFor", updatedFormData.createdFor);

    if (file) {
      data.append("file", file);
    }

    try {
      const res = await api.post("https://api.sevenunique.com/api/task", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTask([...tasks, res.data]);
      toast.success("Task added successfully!");
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

  const searchEmployeeTask = () => {
    setShowtask(true); // Show task section
  };

  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div
                  className="card cardborder overflow-hidden p-0 rounded-3"
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
                      {/* Employee Select */}
                      <div className="col-md-5">
                        <label htmlFor="selectemployee" className="form-label">
                          Select Employee
                        </label>
                        <select
                          name="assignedTo"
                          className="form-control select2"
                          value={selectedEmployee}
                          onChange={(e) => setSelectedEmployee(e.target.value)}
                          required
                        >
                          <option value="">Select Team Member</option>
                          {teamMembers?.map((member) => (
                            <option key={member._id} value={member._id}>
                              {member.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Date Picker */}
                      <div className="col-md-4">
                        <label htmlFor="selectdate" className="form-label">
                          Select Date
                        </label>
                        <input
                          type="date"
                          style={{ height: "42px" }}
                          className="form-control select2"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                      </div>

                      <div className="col-md-2 d-flex align-items-end">
                        <button
                          onClick={searchEmployeeTask}
                          className="bg-primary rounded-sm px-3 py-2 text-white border-0 w-100"
                        >
                          <i className="bi bi-search me-2"></i>Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {showtask && (
                <Task
                  selectedEmployee={selectedEmployee}
                  selectedDate={selectedDate}
                />
              )}
            </div>
          </div>
        </section>
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
            <FaTimes />
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
              <Form.Label>Assign To</Form.Label>
              <Form.Select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                required
              >
                <option value="">Select Team Member</option>
                {teamMembers?.map((member) => (
                  <option key={member._id} value={member._id}>
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
                accept=".xlsx,.xls,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleFileChange}
              />
              <Form.Text className="text-muted">
                {file ? `Selected file: ${file.name}` : "No file selected"}
              </Form.Text>
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

export default EmployeTask;
