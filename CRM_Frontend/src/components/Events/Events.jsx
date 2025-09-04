import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "./Calendar"; // Assuming this is your calendar component
import api from "../../http";
import { toast } from "react-toastify";
import { FcLandscape } from "react-icons/fc";
import { useSelector } from "react-redux";

export default function Events() {
  const { user } = useSelector((state) => state.authSlice);
  console.log(user?.user?.type);

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [errors, setErrors] = useState({});

  const [isloading, setloading] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: null,
  });

  const validateForm = () => {
    const newErrors = {};

    if (!newEvent.title.trim()) newErrors.title = "Title is required";
    if (!newEvent.type.trim()) newErrors.type = "Type is required";
    if (!newEvent.date.trim()) newErrors.date = "Date is required";
    if (!newEvent.time.trim()) newErrors.time = "Time is required";
    if (!newEvent.location.trim()) newErrors.location = "Location is required";
    if (!newEvent.description.trim())
      newErrors.description = "Description is required";
    // if (!newEvent.image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fetch events for the selected date
  const fetchEventsByDate = (date) => {
    api
      .get(`https://api.sevenunique.com/api/task/events/${date}`) // Ensure your backend supports this endpoint
      .then((response) => {
        setEvents(response.data); // Assuming response contains the events data
      })
      .catch((error) => {
        console.error("Error fetching events for selected date:", error);
      });
  };

  // Handle date selection from the calendar
  const handleDateSelect = (date) => {
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    setSelectedDate(dateString); // Set the selected date as a string (YYYY-MM-DD format)
    fetchEventsByDate(dateString); // Fetch events for the selected date from the backend
  };

  // Handle input change for new event
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  // Handle image change for new event
  const handleImageChange = (e) => {
    setNewEvent({
      ...newEvent,
      image: e.target.files[0],
    });
  };

  // Submit new event to API
  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const formData = new FormData();
    formData.append("title", newEvent.title);
    formData.append("type", newEvent.type);
    formData.append("date", newEvent.date);
    formData.append("time", newEvent.time);
    formData.append("location", newEvent.location);
    formData.append("description", newEvent.description);
    formData.append("image", newEvent?.image);
    setloading(true);

    api
      .post("task/events", formData) // Replace with your API endpoint
      .then((response) => {
        console.log(response.data);

        setEvents([...events, response.data]); // Add new event to state
        setNewEvent({
          title: "",
          type: "",
          date: "",
          time: "",
          location: "",
          description: "",
          image: null,
        }); // Reset form
        toast.success(response?.message);
        setErrors({}); // reset errors
        // Optionally close modal programmatically
        setTimeout(() => {
          document.getElementById("exampleModal").classList.remove("show");
          setloading(false);
        }, 1500);
      })
      .catch((error) => {
        console.error("Error adding event:", error);
        setloading(false);
      })
      .finally(setloading(false));
  };

  return (
    <>
      <div className="main-content">
        <div className="container mb-4">
          <div className="row">
            <div className="col-md-4">
              <div className="searchbox">
                <i className="bi bi-search"></i>
                <input type="search" placeholder="Search" />
              </div>
              {/* Pass the date selection handler to the Calendar */}
              <Calendar onDateSelect={handleDateSelect} />
              {/* <div className="weeklyEvents">
                <h2>Weekly Essentials</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequuntur, doloremque. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Consequuntur, doloremque.
                </p>
              </div> */}
            </div>
            <div className="col-md-8">
              <div className="sideevnts">
                {user?.user?.type == "Admin" && (
                  <div className="d-flex justify-content-between align-items-center">
                    <h1>{selectedDate ? selectedDate : "Select a date"}</h1>
                    <div className="fvrtevent">
                      <span className="badge bg-label-primary rounded-5 me-3">
                        <i className="bi bi-star-fill me-2"></i>Favorite
                      </span>
                      <span
                        className="badge bg-label-warning rounded-5 cursor-pointer"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        style={{ cursor: "pointer" }}
                      >
                        <i className="bi bi-calendar2-event me-2"></i>Add Event
                      </span>
                    </div>
                  </div>
                )}
                <div className="card rounded-4">
                  <div className="card-body">
                    {/* Render filtered events for the selected date */}
                    {events?.length > 0 ? (
                      events.map((event, index) => (
                        <div key={index} className="row align-items-stretch">
                          <div className="col-md-6 d-flex justify-content-center align-items-center">
                            {event?.image ? (
                              <img
                                src={`${event?.image}`}
                                alt=""
                                className="img-fluid rounded-4 w-100 h-100 object-fit-cover"
                              />
                            ) : (
                              <FcLandscape size={50} />
                            )}
                          </div>
                          <div className="col-md-6 d-flex flex-column justify-content-between gap-4 py-3">
                            <div className="toptitle">
                              <span className="badge bg-label-info rounded-5">
                                <i className="bi bi-calendar2-event-fill me-2"></i>{" "}
                                {event?.type}
                              </span>
                            </div>
                            <div className="eventsTitle">
                              <h2>{event?.title}</h2>
                              <p className="description">
                                {event?.description}
                              </p>
                            </div>
                            <div className="eventsdate">
                              <div>
                                <span className="fw-semibold">
                                  <i className="bi bi-calendar2-event"></i>
                                </span>{" "}
                                <span>
                                  {event?.date
                                    ? new Date(event.date).toLocaleDateString(
                                        "en-IN"
                                      )
                                    : ""}
                                </span>
                                <span className="fw-semibold ms-3">
                                  <i className="bi bi-clock"></i>
                                </span>{" "}
                                <span>{event?.time}</span>
                              </div>
                              <span className="fw-semibold">
                                <i className="bi bi-geo"></i>
                              </span>{" "}
                              <span>{event?.location}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No events found for this date.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for adding new events */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                New Event
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEventSubmit}>
                {/* Form inputs for event creation */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="eventTitle" className="form-label">
                      Event Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="eventTitle"
                      name="title"
                      value={newEvent.title}
                      onChange={handleInputChange}
                      placeholder="Enter event title"
                    />
                    {errors.title && (
                      <div className="text-danger small">{errors.title}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="eventType" className="form-label">
                      Event Type
                    </label>
                    <select
                      className={`form-select ${
                        errors.type ? "is-invalid" : ""
                      }`}
                      id="eventType"
                      name="type"
                      value={newEvent.type}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Type</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Webinar">Webinar</option>
                      <option value="Meeting">Meeting</option>
                    </select>
                    {errors.type && (
                      <div className="text-danger small">{errors.type}</div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="eventDate" className="form-label">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      id="eventDate"
                      name="date"
                      value={newEvent.date}
                      min={new Date().toISOString().split("T")[0]} // 🔐 restrict to today or future
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="eventTime" className="form-label">
                      Time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="eventTime"
                      name="time"
                      value={newEvent.time}
                      onChange={handleInputChange}
                    />
                    {errors.time && (
                      <div className="text-danger small">{errors.time}</div>
                    )}
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="eventLocation" className="form-label">
                      Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="eventLocation"
                      name="location"
                      value={newEvent.location}
                      onChange={handleInputChange}
                      placeholder="Enter event location"
                    />
                    {errors.location && (
                      <div className="text-danger small">{errors.location}</div>
                    )}
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="eventImage" className="form-label">
                      Event Image
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="eventImage"
                      name="image"
                      onChange={handleImageChange}
                    />
                    {/* {errors.image && (
                      <div className="text-danger small">{errors.image}</div>
                    )} */}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="eventDescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="eventDescription"
                    name="description"
                    value={newEvent.description}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Describe the event"
                  ></textarea>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn px-4 bg-label-danger rounded-sm"
                    data-bs-dismiss="modal"
                    disabled={isloading}
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    className="btn bg-label-success rounded-sm d-flex align-items-center gap-2"
                  >
                    {isloading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Saving...
                      </>
                    ) : (
                      "Save changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
