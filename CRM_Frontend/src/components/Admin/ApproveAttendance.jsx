import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../Loading";
import { getAllTodayInRequests, approveInRequest } from "../../http";

const ApproveAttendance = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const fetchTodayInRequests = async (selectedDate) => {
    try {
      setLoading(true);
      const [year, month, date] = selectedDate.split("-");

      const res = await getAllTodayInRequests({
        year,
        month,
        date,
      });
      // console.log(year, month, date);

      if (res.success) {
        const updatedData = res.data.map((r) => ({
          ...r,
          selectedPresent: "Present",
        }));
        // toast.success("fitered");
        setRequests(updatedData);
      } else {
        setRequests([]);
        toast.info(res.message || "No IN requests found");
      }
    } catch (error) {
      toast.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, present) => {
    try {
      const res = await approveInRequest({
        attendanceID: id,
        present,
        type: "in",
      });
      if (res.success) {
        toast.success(res.message);
        fetchTodayInRequests(filterDate); // refresh current date's list
      } else {
        toast.error(res.message || "Approval failed");
      }
    } catch (error) {
      toast.error("Error while approving");
    }
  };

  useEffect(() => {
    fetchTodayInRequests(filterDate);
  }, []);

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header d-flex justify-content-between align-items-center">
          <h1>IN Attendance Approval</h1>
          <input
            type="date"
            className="form-control w-auto"
            value={filterDate}
            onChange={(e) => {
              const newDate = e.target.value;
              setFilterDate(newDate);
              fetchTodayInRequests(newDate);
            }}
          />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="table-responsive mt-3">
            <table className="table border roundedtable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee Name</th>
                  <th>Date</th>
                  <th>In Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((att, idx) => (
                  <tr key={att._id}>
                    <td>{idx + 1}</td>
                    <td>{att.employeeID?.name}</td>
                    <td>{`${att.date}/${att.month}/${att.year}`}</td>
                    <td>
                      {att.inTime
                        ? new Date(att.inTime).toLocaleTimeString("en-IN", {
                            hour: "numeric",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })
                        : "-"}
                    </td>
                    <td>
                      <select
                        value={att.selectedPresent}
                        onChange={(e) => {
                          const updated = [...requests];
                          updated[idx].selectedPresent = e.target.value;
                          setRequests(updated);
                        }}
                        className="form-control form-control-sm"
                        disabled={att.inApproved === true}
                      >
                        <option value="Present">Present</option>
                        <option value="Half-day">Half-day</option>
                        <option value="Absent">Absent</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          if (att.inApproved === true) {
                            toast.info("Already approved");
                            return;
                          }
                          handleApprove(att._id, att.selectedPresent);
                        }}
                        className="btn btn-sm btn-success"
                        disabled={att.inApproved === true}
                      >
                        {att.inApproved === true ? "Approved" : "Approve"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default ApproveAttendance;
