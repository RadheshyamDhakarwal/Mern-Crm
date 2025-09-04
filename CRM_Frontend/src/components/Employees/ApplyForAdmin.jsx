import { useState } from "react";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import { applyforassest } from "../../http";
import { useSelector } from "react-redux";

const ApplyForAdmin = () => {
  const { user } = useSelector((state) => state.authSlice);
  const initialState = {
    title: "",
    type: "",
    period: "",
    startDate: "",
    reason: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let newErrors = { ...errors };
    newErrors[name] = value ? "" : `${name} is required`;
    setErrors(newErrors);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { title, type, period, startDate, reason } = formData;
    let newErrors = {};

    if (!title) newErrors.title = "Title is required";
    if (!type) newErrors.type = "Type is required";
    if (!period) newErrors.period = "Asset name is required";
    if (!startDate) newErrors.startDate = "Date is required";
    if (!reason) newErrors.reason = "Reason is required";

    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;

    setIsSubmitting(true);

    try {
      const d = new Date();
      formData["applicantID"] = user.user.id;
      formData["appliedDate"] = `${d.getFullYear()}-${
        d.getMonth() + 1
      }-${d.getDate()}`;

      const res = await applyforassest(formData);

      if (res.success) {
        toast.success("Asset Request Sent!");
        setFormData(initialState);
        setErrors({});
      } else {
        toast.error(res?.error?.message || "Submission failed.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="main-content">
      <section className="section">
        <HeaderSection title="Apply for Asset" />
        <div className="card">
          <div className="card-body pr-5 pl-5 m-1">
            <form className="row" onSubmit={onSubmit} id="addUserForm">
              <div className="form-group col-md-4">
                <label>Enter Title</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-pen" />
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
                <label>Asset Type</label>
                <select
                  name="type"
                  onChange={inputEvent}
                  value={formData.type}
                  className="form-control select2"
                >
                  <option value="">Select</option>
                  <option>Upgrade</option>
                  <option>New Asset</option>
                  <option>Repair</option>
                  <option>Other</option>
                </select>
                {errors.type && (
                  <small className="text-danger">{errors.type}</small>
                )}
              </div>

              <div className="form-group col-md-4">
                <label>Name of Asset</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-pen" />
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

              <div className="form-group col-md-6">
                <label>Req. Date</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fa fa-calendar" />
                    </div>
                  </div>
                  <input
                    onChange={inputEvent}
                    value={formData.startDate}
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="form-control"
                    min={today}
                  />
                </div>
                {errors.startDate && (
                  <small className="text-danger">{errors.startDate}</small>
                )}
              </div>

              <div className="form-group col-md-12">
                <label>Enter Reason</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-book" />
                    </div>
                  </div>
                  <input
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

              <div className="form-group text-center col-md-12">
                <button
                  className="btn btn-primary btn-lg"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ width: "30vh" }}
                >
                  {isSubmitting ? "Submitting..." : "Apply Asset"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyForAdmin;
