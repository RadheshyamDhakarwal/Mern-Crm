import React, { useEffect, useState } from "react";
import axios from "axios";
import api, { getMembers_Leader } from "../../http";
import { toast } from "react-toastify";
import Deals from "../../components/Deals/Deals";

export default function LeaderLead() {
  const [deals, setDeals] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [deadline, setDeadline] = useState("");
  const [viewMode, setViewMode] = useState("all"); // 'all', 'my', 'employee'
  const [assignToSelf, setAssignToSelf] = useState(false);

  const users = JSON.parse(localStorage.getItem("user"));
  const leaderId = users?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dealsRes, membersRes] = await Promise.all([
          api.get(`https://api.sevenunique.com/api/task/getDeals/${leaderId}`),
          getMembers_Leader()
        ]);

        if (dealsRes.success) setDeals(dealsRes.data);
        setMembers(membersRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, [leaderId]);

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDeal) {
      toast.error("Please select a deal first");
      return;
    }

    const employeeToAssign = assignToSelf ? leaderId : selectedEmployee;
    if (!employeeToAssign) {
      toast.error("Please select an employee or choose to assign to yourself");
      return;
    }

    try {
      const res = await api.post("https://api.sevenunique.com/api/task/assignDeals", {
        dealID: selectedDeal,
        assigned_employee: employeeToAssign,
        deadline,
      });

      if (res.success) {
        toast.success("✅ Deal assigned successfully!");
        const updatedDeals = await api.get(
          `https://api.sevenunique.com/api/task/getDeals/${leaderId}`
        );
        setDeals(updatedDeals.data);
        resetForm();
      } else {
        toast.error("❌ Assignment failed");
      }
    } catch (err) {
      console.error("Error assigning deal:", err);
      toast.error(err.response?.data?.message || "❌ Error assigning deal");
    }
  };

  const resetForm = () => {
    setSelectedEmployee("");
    setDeadline("");
    setSelectedDeal(null);
    setAssignToSelf(false);
    // Close modal
    document.getElementById('cardModal')?.classList.remove('show');
    document.querySelector('.modal-backdrop')?.remove();
  };

  const showAllDeals = () => {
    setViewMode("all");
    setSelectedEmployee("");
  };

  const showMyDeals = () => {
    setViewMode("my");
    setSelectedEmployee(leaderId);
  };

  const showEmployeeDeals = () => {
    if (!selectedEmployee) {
      toast.error("Please select an employee first");
      return;
    }
    setViewMode("employee");
  };

  return (
    <div className="main-content mt-3 dealsComponent">
      <div className="container">
        {/* Employee Selector */}
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4>Leader Leads</h4>
                {viewMode !== "all" && (
                  <button
                    className="btn btn-outline-primary"
                    onClick={showAllDeals}
                  >
                    Back to All Deals
                  </button>
                )}
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-8">
                    <label htmlFor="selectemployee" className="form-label">
                      Select Employee
                    </label>
                    <select
                      className="form-select"
                      value={selectedEmployee}
                      onChange={(e) => {
                        setSelectedEmployee(e.target.value);
                        setAssignToSelf(false);
                      }}
                      disabled={assignToSelf}
                    >
                      <option value="">Choose Employee</option>
                      {members?.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex gap-2 mt-4">
                      <button
                        className="btn bg-primary rounded-sm px-3 py-2 text-white border-0"
                        onClick={showMyDeals}
                      >
                        <i className="bi bi-person me-2"></i>
                        My Deals
                      </button>
                      <button
                        className="btn bg-success rounded-sm px-3 py-2 text-white border-0"
                        onClick={showEmployeeDeals}
                        disabled={!selectedEmployee}
                      >
                        <i className="bi bi-people me-2"></i>
                        Employee Deals
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {viewMode === "all" ? (
          <>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h4>Latest Leads</h4>
                  </div>
                  <div className="card-body mt-3">
                    {deals.length === 0 ? (
                      <div className="text-center py-5">
                        <h5>No deals available</h5>
                        <p className="text-muted">Create new deals or check back later</p>
                      </div>
                    ) : (
                      <div className="row gy-4">
                        {deals.map((deal) => (
                          <div className="col-md-6 col-xl-3" key={deal._id}>
                            <div className="card position-relative shadow-sm rounded-4">
                              <button
                                className="btn btn-sm position-absolute top-0 end-0 m-2"
                                data-bs-toggle="modal"
                                data-bs-target="#cardModal"
                                onClick={() => setSelectedDeal(deal._id)}
                              >
                                <i className="bi bi-pencil-square fs-6"></i>
                              </button>
                              <div
                                className="position-absolute d-flex align-items-center justify-content-center rounded-circle"
                                style={{
                                  top: "-20px",
                                  left: "20px",
                                  width: "40px",
                                  height: "40px",
                                  backgroundColor: "#4a90e2",
                                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px",
                                }}
                              >
                                <i className="fas fa-briefcase text-white"></i>
                              </div>
                              <div className="card-body pt-4 mt-3">
                                <h5 className="card-title fw-semibold">
                                  Deal #{deal._id.slice(-4)}
                                </h5>
                                <div className="text-muted small mb-1">
                                  <i className="fas fa-rupee-sign me-1 text-secondary" />
                                  Value: ₹{deal.value}
                                </div>
                                <div className="text-muted small mb-1">
                                  <i className="fas fa-user me-1 text-secondary" />
                                  Name: {deal.lead?.name || "N/A"}
                                </div>
                                <div className="text-muted small mb-1">
                                  <i className="fas fa-map-marker-alt me-1 text-secondary" />
                                  District: {deal.lead?.District || "N/A"}
                                </div>
                                <div className="text-muted small mb-1">
                                  <i className="fas fa-star me-1 text-secondary" />
                                  Interest: {deal.lead?.interest || "N/A"}
                                </div>
                                <div className="d-flex mt-2 pt-3 px-2 justify-content-between align-items-center text-muted small fw-semibold">
                                  <span>Status</span>
                                  <span>Assigned</span>
                                </div>
                                <div className="d-flex align-items-center mt-2 pt-3 px-3 border-top">
                                  <span className="badge bg-secondary text-uppercase">
                                    {deal?.status || "N/A"}
                                  </span>
                                  <span className="ms-auto fw-semibold text-muted">
                                    {deal.assigned_employee
                                      ? deal.assigned_employee.name
                                      : "Not assigned"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Assign Deal Modal */}
                <div
                  className="modal fade"
                  id="cardModal"
                  tabIndex="-1"
                  aria-labelledby="cardModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="cardModalLabel">
                          Assign Deal
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={resetForm}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleAssignSubmit}>
                          <div className="mb-3 form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="assignToSelf"
                              checked={assignToSelf}
                              onChange={(e) => {
                                setAssignToSelf(e.target.checked);
                                if (e.target.checked) setSelectedEmployee("");
                              }}
                            />
                            <label className="form-check-label" htmlFor="assignToSelf">
                              Assign to myself
                            </label>
                          </div>

                          {!assignToSelf && (
                            <div className="mb-3">
                              <label className="form-label">Select Employee</label>
                              <select
                                className="form-select"
                                value={selectedEmployee}
                                onChange={(e) => setSelectedEmployee(e.target.value)}
                                required={!assignToSelf}
                              >
                                <option value="">Choose Employee</option>
                                {members?.map((member) => (
                                  <option value={member.id} key={member.id}>
                                    {member.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          <div className="mb-3">
                            <label className="form-label">Deadline</label>
                            <input
                              type="date"
                              className="form-control"
                              value={deadline}
                              onChange={(e) => setDeadline(e.target.value)}
                              required
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          <div className="d-flex justify-content-end gap-2">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                              onClick={resetForm}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary"
                            >
                              Assign Deal
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="main-contents">
            <Deals selectedEmployee={selectedEmployee} />
          </div>
        )}
      </div>
    </div>
  );
}