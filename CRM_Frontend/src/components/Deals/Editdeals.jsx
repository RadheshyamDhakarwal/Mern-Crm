import React, { useState } from "react";
import Attachments from "./Attachments";
import Accountdetails from "./Accountdetails";
import Leaddetailscard from "./Leaddetailscard";
const tabs = [
    { name: "Overview", icon: "fas fa-inbox", count: 12, badgeColor: "primary" },
    // { name: "Timeline", icon: "fas fa-pencil-alt" },
];
const CRMAccountDetails = () => {
    const [activeTab, setActiveTab] = useState("Archived");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <div className="main-content ">

            <div className="container p-6 space-y-6 bg-gray-50 min-h-screen">
                {/* Header Section */}
                <div className="card my-3  flex items-center justify-between ">
                    <div className="grid grid-cols-2 gap-4 p-4 d-flex justify-content-between align-items-center">
                        <h1 className="fs-6 mb-0 fw-bold font-semibold">Truhlar And Truhlar (Sample)</h1>
                        <div className="space-x-2">
                            <button className="mb-1 badge  bg-primary-subtle text-primary border-0 me-2 rounded-0">Edit</button>
                            <button className="mb-1 badge  bg-success-subtle text-success border-0 me-2 rounded-0">Send Email</button>
                        </div>
                    </div>
                </div>
                {/* Tabs */}
                <div className="d-flex mb-3 align-items-center gap-4 bg-white p-3 rounded shadow-sm">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`btn d-flex align-items-center gap-2 px-2 py-1 border-2 fw-semibold text-dark border-bottom  rounded-0  position-relative ${activeTab === tab.name ? "fw-semibold text-dark border-bottom border-2 border-dark" : "text-secondary"
                                }`}
                        >
                            <i className={tab.icon}></i>
                            <span>{tab.name}</span>
                            {tab.count !== undefined && (
                                <span className={`badge rounded-pill bg-${tab.badgeColor || "light"} ms-1`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
                {/* Account Details */}
                <Accountdetails />
                {/* Deal Summary with All Static Fields from Schema */}
               <Leaddetailscard />

                {/* Notes Section */}
                <div className="card">
                    <div className="p-4 space-y-2">
                        <p className="font-semibold">Notes</p>
                        <input
                            type="text"
                            placeholder="Add a note..."
                            className="border border-gray-300 p-2 rounded-md w-full"
                        />
                    </div>
                </div>

                {/* Open Tasks */}
                <div className="card">
                    <div className="p-4">
                        <p className="font-semibold mb-3">Open Tasks</p>
                        <div className="table-responsive">
                            <table className="table border  mb-0">
                                <thead className="bg-white">
                                    <tr>
                                        <th>#</th>
                                        <th>Task</th>
                                        <th>Assigned To</th>
                                        <th>Status</th>
                                        <th>Priority</th>
                                        <th>Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Refer CRM Videos</td>
                                        <td>Nandini Lodha</td>
                                        <td><span className="badge bg-warning text-dark">In Progress</span></td>
                                        <td><span className="badge bg-danger">High</span></td>
                                        <td>2025-05-01</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Follow up with client</td>
                                        <td>Rohan Mehta</td>
                                        <td><span className="badge bg-secondary">Pending</span></td>
                                        <td><span className="badge bg-primary">Medium</span></td>
                                        <td>2025-05-05</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                {/* Other Sections as Empty States */}
                <Attachments />

                <div className="card">
                    <div className="p-4">
                        <p className="font-semibold">Products</p>
                        <button className="border border-gray-300 py-2 px-4 rounded-md text-sm" onClick={handleShow}>Add Products</button>
                    </div>
                </div>

                <div className="card">
                    <div className="p-4">
                        <p className="font-semibold">Social</p>
                        <p className="text-sm text-gray-400">
                            You cannot search a profile in Facebook. This has to be associated from the Social Tab
                        </p>
                    </div>
                </div>
            </div>
            {show && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-fullscreen-lg-down modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalCenterTitle">Add Product</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleClose}
                                    aria-label="Close"
                                ><i class="bi bi-x"></i></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col mb-4">
                                        <label htmlFor="nameWithTitle" className="form-label">Product Name</label>
                                        <input
                                            type="text"
                                            id="nameWithTitle"
                                            className="form-control"
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                </div>
                                <div className="row g-4">
                                    <div className="col mb-0">
                                        <label htmlFor="emailWithTitle" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            id="emailWithTitle"
                                            className="form-control"
                                            placeholder="xxxx@xxx.xx"
                                        />
                                    </div>
                                    <div className="col mb-0">
                                        <label htmlFor="dobWithTitle" className="form-label">DOB</label>
                                        <input type="date" id="dobWithTitle" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-label-secondary mt-2"
                                    onClick={handleClose}
                                >
                                    Close
                                </button>
                                <button type="button" className="mb-1 badge fs-6 fw-normal bg-primary-subtle text-primary border-0 me-2 rounded-0">
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Optional backdrop */}
            {show && <div className="modal-backdrop fade show"></div>}
        </div>

    );
};

export default CRMAccountDetails;
