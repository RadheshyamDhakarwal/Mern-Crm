import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import { getEmployees, getLeaders, sendLetter } from "../../http";
import "react-datepicker/dist/react-datepicker.css";

// ========= TEMPLATE FUNCTIONS =========

const templates = {
  offer: ({
    name,
    address,
    position,
    salary,
    ctc,
    startDate,
    reportingDate,
    manager,
  }) => `
    <div style="font-family: Arial, sans-serif; padding: 30px; color: #000;">
      <p>Date: ${startDate}</p>
      <p>${name},<br/>${address}</p>
      <p>Dear ${name},</p>
      <p>Congratulations!</p>
      <p>We are pleased to confirm that you have been selected to work for SEVENUNIQUE TECH SOLUTIONS PRIVATE LIMITED. We are delighted to make you the following job offer.</p>
      <p>The position we are offering you is that of <b>${position}</b> at a monthly salary of ₹${salary}/- with an annual CTC of ₹${ctc}. This position reports to ${manager}. Your working hours will be from 9:40 AM to 6:30 PM, Monday to Saturday.</p>
      <p>Benefits include:</p>
      <ul>
        <li>Casual Leave of 12 days per annum.</li>
        <li>Employer State Insurance Corporation (ESIC) Coverage.</li>
      </ul>
      <p>Please report to ${manager} on ${reportingDate} at 9:40 AM for documentation and orientation.</p>
      <p>Kindly sign and return this letter to confirm your acceptance.</p>
      <p>Sincerely,<br/>Bhavika Manghnani<br/>HR Manager<br/>Seven Unique Tech Solution Private Limited</p>
    </div>
  `,

  warning: ({ name, reason, date, id, department }) => `
    <div style="font-family: Arial, sans-serif; padding: 30px; color: #000;">
      <p>Date: ${date}</p>
      <p>To,<br/>${name}<br/>Employee ID: ${id}<br/>Department: ${department}</p>
      <p>Subject: Warning Letter for ${reason}</p>
      <p>Dear ${name},</p>
      <p>This letter serves as a formal warning regarding <b>${reason}</b>. Despite previous discussions, the issue remains unresolved.</p>
      <p>This behavior is in violation of company standards and expectations. You are hereby advised to correct your conduct immediately. Any further violation may result in stricter disciplinary action, including suspension or termination.</p>
      <p>We trust that you will take this matter seriously and work towards improving your performance and behavior.</p>
      <p>Sincerely,<br/>Bhavika Manghnani<br/>HR Department<br/>Seven Unique Tech Solution Private Limited</p>
    </div>
  `,

  promotion: ({ name, newPosition, effectiveDate }) => `
    <div style="font-family: Arial, sans-serif; padding: 30px; color: #000;">
      <p>Date: ${effectiveDate}</p>
      <p>To,<br/>${name}</p>
      <p>Subject: Promotion Letter</p>
      <p>Dear ${name},</p>
      <p>We are pleased to inform you that you have been promoted to the position of <b>${newPosition}</b> effective from ${effectiveDate}.</p>
      <p>This promotion is a recognition of your performance and contribution to the organization. We wish you continued success in your new role.</p>
      <p>Sincerely,<br/>HR Department<br/>Seven Unique Tech Solution Private Limited</p>
    </div>
  `,

  termination: ({ name, terminationDate, reason, id, department }) => `
    <div style="font-family: Arial, sans-serif; padding: 30px; color: #000;">
      <p>Date: ${terminationDate}</p>
      <p>To,<br/>${name}<br/>Employee ID: ${id}<br/>Department: ${department}</p>
      <p>Subject: Termination of Employment</p>
      <p>Dear ${name},</p>
      <p>This letter is to formally inform you that your employment with Seven Unique Tech Solution Private Limited is terminated effective from <b>${terminationDate}</b> due to <b>${reason}</b>.</p>
      <p>Despite previous discussions and written warnings, no significant improvement has been observed. As a result, the management has decided to terminate your services in accordance with company policy.</p>
      <p>You are required to return all company assets including your ID card, laptop, official documents, and any other materials issued to you, on or before your final working day.</p>
      <p>We thank you for your time with the organization and wish you the best in your future endeavors.</p>
      <p>Sincerely,<br/>Bhavika Manghnani<br/>HR Department<br/>Seven Unique Tech Solution Private Limited</p>
    </div>
  `,

  notice: ({ name, noticeDate, reason }) => `
    <div style="font-family: Arial, sans-serif; padding: 30px; color: #000;">
      <p>Date: ${noticeDate}</p>
      <p>To,<br/>${name}</p>
      <p>Subject: Notice Issuance</p>
      <p>Dear ${name},</p>
      <p>This letter is to inform you that a notice has been issued regarding: <b>${reason}</b>.</p>
      <p>Please consider this as official notice from management.</p>
      <p>Sincerely,<br/>HR Department<br/>Seven Unique Tech Solution Private Limited</p>
    </div>
  `,
};

// ========= MAIN COMPONENT ==========

const AssignLetter = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employees, setEmployees] = useState([]);
  const [letterType, setLetterType] = useState("offer");
  const [formData, setFormData] = useState({});
  const [downloadUrl, setDownloadUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const emps = await getEmployees();
        const leaders = await getLeaders();
        setEmployees([...emps.data, ...leaders.data]);
      } catch (error) {
        toast.error("Error fetching employees");
      }
    };
    fetchEmployees();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getRequiredFields = () => {
    switch (letterType) {
      case "offer":
        return [
          "name",
          "address",
          "position",
          "salary",
          "ctc",
          "startDate",
          "reportingDate",
          "manager",
        ];
      case "warning":
        return ["name", "reason", "date"];
      case "promotion":
        return ["name", "newPosition", "effectiveDate"];
      case "termination":
        return ["name", "terminationDate"];
      case "notice":
        return ["name", "noticeDate", "reason"];
      default:
        return [];
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = getRequiredFields();
    let hasError = false;
    const newErrors = {};

    // Check required
    for (const field of requiredFields) {
      if (!formData[field]) {
        newErrors[field] = `Please fill ${field}`;
        hasError = true;
      }
    }

    // Custom validation
    if ("name" in formData && /[^a-zA-Z\s]/.test(formData.name)) {
      newErrors.name = "Name should contain only letters";
      hasError = true;
    }

    if ("salary" in formData && /[^0-9]/.test(formData.salary)) {
      newErrors.salary = "Salary should contain only numbers";
      hasError = true;
    }

    if ("ctc" in formData && /[^0-9]/.test(formData.ctc)) {
      newErrors.ctc = "CTC should contain only numbers";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    try {
      setIsLoading(true);

      const letterHTML = templates[letterType](formData);

      const res = await sendLetter({
        employeeID: selectedEmployee,
        letterHTML,
        letterType,
      });

      if (res.success) {
        toast.success("Letter sent successfully!");
        setFormData({});
        setSelectedEmployee("");
        setDownloadUrl(res.filePath);
      } else {
        toast.error("Failed to send letter.");
      }
    } catch (err) {
      toast.error("Failed to send letter.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderFields = () => {
    const fields = getRequiredFields();

    return fields.map((field) => (
      <div key={field} className="form-group col-md-4">
        <label>
          {field
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </label>
        <input
          className={`form-control ${errors[field] ? "is-invalid" : ""}`}
          type={field.toLowerCase().includes("date") ? "date" : "text"}
          value={formData[field] || ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
          onKeyPress={(e) => {
            if (field === "name" && /[^a-zA-Z\s]/.test(e.key))
              e.preventDefault();
            if ((field === "salary" || field === "ctc") && /[^0-9]/.test(e.key))
              e.preventDefault();
          }}
        />
        {errors[field] && (
          <small className="text-danger">{errors[field]}</small>
        )}
      </div>
    ));
  };

  return (
    <div className="main-content">
      <section className="section">
        <HeaderSection title="Send Letter" />
        <div className="">
          <div className="card-body p-0">
            <form className="row" onSubmit={onSubmit}>
              {/* Employee Selection */}
              <div className="form-group col-md-4">
                <label>Select Employee</label>
                <select
                  className="form-control"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  required
                >
                  <option value="">Choose Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Letter Type Selection */}
              <div className="form-group col-md-4">
                <label>Select Letter Type</label>
                <select
                  className="form-control"
                  value={letterType}
                  onChange={(e) => setLetterType(e.target.value)}
                >
                  <option value="offer">Offer</option>
                  <option value="promotion">Promotion</option>
                  <option value="warning">Warning</option>
                  <option value="termination">Termination</option>
                  <option value="notice">Notice</option>
                </select>
              </div>

              {/* Dynamic Fields */}
              {renderFields()}

              {/* Submit */}
              <div className="form-group col-md-4">
                <button
                  className="btn btn-primary btn-lg px-3 py-2 rounded-sm d-flex align-items-center justify-content-center gap-2"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Sending...
                    </>
                  ) : (
                    "Send Letter"
                  )}
                </button>

                {downloadUrl && (
                  <div className="mt-4">
                    <a
                      href={downloadUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success"
                    >
                      📥 Download Letter
                    </a>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssignLetter;
