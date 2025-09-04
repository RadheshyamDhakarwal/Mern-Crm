import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import { getAllTodayInRequests, approveInRequest } from '../../http';

const ApproveAttendance = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTodayInRequests = async () => {
        try {
            const res = await getAllTodayInRequests();
            if (res.success) {
                setRequests(res.data);
            }
        } catch (error) {
            toast.error("Failed to fetch requests");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id, prsent) => {
        try {

            const res = await approveInRequest({ attendanceID: id, present: prsent, type: "in", });
            if (res.success) {
                toast.success(res.message);
                fetchTodayInRequests();
            } else {
                toast.error("Approval failed");
            }
        } catch (error) {
            toast.error("Error while approving");
        }
    };

    useEffect(() => {
        fetchTodayInRequests();
    }, []);

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <div className="card">
                        <div className="card-header">
                            <h4>Today's IN Requests</h4>
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
                                        <th>In Time</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((att, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{att.employeeID?.name}</td>
                                            <td>{att.date + "/" + att.month + "/" + att.year}</td>
                                            <td>{att.inTime ? new Date(att.inTime).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }) : '-'}</td>


                                            <td>
                                                <button
                                                    onClick={() => handleApprove(att._id, "Present")}
                                                    className="btn btn-sm btn-success me-1"
                                                    disabled={att.inApproved === true}
                                                >
                                                    Present
                                                </button>
                                                <button
                                                    onClick={() => handleApprove(att._id, "half-day")}
                                                    className="btn btn-sm btn-warning me-1"
                                                    disabled={att.inApproved === true}
                                                >
                                                    Half Day
                                                </button>
                                                <button
                                                    onClick={() => handleApprove(att._id, "Absent")}
                                                    className="btn btn-sm btn-danger"
                                                    disabled={att.inApproved === true}
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
        </>
    );
};

export default ApproveAttendance;