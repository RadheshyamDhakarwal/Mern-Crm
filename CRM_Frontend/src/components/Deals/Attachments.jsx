import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

export default function Attachments() {
    const [files, setFiles] = useState([]);

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (!uploadedFile) return;

        const fileURL = URL.createObjectURL(uploadedFile);

        const newFile = {
            id: Date.now(),
            name: uploadedFile.name,
            size: (uploadedFile.size / 1024).toFixed(2) + " KB",
            date: new Date().toLocaleString(),
            uploadedBy: "Nandini lodha",
            url: fileURL,
        };

        setFiles([newFile, ...files]);
    };

    const handleDelete = (id) => {
        setFiles(files.filter((file) => file.id !== id));
    };
    return (
        <>
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <p className="fw-semibold mb-0">Attachments</p>
                    <div className="btn-group">
                        <button
                            className="btn border rounded-sm fs-xs btn-sm dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Upload <i className="bi bi-caret-down ms-2"></i>
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <label className="dropdown-item" htmlFor="fileUpload" style={{ cursor: "pointer" }}>
                                    <i className="bi bi-cloud-arrow-up me-2"></i> Upload file
                                </label>
                                <input
                                    id="fileUpload"
                                    type="file"
                                    hidden
                                    onChange={handleFileUpload}
                                />
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="p-4">
                    {files.length === 0 ? (
                        <p className="text-muted">No Attachment</p>
                    ) : (
                        <div className="">
                            <table className="table border align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>File Name</th>
                                        <th>Attached By</th>
                                        <th>Date Added</th>
                                        <th>Size</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {files.map((file) => (
                                        <tr key={file.id}>
                                            <td>
                                                <div className="d-flex gap-2 align-items-center">
                                                    <i className="bi bi-image me-2"></i>
                                                    <a
                                                        className="text-decoration-none text-dark"
                                                        href={file.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {file.name}
                                                    </a>
                                                </div>
                                            </td>
                                            <td>{file.uploadedBy}</td>
                                            <td>{file.date}</td>
                                            <td>{file.size}</td>
                                            <td className="text-end">
                                                <Dropdown>
                                                    <Dropdown.Toggle
                                                        variant="light"
                                                        size="sm"
                                                        className="border-0 shadow-none"
                                                        style={{ boxShadow: "none", visibility: "visible" }} // Change to "hidden" if needed
                                                    >
                                                        <i className="bi bi-three-dots-vertical"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href={file.url} target="_blank">
                                                            View
                                                        </Dropdown.Item>
                                                        <Dropdown.Item href={file.url} download={file.name}>
                                                            Download
                                                        </Dropdown.Item>
                                                        <Dropdown.Item onClick={() => handleDelete(file.id)}>
                                                            Delete
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
