// --- Updated AddUser.jsx ---
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import { addUser } from "../../http";
import Modal from "../../components/modal/Modal";
import {
  FaUserEdit,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaList,
  FaUpload,
} from "react-icons/fa";

const AddUser = () => {
  const [imagePreview, setImagePreview] = useState("/assets/icons/user.png");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      type: "Employee",
      profile: "",
      desgination: "",
      account_number: "",
      ifsc: "",
      bank_name: "",
      father_name: "",
      mother_name: "",
      current_address: "",
      permanent_address: "",
      status: "active",
      branch: "",
      gender: "",
      DOB: "",
      Un_no: "",
      Esi_no: "",
      alternate_number: "",
      DOJ: "",
      experience: "",
      company_name: "",
      total_experience: "",
      reason_of_leaving: "",
      nominee_name: "",
      nominee_relation: "",
      nominee_address: "",
      nominee_mobile: "",
      nominee_age: "",
      employee_adhar_image: "",
      employee_pan_image: "",
      tenth_marksheet_img: "",
      twelth_marksheet_img: "",
      mother_adhar_image: "",
      father_adhar_image: "",
      Policeverification: "",
    },
    mode: "onChange",
  });

  const experience = watch("experience");
  const type = watch("type");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const isExempted = experience === "Fresher" || experience === "Intern";

      if (!data.profile) {
        toast.error("Please choose profile image");
        return;
      }

      if (data.type === "Admin" && !showModal) {
        setShowModal(true);
        return;
      }

      const fd = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key]) fd.append(key, data[key]);
      });

      const res = await addUser(fd);
      if (res?.data?.success) {
        toast.success(res?.message || "User added successfully");
        //  toast.success( "User added successfully");
        setShowModal(false);
        reset();
        setImagePreview("/assets/icons/user.png");
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error) {
        console.error("Add user error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const captureImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("profile", file);
    trigger("profile");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImagePreview(reader.result);
  };

  const captureFile = (e) => {
    const { name, files } = e.target;
    setValue(name, files[0]);
    trigger(name);
  };

  const modalAction = () => setShowModal(!showModal);

  const handleNameInput = (e, fieldName) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setValue(fieldName, value);
    trigger(fieldName);
  };

  const handleNumberInput = (e, fieldName, maxLength = 10) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, maxLength);
    setValue(fieldName, value);
    trigger(fieldName);
  };

  const handleMobileInput = (e, fieldName) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length === 1 && !/^[6-9]$/.test(value)) return;
    if (value.length > 10) value = value.slice(0, 10);
    setValue(fieldName, value);
    trigger(fieldName);
  };

  const handleIFSCInput = (e) => {
    const value = e.target.value.toUpperCase();
    setValue("ifsc", value);
    trigger("ifsc");
  };

  const today = new Date().toISOString().split("T")[0];
  const maxDOB = "2010-12-31";
  return (
    <>
      {showModal && (
        <Modal close={modalAction} title="Add Admin" width="35%">
          <div className="row" style={{ margin: "20px" }}>
            <div className="col col-md-4 text-center">
              <img className="rounded" src={imagePreview} width="120" alt="" />
            </div>
            <div className="col col-md-8">
              <table className="table table-md">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{watch("name")}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{watch("email")}</td>
                  </tr>
                  <tr>
                    <th>User Type</th>
                    <td>{watch("type")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="form-group col-md-12">
            <label>Enter Your Password</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <FaLock />
                </div>
              </div>
              <input
                {...register("adminPassword", {
                  required: "Admin password is required",
                })}
                type="password"
                placeholder={`Enter Password To Add ${watch("name")} As Admin`}
                className={`form-control ${
                  errors.adminPassword ? "is-invalid" : ""
                }`}
              />
            </div>
            {errors.adminPassword && (
              <div className="invalid-feedback d-block">
                {errors.adminPassword.message}
              </div>
            )}
          </div>
          <div className="justify-content-center text-center mb-3">
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              form="addUserForm"
              style={{ width: "30vh" }}
            >
              Add {watch("type")}
            </button>
          </div>
        </Modal>
      )}

      <div className="main-content">
        <section className="section">
          <HeaderSection title="Add User" />
          <div className="">
            <div className="card-body">
              <form
                className="row"
                onSubmit={handleSubmit(onSubmit)}
                id="addUserForm"
              >
                {/* Profile Image */}
                <div className="form-group col-md-12 text-center position-relative">
                  <div className="input-group justify-content-center">
                    <input
                      type="file"
                      id="profile"
                      className="form-control d-none"
                      onChange={captureImage}
                      accept="image/*"
                    />
                    <label htmlFor="profile" className="position-relative">
                      <img
                        className="rounded"
                        src={imagePreview}
                        width="120"
                        alt="Profile"
                      />
                      <div className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2">
                        <FaUserEdit className="text-white" />
                      </div>
                    </label>
                  </div>
                  {errors.profile && (
                    <div className="text-danger text-center mt-2">
                      Profile image is required
                    </div>
                  )}
                </div>

                <hr className="my-3" style={{ borderColor: "#000" }} />

                {/* User Details Section */}
                <h4
                  className="fw-bold d-flex align-items-center mb-3"
                  style={{ color: "#000", fontSize: "16px" }}
                >
                  <FaList className="me-2" /> User Details
                </h4>

                {/* Personal Information */}
                <div className="form-group col-md-4">
                  <label>Enter Name</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaUser />
                      </div>
                    </div>
                    <input
                      {...register("name", {
                        required: "Name is required",
                        pattern: {
                          value: /^[a-zA-Z\s]*$/,
                          message: "Only letters allowed",
                        },
                      })}
                      onChange={(e) => handleNameInput(e, "name")}
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <div className="invalid-feedback d-block">
                      {errors.name.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Enter Mobile Number</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaPhone />
                      </div>
                    </div>
                    <input
                      {...register("mobile", {
                        required: "Mobile number is required",
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: "Must be 10 digits starting with 6-9",
                        },
                      })}
                      onChange={(e) => handleMobileInput(e, "mobile")}
                      maxLength={10}
                      className={`form-control ${
                        errors.mobile ? "is-invalid" : ""
                      }`}
                    />
                  </div>
                  {errors.mobile && (
                    <div className="invalid-feedback d-block">
                      {errors.mobile.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Gender</label>
                  <select
                    {...register("gender", { required: "Gender is required" })}
                    className={`form-control select2 ${
                      errors.gender ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <div className="invalid-feedback d-block">
                      {errors.gender.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Select DOB</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaCalendarAlt />
                      </div>
                    </div>
                    <input
                      {...register("DOB", {
                        required: "Date of birth is required",
                      })}
                      type="date"
                      max={maxDOB}
                      className={`form-control ${
                        errors.DOB ? "is-invalid" : ""
                      }`}
                    />
                  </div>
                  {errors.DOB && (
                    <div className="invalid-feedback d-block">
                      {errors.DOB.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Father name</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaUser />
                      </div>
                    </div>
                    <input
                      {...register("father_name", {
                        required: "Father's name is required",
                        pattern: {
                          value: /^[a-zA-Z\s]*$/,
                          message: "Only letters allowed",
                        },
                      })}
                      onChange={(e) => handleNameInput(e, "father_name")}
                      className={`form-control ${
                        errors.father_name ? "is-invalid" : ""
                      }`}
                    />
                  </div>
                  {errors.father_name && (
                    <div className="invalid-feedback d-block">
                      {errors.father_name.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Mother name</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaUser />
                      </div>
                    </div>
                    <input
                      {...register("mother_name", {
                        required: "Mother's name is required",
                        pattern: {
                          value: /^[a-zA-Z\s]*$/,
                          message: "Only letters allowed",
                        },
                      })}
                      onChange={(e) => handleNameInput(e, "mother_name")}
                      className={`form-control ${
                        errors.mother_name ? "is-invalid" : ""
                      }`}
                    />
                  </div>
                  {errors.mother_name && (
                    <div className="invalid-feedback d-block">
                      {errors.mother_name.message}
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="form-group col-md-4">
                  <label>Enter Email</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaEnvelope />
                      </div>
                    </div>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Alternate number</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaPhone />
                      </div>
                    </div>
                    <input
                      {...register("alternate_number", {
                        required: "Alternate number is required",
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: "Must be 10 digits starting with 6-9",
                        },
                      })}
                      onChange={(e) => handleMobileInput(e, "alternate_number")}
                      maxLength={10}
                      className={`form-control ${
                        errors.alternate_number ? "is-invalid" : ""
                      }`}
                    />
                  </div>
                  {errors.alternate_number && (
                    <div className="invalid-feedback d-block">
                      {errors.alternate_number.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Enter Password</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaLock />
                      </div>
                    </div>
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                    />
                  </div>
                  {errors.password && (
                    <div className="invalid-feedback d-block">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                {/* Employment Details */}
                <div className="form-group col-md-4">
                  <label>User Type</label>
                  <select
                    {...register("type", { required: "User type is required" })}
                    className={`form-control select2 ${
                      errors.type ? "is-invalid" : ""
                    }`}
                  >
                    <option value="Employee">Employee</option>
                    <option value="Leader">Leader</option>
                    <option value="Admin">Admin</option>
                  </select>
                  {errors.type && (
                    <div className="invalid-feedback d-block">
                      {errors.type.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Select DOJ</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaCalendarAlt />
                      </div>
                    </div>
                    <input
                      {...register("DOJ", {
                        required: "Date of joining is required",
                      })}
                      type="date"
                      max={today}
                      className={`form-control ${
                        errors.DOJ ? "is-invalid" : ""
                      }`}
                    />
                  </div>
                  {errors.DOJ && (
                    <div className="invalid-feedback d-block">
                      {errors.DOJ.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Designation</label>
                  <input
                    {...register("desgination", {
                      required: "Designation is required",
                      pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: "Only letters allowed",
                      },
                    })}
                    onChange={(e) => handleNameInput(e, "desgination")}
                    className={`form-control ${
                      errors.desgination ? "is-invalid" : ""
                    }`}
                  />
                  {errors.desgination && (
                    <div className="invalid-feedback d-block">
                      {errors.desgination.message}
                    </div>
                  )}
                </div>

                {/* Bank Details */}
                <div className="form-group col-md-4">
                  <label>Account Number</label>
                  <input
                    {...register("account_number", {
                      required: "Account number is required",
                      pattern: {
                        value: /^\d{9,18}$/,
                        message: "Must be 9-18 digits",
                      },
                    })}
                    onChange={(e) => handleNumberInput(e, "account_number", 18)}
                    className={`form-control ${
                      errors.account_number ? "is-invalid" : ""
                    }`}
                  />
                  {errors.account_number && (
                    <div className="invalid-feedback d-block">
                      {errors.account_number.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Ifsc Code</label>
                  <input
                    {...register("ifsc", {
                      required: "IFSC code is required",
                      pattern: {
                        value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                        message: "Invalid IFSC format",
                      },
                    })}
                    onChange={handleIFSCInput}
                    className={`form-control ${
                      errors.ifsc ? "is-invalid" : ""
                    }`}
                  />
                  {errors.ifsc && (
                    <div className="invalid-feedback d-block">
                      {errors.ifsc.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Bank Name</label>
                  <input
                    {...register("bank_name", {
                      required: "Bank name is required",
                      pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: "Only letters allowed",
                      },
                    })}
                    onChange={(e) => handleNameInput(e, "bank_name")}
                    className={`form-control ${
                      errors.bank_name ? "is-invalid" : ""
                    }`}
                  />
                  {errors.bank_name && (
                    <div className="invalid-feedback d-block">
                      {errors.bank_name.message}
                    </div>
                  )}
                </div>

                {/* Address Information */}
                <div className="form-group col-md-4">
                  <label>Current Address</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaMapMarkerAlt />
                      </div>
                    </div>
                    <input
                      {...register("current_address", {
                        required: "Current address is required",
                      })}
                      className={`form-control ${
                        errors.current_address ? "is-invalid" : ""
                      }`}
                    />
                  </div>
                  {errors.current_address && (
                    <div className="invalid-feedback d-block">
                      {errors.current_address.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Permanent Address</label>
                  <input
                    {...register("permanent_address", {
                      required: "Permanent address is required",
                    })}
                    className={`form-control ${
                      errors.permanent_address ? "is-invalid" : ""
                    }`}
                  />
                  {errors.permanent_address && (
                    <div className="invalid-feedback d-block">
                      {errors.permanent_address.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Status</label>
                  <select
                    {...register("status", { required: "Status is required" })}
                    className={`form-control select2 ${
                      errors.status ? "is-invalid" : ""
                    }`}
                  >
                    <option value="active">Active</option>
                    <option value="banned">Banned</option>
                    <option value="notice">Notice</option>
                    <option value="provison">Provision</option>
                  </select>
                  {errors.status && (
                    <div className="invalid-feedback d-block">
                      {errors.status.message}
                    </div>
                  )}
                </div>

                {/* PF/ESI Details */}
                <div className="form-group col-md-3">
                  <label>Pf UnNumber</label>
                  <input
                    {...register("Un_no", {
                      required:
                        experience !== "Fresher" && experience !== "Intern"
                          ? "PF UN number is required"
                          : false,
                      pattern: {
                        value: /^\d{12}$/,
                        message: "Must be 12 digits",
                      },
                    })}
                    onChange={(e) => handleNumberInput(e, "Un_no", 12)}
                    className={`form-control ${
                      errors.Un_no ? "is-invalid" : ""
                    }`}
                    disabled={
                      experience === "Fresher" || experience === "Intern"
                    }
                  />
                  {errors.Un_no && (
                    <div className="invalid-feedback d-block">
                      {errors.Un_no.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-3">
                  <label>Esi Number</label>
                  <input
                    {...register("Esi_no", {
                      required:
                        experience !== "Fresher" && experience !== "Intern"
                          ? "ESI number is required"
                          : false,
                      pattern: {
                        value: /^\d+$/,
                        message: "Must be numbers only",
                      },
                    })}
                    onChange={(e) => handleNumberInput(e, "Esi_no", 17)}
                    className={`form-control ${
                      errors.Esi_no ? "is-invalid" : ""
                    }`}
                    disabled={
                      experience === "Fresher" || experience === "Intern"
                    }
                  />
                  {errors.Esi_no && (
                    <div className="invalid-feedback d-block">
                      {errors.Esi_no.message}
                    </div>
                  )}
                </div>

                {/* Department and Experience */}
                <div className="form-group col-md-3">
                  <label>Department</label>
                  <select
                    {...register("branch", {
                      required: "Department is required",
                    })}
                    className={`form-control select2 ${
                      errors.branch ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">Select Department</option>
                    <option value="tech">Tech</option>
                    <option value="sales">Sales</option>
                    <option value="telecaller">Telecaller</option>
                    <option value="hr">HR</option>
                  </select>
                  {errors.branch && (
                    <div className="invalid-feedback d-block">
                      {errors.branch.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-3">
                  <label>Select Experience</label>
                  <select
                    {...register("experience", {
                      required: "Experience is required",
                    })}
                    className={`form-control select2 ${
                      errors.experience ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">Select Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Experiance">Experienced</option>
                    <option value="Intern">Intern</option>
                  </select>
                  {errors.experience && (
                    <div className="invalid-feedback d-block">
                      {errors.experience.message}
                    </div>
                  )}
                </div>

                {/* Conditional Fields for Experience */}
                {experience === "Experiance" && (
                  <>
                    <div className="form-group col-md-4">
                      <label>Company Name</label>
                      <input
                        {...register("company_name", {
                          required: "Company name is required",
                        })}
                        className={`form-control ${
                          errors.company_name ? "is-invalid" : ""
                        }`}
                        placeholder="Enter Company Name"
                      />
                      {errors.company_name && (
                        <div className="invalid-feedback d-block">
                          {errors.company_name.message}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-4">
                      <label>Total Experience</label>
                      <input
                        {...register("total_experience", {
                          required: "Total experience is required",
                        })}
                        className={`form-control ${
                          errors.total_experience ? "is-invalid" : ""
                        }`}
                        placeholder="e.g. 2 Years"
                      />
                      {errors.total_experience && (
                        <div className="invalid-feedback d-block">
                          {errors.total_experience.message}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-4">
                      <label>Reason for Leaving</label>
                      <input
                        {...register("reason_of_leaving", {
                          required: "Reason for leaving is required",
                        })}
                        className={`form-control ${
                          errors.reason_of_leaving ? "is-invalid" : ""
                        }`}
                        placeholder="Reason for leaving previous company"
                      />
                      {errors.reason_of_leaving && (
                        <div className="invalid-feedback d-block">
                          {errors.reason_of_leaving.message}
                        </div>
                      )}
                    </div>
                  </>
                )}

                <hr className="my-3" style={{ borderColor: "#000" }} />

                {/* Nominee Details Section */}
                <h4
                  className="fw-bold d-flex align-items-center mb-3"
                  style={{ color: "#000", fontSize: "16px" }}
                >
                  <FaUser className="me-2" /> Nominee Details
                </h4>

                <div className="form-group col-md-4">
                  <label>Nominee Name</label>
                  <input
                    {...register("nominee_name", {
                      required: "Nominee name is required",
                      pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: "Only letters allowed",
                      },
                    })}
                    onChange={(e) => handleNameInput(e, "nominee_name")}
                    className={`form-control ${
                      errors.nominee_name ? "is-invalid" : ""
                    }`}
                  />
                  {errors.nominee_name && (
                    <div className="invalid-feedback d-block">
                      {errors.nominee_name.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Nominee Relation</label>
                  <input
                    {...register("nominee_relation", {
                      required: "Nominee relation is required",
                      pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: "Only letters allowed",
                      },
                    })}
                    onChange={(e) => handleNameInput(e, "nominee_relation")}
                    className={`form-control ${
                      errors.nominee_relation ? "is-invalid" : ""
                    }`}
                  />
                  {errors.nominee_relation && (
                    <div className="invalid-feedback d-block">
                      {errors.nominee_relation.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Nominee Mobile</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaPhone />
                      </div>
                    </div>
                    <input
                      {...register("nominee_mobile", {
                        required: "Nominee mobile is required",
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: "Must be 10 digits starting with 6-9",
                        },
                      })}
                      onChange={(e) => handleMobileInput(e, "nominee_mobile")}
                      maxLength={10}
                      className={`form-control ${
                        errors.nominee_mobile ? "is-invalid" : ""
                      }`}
                    />
                  </div>
                  {errors.nominee_mobile && (
                    <div className="invalid-feedback d-block">
                      {errors.nominee_mobile.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Nominee Address</label>
                  <input
                    {...register("nominee_address", {
                      required: "Nominee address is required",
                    })}
                    className={`form-control ${
                      errors.nominee_address ? "is-invalid" : ""
                    }`}
                  />
                  {errors.nominee_address && (
                    <div className="invalid-feedback d-block">
                      {errors.nominee_address.message}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Nominee age</label>
                  <input
                    {...register("nominee_age", {
                      required: "Nominee age is required",
                      validate: (value) =>
                        parseInt(value) >= 15 || "Age must be at least 15",
                    })}
                    onChange={(e) => handleNumberInput(e, "nominee_age", 2)}
                    className={`form-control ${
                      errors.nominee_age ? "is-invalid" : ""
                    }`}
                  />

                  {errors.nominee_age && (
                    <div className="invalid-feedback d-block">
                      {errors.nominee_age.message}
                    </div>
                  )}
                </div>

                <hr className="my-3" style={{ borderColor: "#000" }} />

                {/* Document Uploads Section */}
                <h4
                  className="fw-bold d-flex align-items-center mb-3"
                  style={{ color: "#000", fontSize: "16px" }}
                >
                  <FaUpload className="me-2" /> Document Uploads
                </h4>

                <div className="form-group col-md-4">
                  <label>Upload Aadhaar</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={captureFile}
                    name="employee_adhar_image"
                  />
                </div>

                <div className="form-group col-md-4">
                  <label>Upload PAN</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={captureFile}
                    name="employee_pan_image"
                  />
                </div>

                <div className="form-group col-md-4">
                  <label>Upload 10th Marksheet</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={captureFile}
                    name="tenth_marksheet_img"
                  />
                </div>

                <div className="form-group col-md-4">
                  <label>Upload 12th Marksheet</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={captureFile}
                    name="twelth_marksheet_img"
                  />
                </div>

                <div className="form-group col-md-4">
                  <label>Upload Mother Adhar</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={captureFile}
                    name="mother_adhar_image"
                  />
                </div>

                <div className="form-group col-md-4">
                  <label>Upload Father Adhar</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={captureFile}
                    name="father_adhar_image"
                  />
                </div>

                <div className="form-group col-md-4">
                  <label>Upload Police-Verification</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={captureFile}
                    name="Policeverification"
                  />
                </div>

                {/* Submit Button */}
                <div className="form-group text-center col-md-12 mt-4">
                  <button
                    className={`btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2 ${
                      loading ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    type="submit"
                    style={{ width: "30vh" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span>Please wait...</span>
                      </>
                    ) : (
                      `Add ${type}`
                    )}
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

export default AddUser;
