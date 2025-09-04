import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../../http";
import { toast } from "react-toastify";

export default function ViewLead() {
  const { id } = useParams();

  // State
  const [leads, setLeads] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [form, setForm] = useState({
    result: "",
    duration: "",
    interest: "",
    reminder: "",
    value: "",
    assigned_leader: "",
  });

  const [selectedLead, setSelectedLead] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDealModal, setShowDealModal] = useState(false);

  // Fetch Data
  useEffect(() => {
    fetchLeads();
    fetchLeaders();
  }, [id]);

  const fetchLeads = async () => {
    try {
      const res = await api.get(`https://api.sevenunique.com/api/task/getlead/${id}`);
       setLeads(res);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const fetchLeaders = async () => {
    try {
      const res = await api.get(
        `https://api.sevenunique.com/api/task/get-salesLeader`
      );
      setLeaders(res.data || []);
    } catch (err) {
      console.error("Leader fetch error:", err);
    }
  };

  // Handle Input Change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Open Modals
  const openUpdateModal = (lead) => {
    setSelectedLead(lead);
    setForm({
      result: lead.result || "",
      duration: "",
      interest: lead.interest || "",
      reminder: "",
    });
    setShowUpdateModal(true);
  };

  const openDealModal = (lead) => {
    setSelectedLead(lead);
    setForm({ value: "", assigned_leader: "", reminder: "" });
    setShowDealModal(true);
  };

  // Submit Handlers
  const submitUpdate = async () => {
    try {
      await api.put(`https://api.sevenunique.com/api/task/updatelead`, {
        leadID: selectedLead._id,
        result: form.result,
        duration: form.duration,
        interest: form.interest,
        reminder: form.reminder,
      });
      toast.success("Lead updated successfully");
      setShowUpdateModal(false);
      fetchLeads();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update lead");
    }
  };

  const submitDeal = async () => {
    try {
      await api.post(`https://api.sevenunique.com/api/task/createDeals`, {
        leadID: selectedLead._id,
        value: form.value,
        assigned_leader: form.assigned_leader,
        reminder: form.reminder,
      });
      toast.success("Deal created successfully");
      setShowDealModal(false);
      fetchLeads(); // Refresh lead list to reflect change
    } catch (err) {
      console.error(err);
      toast.error("Failed to create deal");
    }
  };

  // Interest Badge Mapping
  const getInterestBadge = (interest) => {
    const badgeMap = {
      Hot: "badge bg-danger",
      Cold: "badge bg-primary",
      Warm: "badge bg-warning text-dark",
      Medium: "badge bg-success",
      Low: "badge bg-secondary",
    };
    return (
      <span className={badgeMap[interest] || "badge bg-secondary"}>
        {interest}
      </span>
    );
  };

  return (
    <>
      <div className="main-content mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="text-primary mb-0">
                    <i className="bi bi-list-check me-2"></i>My Tasks
                  </h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle">
                      <thead className="bg-light text-center">
                        <tr>
                          <th>Task Title</th>
                          <th>Lead Name</th>
                          <th>Contact No.</th>
                          <th>State</th>
                          <th>Interest</th>
                          <th>Result</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.length > 0 ? (
                          leads.map((lead, i) => (
                            <tr key={i}>
                              <td>{lead?.taskID?.title || "N/A"}</td>
                              <td>{lead?.name}</td>
                              <td>{lead?.Contact_No}</td>
                              <td>{lead?.State}</td>
                              <td className="text-center">
                                {getInterestBadge(lead.interest)}
                              </td>
                              <td>{getInterestBadge(lead.result)}</td>
                              <td className="text-center">
                                  <>
                                    <button
                                      className="btn btn-sm btn-outline-primary me-2"
                                      onClick={() => openUpdateModal(lead)}
                                    >
                                      Update Lead
                                    </button>
                                    {lead.result !== "Assigned" && 
                                    <button
                                      className="btn btn-sm btn-outline-success"
                                      onClick={() => openDealModal(lead)}
                                    >
                                      Assign Deal
                                    </button>}
                                  </>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No leads found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Update Lead</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowUpdateModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Result</label>
                  <input
                    name="result"
                    placeholder="Result"
                    className="form-control"
                    value={form.result}
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Duration</label>
                  <input
                    name="duration"
                    placeholder="Duration"
                    className="form-control"
                    value={form.duration}
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Interest Level</label>
                  <select
                    name="interest"
                    className="form-select"
                    value={form.interest}
                    onChange={handleInput}
                  >
                    <option value="">Select Interest</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    <option value="Hot">Hot</option>
                    <option value="Cold">Cold</option>
                    <option value="Warm">Warm</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Reminder Date</label>
                  <input
                    name="reminder"
                    type="date"
                    className="form-control"
                    value={form.reminder}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={submitUpdate}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Deal Modal */}
      {showDealModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Create Deal from Lead</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowDealModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Deal Value</label>
                  <input
                    name="value"
                    placeholder="Deal Value"
                    className="form-control"
                    value={form.value}
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Assigned Leader</label>
                  <select
                    name="assigned_leader"
                    className="form-select"
                    value={form.assigned_leader}
                    onChange={handleInput}
                  >
                    <option value="">Select Leader</option>
                    {leaders.map((leader) => (
                      <option key={leader._id} value={leader._id}>
                        {leader.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Reminder Date</label>
                  <input
                    name="reminder"
                    type="date"
                    className="form-control"
                    value={form.reminder}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={submitDeal}
                >
                  Create Deal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}