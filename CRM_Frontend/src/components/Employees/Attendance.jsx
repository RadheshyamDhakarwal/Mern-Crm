import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  markInAttendance,
  markOutAttendance,
  viewEmployeeAttendance,
  regularizeRequest
} from '../../http';
import Loading from '../Loading';

const Attendance = () => {
  const { user } = useSelector(state => state.authSlice);

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [attendance, setAttendance] = useState([]);
  const [inMarked, setInMarked] = useState(false);
  const [outMarked, setOutMarked] = useState(false);
  const [showRegularizeModal, setShowRegularizeModal] = useState(false);
  const [regularizeReason, setRegularizeReason] = useState('');

  useEffect(() => {
    const dt = new Date();
    const iso = dt.toISOString().split("T")[0];
    setFromDate(iso);
    setToDate(iso);
  
    const fetch = async () => {
      const res = await viewEmployeeAttendance({
        employeeID: user.user.id,
        fromDate: iso,
        toDate: iso
      });
  
      if (res.success && Array.isArray(res.data)) {
        const today = res.data.find(att => {
          return (
            att.date === dt.getDate() &&
            att.month === dt.getMonth() + 1 &&
            att.year === dt.getFullYear()
          );
        });
  
        if (today?.inTime) setInMarked(true);
        if (today?.outTime) setOutMarked(true);
        setAttendance(res.data);
      } else {
        setAttendance([]); // fallback
      }
    };
  
    fetch();
  }, []);

  const handleMarkIn = async () => {
    try {
      const res = await markInAttendance({ employeeID: user.user.id });
      if (res.success) {
        toast.success(res.message);
        setInMarked(true);
      } else {
        toast.error(res.message || "Failed to mark in.");
      }
    } catch (error) {
      toast.error("Error marking in");
    }
  };

  const handleMarkOut = async () => {
    try {
      const res = await markOutAttendance({ employeeID: user.user.id });

      if (res.success) {
        toast.success(res.message);
        setOutMarked(true);
      } else if (res.needRegularize) {
        toast.info(res.message || "Please fill reason to regularize early OUT.");
        setShowRegularizeModal(true);
      } else {
        toast.error(res.message || "Failed to mark out.");
      }
    } catch (error) {
      toast.error("Error marking out");
    }
  };

  const submitRegularizeRequest = async () => {
    if (!regularizeReason.trim()) {
      toast.warning("Please enter a reason.");
      return;
    }

    try {
      const res = await regularizeRequest({
        employeeID: user.user.id,
        regularizeReason
      });
        console.log(res);
        
      if (res.success) {
        toast.success("Regularize request sent to HR!");
        setShowRegularizeModal(false);
        setOutMarked(true);
      } else {
        toast.error(res.message || "Failed to submit regularize request.");
      }
    } catch (error) {
      toast.error("Error submitting regularize request");
    }
  };

  const searchAttendance = async () => {
    const obj = {
      employeeID: user.user.id,
      fromDate,
      toDate,
      status: statusFilter
    };
    const res = await viewEmployeeAttendance(obj);
    setAttendance(res.data);
  };

  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="p-2 ps-0">
            <div className="section-header ps-0 d-flex justify-content-between mb-2 mt-0">
              <h1>Attendance</h1>
              <div className="d-flex gap-2">
                <button
                  className="btn bg-label-success"
                  onClick={handleMarkIn}
                  disabled={inMarked}
                >
                  {inMarked ? "In Marked" : "Mark In"}
                </button>
                <button
                  className="btn bg-label-danger"
                  onClick={handleMarkOut}
                  disabled={outMarked}
                >
                  {outMarked ? "Out Marked" : "Mark Out"}
                </button>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="row my-3">
            <div className="col-md-4">
              <label>From</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label>To</label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label>Status</label>
              <select
                className="form-control"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Half-day">Half Day</option>
              </select>
            </div>
            <div className="col-md-3 mt-3 d-flex align-items-end">
              <button onClick={searchAttendance} className="btn btn-primary w-100">
                Search
              </button>
            </div>
          </div>
        </section>

        <div className="table-responsive mt-3">
          <table className="table border roundedtable">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Day</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance?.map((att, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{att.date + "/" + att.month + "/" + att.year}</td>
                  <td>{att.day}</td>
                  <td>
                    <span className={`badge ${
                      att.present === 'Present' ? 'badge-success' :
                      att.present === 'Half-day' ? 'badge-info' :
                      'badge-danger'
                    }`}>
                      {att.present}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regularize Modal */}
      {showRegularizeModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Regularize OUT</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowRegularizeModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Please provide a reason for early OUT:</p>
                <textarea
                  className="form-control"
                  rows="4"
                  value={regularizeReason}
                  onChange={(e) => setRegularizeReason(e.target.value)}
                  placeholder="Enter your reason..."
                ></textarea>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowRegularizeModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={submitRegularizeRequest}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Attendance;
