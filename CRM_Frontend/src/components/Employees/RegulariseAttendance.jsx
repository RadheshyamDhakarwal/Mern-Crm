import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import { getAllOutRegularizeRequests,approveInRequest } from '../../http';

const RegulariseAttendance = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRegularizeOutRequests = async () => {
    try {
      const res = await getAllOutRegularizeRequests();
      if (res.success) {
        setRequests(res.data);
      }
    } catch (error) {
      toast.error("Failed to fetch OUT regularize requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id,prsent) => {
      try {
        const res = await approveInRequest({ attendanceID: id,present:prsent , type: "out", });
        if (res.success) {
          toast.success(res.message);
          fetchRegularizeOutRequests();
        } else {
          toast.error("Approval failed");
        }
      } catch (error) {
        toast.error("Error while approving");
      }
    };

  useEffect(() => {
    fetchRegularizeOutRequests();
  }, []);

  return (
    <div className="main-content">
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h4>Pending OUT Regularize Requests</h4>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="table-responsive">
            <table className="table border roundedtable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee Name</th>
                  <th>Date</th>
                  <th>IN Time</th>
                  <th>OUT Time</th>
                  <th>Reason</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((att, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{att.employeeID?.name}</td>
                    <td>{att.date}/{att.month}/{att.year}</td>
                    <td>{att.inTime ? new Date(att.inTime).toLocaleTimeString('en-IN') : '-'}</td>
                    <td>{att.outTime ? new Date(att.outTime).toLocaleTimeString('en-IN') : '-'}</td>
                    <td>{att.regularizeReason || 'N/A'}</td>
                    <td>
  <button
    onClick={() => handleApprove(att._id, "Present")}
    className="btn btn-sm btn-success me-1"
    disabled={att.outApproved === true}
  >
    Present
  </button>
  <button
    onClick={() => handleApprove(att._id, "half-day")}
    className="btn btn-sm btn-warning me-1"
    disabled={att.outApproved === true}
  >
    Half Day
  </button>
  <button
    onClick={() => handleApprove(att._id, "Absent")}
    className="btn btn-sm btn-danger"
    disabled={att.outApproved === true}
  >
    Absent
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

export default RegulariseAttendance;