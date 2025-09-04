import React, { useEffect, useState } from "react";
import { getEmployees, getLeaders, viewassest } from "../../http";
import { useHistory } from "react-router-dom";
import Loading from "../Loading";

const AssestView = () => {
  const [type, setType] = useState();
  const [status, setStatus] = useState();
  const [appliedDate, setAppliedDate] = useState();
  const [applications, setApplications] = useState();
  const history = useHistory();
  const [employees, setEmployees] = useState();
  const [employeeMap, setEmployeeMap] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState();

  useEffect(() => {
    let empObj = {};
    const fetchData = async () => {
      const res = await viewassest({});
      const { data } = res;
      setApplications(data);
    };

    const fetchEmployees = async () => {
      const emps = await getEmployees();
      const leaders = await getLeaders();
      emps.data.forEach(
        (employee) => (empObj[employee.id] = [employee.name, employee.email])
      );
      leaders.data.forEach(
        (leader) => (empObj[leader.id] = [leader.name, leader.email])
      );
      setEmployeeMap(empObj);
      setEmployees([...emps.data, ...leaders.data]);
    };

    fetchData();
    fetchEmployees();
  }, []);

  const searchLeaveApplications = async () => {
    const obj = {};

    if (selectedEmployee) {
      obj["applicantID"] = selectedEmployee;
    }

    if (type) {
      obj["type"] = type;
    }
    if (status) {
      obj["adminResponse"] = status;
    }
    if (appliedDate) {
      obj["appliedDate"] = appliedDate;
    }

    console.log(obj);

    const res = await viewassest(obj);
    const { data } = res;
    setApplications(data);

    setAppliedDate("");
    setType("");
    setStatus("");
  };

  return (
    <>
      {applications ? (
        <div className="main-content">
          <section className="section">
            <div className="section-header d-flex justify-content-between">
              <h1>Assest Applications</h1>
            </div>

            <div className="d-flex justify-content-center align-items-center w-100">
              <div className="form-group col-md-2">
                <label>Employee</label>
                <select
                  className="form-control select2"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  <option value="">Employees</option>
                  {employees?.map((employee) => (
                    <option key={employee._id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-md-2">
                <label>Leave Type</label>
                <select
                  name="type"
                  onChange={(e) => setType(e.target.value)}
                  className="form-control select2"
                >
                 <option>Upgrade</option>
                                <option>new Assest</option>
                                <option>Repair</option>
                                <option> other</option>
                  
                </select>
              </div>
              <div className="form-group col-md-2">
                <label>Status</label>
                <select
                  name="type"
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-control select2"
                >
                  <option>Select</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>

              <div className="form-group col-md-4">
                <label>Applied Date</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i class="fa fa-calendar"></i>
                    </div>
                  </div>
                  <input
                    onChange={(e) => setAppliedDate(e.target.value)}
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="form-control"
                  ></input>
                </div>
              </div>

              <button
                onClick={searchLeaveApplications}
                className="btn btn-lg btn-primary col"
              >
                Search
              </button>
            </div>
            <div className="table-responsive">
            <table className="table border roundedtable table-md center-text">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="sidebar-wrapper">
                {applications?.map((application, idx) => (
                  <tr
                    className="hover-effect"
                    onClick={() => history.push(`assest/${application._id}`)}
                  >
                    <td>{idx + 1}</td>
                    <td>
                      {employeeMap?.[application.applicantID]?.[0] || "N/A"}
                    </td>
                    <td>
                      {employeeMap?.[application.applicantID]?.[1] || "N/A"}
                    </td>
                    <td>{application?.type}</td>
                    <td>{application.title}</td>
                    <td>{application.appliedDate}</td>
                    <td
                      className={`${
                        application.adminResponse === "Rejected"
                          ? "text-danger"
                          : application.adminResponse === "Pending"
                          ? "text-primary"
                          : "text-success"
                      }`}
                    >
                      {application.adminResponse}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </section>
          
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AssestView;
