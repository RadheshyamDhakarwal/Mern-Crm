import React, { useState } from 'react';

const Calendar = ({ onDateSelect }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const getStartDay = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Adjust so Monday = 0
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selected);
    onDateSelect(selected); // Pass the selected date to the parent component
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDay(year, month);

  const calendarDays = Array.from({ length: startDay + daysInMonth }, (_, i) =>
    i < startDay ? null : i - startDay + 1
  );

  return (
    <div className="p-4 rounded-4 shadow-sm bg-white w-100">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <button className="btn btn-link text-dark p-0" onClick={handlePrevMonth}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <h6 className="mb-0 text-center fw-semibold">
          {monthNames[month]} {year}
        </h6>
        <button className="btn btn-link text-dark p-0" onClick={handleNextMonth}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center small fw-semibold text-secondary pb-2">{day}</div>
        ))}
        {calendarDays.map((day, idx) => (
          <div key={idx} className="text-center mb-2 my-3">
            {day ? (
              <button
                className={`btn btn-sm rounded-circle ${selectedDate.getDate() === day &&
                  selectedDate.getMonth() === month &&
                  selectedDate.getFullYear() === year
                  ? 'btn-primary text-white'
                  : 'btn-light text-dark'
                }`}
                style={{ width: '32px', height: '32px' }}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </button>
            ) : (
              <div style={{ height: '32px' }}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
