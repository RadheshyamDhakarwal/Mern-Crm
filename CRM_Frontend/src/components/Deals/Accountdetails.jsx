import React, { useState } from 'react';

export default function Accountdetails() {
  const [accountData, setAccountData] = useState({
    owner: 'Nandini lodha',
    industry: 'Technology',
    employees: '23',
    contactNo: '+91-9876543210',
    address: '123 Main St',
    district: 'Jaipur',
    state: 'Rajasthan',
    revenue: '$200,000.00',
    phone: '555-555-5555',
    result: 'Pass',
    interestLevel: 'High',
    reminder: '2025-05-01',
    duration: '6 Months',
  });

  const [isEditing, setIsEditing] = useState({});
  const [updatedValues, setUpdatedValues] = useState({ ...accountData });

  const handleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field, value) => {
    setUpdatedValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (field) => {
    setAccountData((prevData) => ({
      ...prevData,
      [field]: updatedValues[field],
    }));
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  const renderEditableField = (label, field) => (
    <p className="d-flex">
      <strong className="me-3">{label}:</strong>
      {isEditing[field] ? (
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control ms-2"
            value={updatedValues[field]}
            onChange={(e) => handleChange(field, e.target.value)}
          />
          <button className="btn btn-success ms-2" onClick={() => handleSave(field)}>
            <i className="fas fa-check"></i>
          </button>
        </div>
      ) : (
        <span onClick={() => handleEdit(field)}>{accountData[field]}</span>
      )}
    </p>
  );

  return (
    <div className="card">
      <div className="row p-4">
        <div className="col-md-6">
          {renderEditableField('Account Owner', 'owner')}
          {renderEditableField('Industry', 'industry')}
          {renderEditableField('Employees', 'employees')}
          {renderEditableField('Contact No', 'contactNo')}
          {renderEditableField('Address', 'address')}
          {renderEditableField('District', 'district')}
          {renderEditableField('State', 'state')}
        </div>
        <div className="col-md-6">
          {renderEditableField('Annual Revenue', 'revenue')}
          {renderEditableField('Phone', 'phone')}
          {renderEditableField('Result', 'result')}
          {renderEditableField('Interest Level', 'interestLevel')}
          {renderEditableField('Reminder', 'reminder')}
          {renderEditableField('Duration', 'duration')}
        </div>
      </div>
    </div>
  );
}
