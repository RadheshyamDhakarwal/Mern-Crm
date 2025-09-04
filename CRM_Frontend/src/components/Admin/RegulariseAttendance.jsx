import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import { getAllOutRegularizeRequests, approveInRequest } from '../../http';

const RegulariseAttendance = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // default: today's date
  });

  const fetchRegularizeOutRequests = async (selectedDate) => {
    try {
      setLoading(true);

      const [year, month, date] = selectedDate.split('-');
      const res = await getAllOutRegularizeRequests({
        year,
        month,
        date
      });

      if (res.success) {
        setRequests(res.data);
      } else {
        setRequests([]);
        toast.info(res.message || "No requests found");
      }
    } catch (error) {
      toast.error("Failed to fetch OUT regularize requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id, decision) => {
    try {
      const res = await approveInRequest({
        attendanceID: id,
        present: decision === 'approve' ? 'Present' : 'Absent',
        type: 'out'
      });

      if (res.success) {
        toast.success(`Marked as ${decision === 'approve' ? 'Present' : 'Absent'}`);
        fetchRegularizeOutRequests(filterDate); // refresh with same date
      } else {
        toast.error("Approval failed");
      }
    } catch (error) {
      toast.error("Error while approving");
    }
  };

  useEffect(() => {
    fetchRegularizeOutRequests(filterDate);
  }, []);

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header d-flex justify-content-between align-items-center">
          <h1>Pending OUT Regularize Requests</h1>
          <input
            type="date"
            className="form-control w-auto"
            value={filterDate}
            onChange={(e) => {
              const newDate = e.target.value;
              setFilterDate(newDate);
              fetchRegularizeOutRequests(newDate);
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
                      {att.outApproved ? (
                        <span className="badge bg-success">Approved</span>
                      ) : (
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleApproval(att._id, 'approve')}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleApproval(att._id, 'reject')}
                          >
                            Reject
                          </button>
                        </div>
                      )}
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
