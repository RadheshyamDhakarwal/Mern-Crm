import { useState } from "react";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import { applyforleave } from "../../http";
import Modal from "../../components/modal/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";

const ApplyForLeave = () => {
  const { user } = useSelector((state) => state.authSlice);
  const initialState = {
    title: "",
    type: "",
    period: "",
    startDate: "",
    endDate: "",
    reason: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 10);
  const formattedMax = maxDate.toISOString().split("T")[0];

  const inputEvent = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "period" || name === "startDate") {
        const period = parseInt(updated.period - 1);
        const start = new Date(updated.startDate);

        if (!isNaN(period) && updated.startDate) {
          const end = new Date(start);
          end.setDate(start.getDate() + period);
          updated.endDate = end.toISOString().split("T")[0];
        }
      }

      return updated;
    });

    let newErrors = { ...errors };

    if (name === "title") {
      newErrors.title =
        value.length < 10 ? "Title must be at least 10 characters" : "";
    } else if (name === "period") {
      if (!/^[0-9]*$/.test(value)) {
        newErrors.period = "Only numbers allowed";
      } else if (Number(value) < 1) {
        newErrors.period = "Period must be at least 1 day";
      } else {
        newErrors.period = "";
      }
    } else if (!value) {
      newErrors[name] = `${name} is required`;
    } else {
      newErrors[name] = "";
    }

    setErrors(newErrors);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { title, type, startDate, endDate, reason, period } = formData;

    let newErrors = {};

    if (!title || title.length < 10)
      newErrors.title = "Title must be at least 10 characters";
    if (!period || !/^[0-9]+$/.test(period))
      newErrors.period = "Period must be numeric";
    if (!type) newErrors.type = "Leave type is required";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!endDate) newErrors.endDate = "End date is required";
    if (!reason) newErrors.reason = "Reason is required";
    if (period > 10) {
      toast.error("maximum allowed period under 10");
      return;
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e)) return;

    setIsSubmitting(true);

    try {
      const d = new Date();
      formData["applicantID"] = user.user.id;
      formData["appliedDate"] = `${d.getFullYear()}-${
        d.getMonth() + 1
      }-${d.getDate()}`;

      const res = await applyforleave(formData);

      if (res.success) {
        toast.success("Leave Application Sent!");
        setFormData(initialState);
      } else {
        toast.error(res?.error?.errors?.period?.message);
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }

    setIsSubmitting(false);
  };
  const getMinEndDate = (startDate) => {
    if (!startDate) return formattedToday;

    const dt = new Date(startDate);
    dt.setDate(dt.getDate() + 1); // add 1 day
    return dt.toISOString().split("T")[0];
  };

  return (
    <>
      <div className="main-content">
        <section className="section">
          <HeaderSection title="Apply for Leave" />
          <div className="">
            <div className="card-body">
              <form className="row" onSubmit={onSubmit} id="addUserForm">
                <div className="form-group col-md-4">
                  <label>Enter Title</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fas fa-pen"></i>
                      </div>
                    </div>
                    <input
                      onChange={inputEvent}
                      value={formData.title}
                      type="text"
                      id="title"
                      name="title"
                      className="form-control"
                    />
                  </div>
                  {errors.title && (
                    <small className="text-danger">{errors.title}</small>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Leave Type</label>
                  <select
                    name="type"
                    onChange={inputEvent}
                    value={formData.type}
                    className="form-control select2"
                  >
                    <option value="">Select</option>
                    <option>Sick Leave</option>
                    <option>Casual Leave</option>
                    <option>Emergency Leave</option>
                  </select>
                  {errors.type && (
                    <small className="text-danger">{errors.type}</small>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Enter Period</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fas fa-pen"></i>
                      </div>
                    </div>
                    <input
                      onChange={inputEvent}
                      value={formData.period}
                      type="text"
                      id="period"
                      name="period"
                      className="form-control"
                    />
                  </div>
                  {errors.period && (
                    <small className="text-danger">{errors.period}</small>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Start Date</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fa fa-calendar"></i>
                      </div>
                    </div>
                    <input
                      onChange={inputEvent}
                      value={formData.startDate}
                      type="date"
                      id="startDate"
                      name="startDate"
                      className="form-control"
                      min={formattedToday}
                      max={formattedMax}
                    />
                  </div>
                  {errors.startDate && (
                    <small className="text-danger">{errors.startDate}</small>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>End Date</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fa fa-calendar"></i>
                      </div>
                    </div>
                    <input
                      onChange={inputEvent}
                      value={formData.endDate}
                      type="date"
                      id="endDate"
                      name="endDate"
                      className="form-control"
                      min={getMinEndDate(formData.startDate)}
                      max={formattedMax}
                      readOnly
                    />
                  </div>
                  {errors.endDate && (
                    <small className="text-danger">{errors.endDate}</small>
                  )}
                </div>

                <div className="form-group col-md-12 ">
                  <label>Enter Reason</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fas fa-book"></i>
                      </div>
                    </div>
                    <textarea
                      rows={4}
                      onChange={inputEvent}
                      value={formData.reason}
                      type="text"
                      id="reason"
                      name="reason"
                      className="form-control"
                    />
                  </div>
                  {errors.reason && (
                    <small className="text-danger">{errors.reason}</small>
                  )}
                </div>

                <div className="form-group col-md-3">
                  <button
                    className="btn btn-primary btn-lg"
                    type="submit"
                    disabled={isSubmitting}
                    style={{ width: "30vh" }}
                  >
                    {isSubmitting ? "Submitting..." : "Apply Leave"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ApplyForLeave;
