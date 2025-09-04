import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../http';

const MeetingModal = ({
    isOpen,
    onClose,
    selectedDealId,
    selectedEmployee,
    onMeetingSuccess
}) => {
    const [title, setTitle] = useState('');
    const [venue, setVenue] = useState('Client location');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('17:00');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('17:30');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Set default dates to today when component mounts
    useState(() => {
        const today = new Date().toISOString().split('T')[0];
        setStartDate(today);
        setEndDate(today);
    }, []);

    const localUser = JSON.parse(localStorage.getItem("user"));
    const employeeID = selectedEmployee || localUser?.id;

const handleSave = async () => {
    if (!title.trim()) {
        toast.error('Please enter a meeting title');
        return;
    }
    setIsSubmitting(true);

    const meetingData = {
        title,
        venue,
        location,
        startDate,
        startTime,
        endDate,
        endTime,
        dealId: selectedDealId,
        employeeID
    };

    try {
        const response = await api.post('https://api.sevenunique.com/api/task/meetings/create', meetingData);
        toast.success('Meeting created successfully!');

        // Reset form fields
        setTitle('');
        setVenue('Client location');
        setLocation('');
        const today = new Date().toISOString().split('T')[0];
        setStartDate(today);
        setStartTime('17:00');
        setEndDate(today);
        setEndTime('17:30');

        // Trigger parent callback
        if (onMeetingSuccess) {
            onMeetingSuccess();
        }

        onClose(); // Close modal
    } catch (error) {
        console.error('Error saving meeting:', error?.response?.data?.message || error.message);
        toast.error(error.response?.data?.message || 'Failed to create meeting');
    } finally {
        setIsSubmitting(false);
    }
};

    if (!isOpen) return null;

    return (
        <div className="modal fade show d-block" role="dialog" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Schedule Meeting</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                            disabled={isSubmitting}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Title*</label>
                            <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Venue</label>
                            <select
                                className="form-select"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                                disabled={isSubmitting}
                            >
                                <option value="Client location">Client location</option>
                                <option value="Office">Office</option>
                                <option value="Online">Online</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                disabled={isSubmitting}
                                placeholder={venue === 'Online' ? 'Meeting link' : 'Physical address'}
                            />
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Start Date & Time*</label>
                                <div className="d-flex gap-2">
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        disabled={isSubmitting}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">End Date & Time*</label>
                                <div className="d-flex gap-2">
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        disabled={isSubmitting}
                                        min={startDate}
                                    />
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSave}
                            disabled={isSubmitting || !title.trim()}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Saving...
                                </>
                            ) : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetingModal;