import React, { useState } from 'react';

export default function Leaddetailscard() {
    const [leadData, setLeadData] = useState({
        lead: 'Truhlar And Truhlar Attys',
        value: '$45,000.00',
        status: 'Quotation',
        reminder: '2025-05-01',
        meetingType: 'Online',
        meetingLink: 'https://meet.google.com/sample',
        createdBy: 'Admin',
        assignedLeader: 'Nandini Lodha',
        assignedEmployee: 'Sage Wieser (Sample)',
        employeeEmail: 'sage-wieser@noemail.invalid',
    });

    const [isEditing, setIsEditing] = useState({});
    const [updatedValues, setUpdatedValues] = useState({ ...leadData });

    const handleEdit = (field) => {
        setIsEditing((prev) => ({ ...prev, [field]: true }));
    };

    const handleChange = (field, value) => {
        setUpdatedValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = (field) => {
        setLeadData((prevData) => ({
            ...prevData,
            [field]: updatedValues[field],
        }));
        setIsEditing((prev) => ({ ...prev, [field]: false }));
    };

    const renderEditableField = (label, field, options = {}) => {
        const {
            wrapperClass = 'text-muted small mb-1',
            link = false,
        } = options;

        return (
            <p className={wrapperClass}>
                <strong>{label}:</strong>{' '}
                {isEditing[field] ? (
                    <span className="d-flex gap-2">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            value={updatedValues[field]}
                            onChange={(e) => handleChange(field, e.target.value)}
                        />
                        <button className="btn btn-success ms-2" onClick={() => handleSave(field)}>
                            <i className="fas fa-check"></i>
                        </button>
                    </span>
                ) : link ? (
                    <a
                        href={leadData[field]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary ms-1"
                        onClick={(e) => {
                            if (e.ctrlKey || e.metaKey) return; // allow cmd/ctrl+click
                            e.preventDefault();
                            handleEdit(field);
                        }}
                    >
                        {leadData[field]}
                    </a>
                ) : (
                    <span onClick={() => handleEdit(field)}>{leadData[field]}</span>
                )}
            </p>
        );
    };
    return (
        <>
            <div className="card">
                <div className="row p-4">
                    <div className="col-md-6">
                        {renderEditableField('Lead', 'lead', { wrapperClass: 'fw-semibold mb-3 d-flex gap-2' })}
                        {renderEditableField('Value', 'value', { wrapperClass: 'text-danger fw-bold mb-3 d-flex gap-2' })}
                        {renderEditableField('Status', 'status',  { wrapperClass: 'mb-3 d-flex gap-2' })}
                        {renderEditableField('Reminder', 'reminder')}
                        {renderEditableField('Meeting Type', 'meetingType')}
                        {renderEditableField('Meeting Link', 'meetingLink', { link: true })}
                        {renderEditableField('Created By', 'createdBy')}
                        {renderEditableField('Assigned Leader', 'assignedLeader')}
                    </div>
                    <div className="col-md-6 d-flex align-items-center gap-2">
                        <img src="https://placehold.co/40" className="rounded-circle" alt="Avatar" />
                        <div>
                            {renderEditableField('Assigned Employee', 'assignedEmployee', { wrapperClass: 'mb-0' })}
                            {renderEditableField('', 'employeeEmail', { wrapperClass: 'text-muted small mb-0' })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
