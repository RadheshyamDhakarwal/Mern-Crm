import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  viewEmployeeAttendanceAdmin,
  getEmployees,
  getLeaders
} from '../../http';
import Loading from '../Loading';

const EmployeeAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const dt = new Date();
    const iso = dt.toISOString().split("T")[0];
    setFromDate(iso);
    setToDate(iso);

    const fetchEmployees = async () => {
      try {
        const empRes = await getEmployees();
        const leaderRes = await getLeaders();
        const all = [...empRes.data, ...leaderRes.data];
        console.log(all);
        
        setEmployees(all);
        if (all.length > 0) setSelectedEmployee(all.id); // default 1st employee
      } catch {
        toast.error("Failed to fetch employee list");
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (!selectedEmployee) return;
    const fetchAttendance = async () => {
      const res = await viewEmployeeAttendanceAdmin({
        employeeID: selectedEmployee,
        fromDate,
        toDate,
        status: statusFilter
      });
      if (res.success) {
        setAttendance(res.data);
      } else {
        setAttendance([]);
      }
    };

    fetchAttendance();
  }, [selectedEmployee, fromDate, toDate, statusFilter]);

  return (
    <>
      <div className="main-content">
        <section className="section">
            <div className="section-header ps-0">
              <h1>Employee Attendance</h1>
          </div>

          {/* Filter Controls */}
          <div className="row my-3">
            <div className="col-md-3">
              <label>Employee</label>
              <select
                className="form-control"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option value="" disabled>Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label>From</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label>To</label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label>Status</label>
              <select
                className="form-control"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="half-day">Half Day</option>
                <option value="Approvel">Approval Pending</option>
              </select>
            </div>
          </div>
          <div className="table-responsive">
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Day</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length > 0 ? (
                attendance.map((att, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{att.date + '/' + att.month + '/' + att.year}</td>
                    <td>{att.day}</td>
                    <td>
                      <span className={`badge ${
                        att.present === 'Present' ? 'badge-success' :
                        att.present === 'Approvel' ? 'badge-warning' :
                        att.present === 'half-day' ? 'badge-info' :
                        'badge-danger'
                      }`}>
                        {att.present || 'Absent'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4}>No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        </section>

        
      </div>
    </>
  );
};

export default EmployeeAttendance;