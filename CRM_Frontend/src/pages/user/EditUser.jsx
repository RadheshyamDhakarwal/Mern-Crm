import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import { updateUser, getUser } from "../../http";
import Modal from "../../components/modal/Modal";
import { FaUserEdit } from "react-icons/fa";

const EditUser = () => {
  const initialState = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    type: "",
    address: "",
    profile: "",
    status: "",
    adminPassword: "",
  };

  const [imagePreview, setImagePreview] = useState("/assets/icons/user.png");
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [updateFormData, setUpdatedFormData] = useState({});
  const [userType, setUserType] = useState("User");
  const [isChanged, setIsChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useHistory();

  useEffect(() => {
    (async () => {
      const res = await getUser(id);
      if (res.success) {
        setUserType(res?.data?.type);
        setFormData(res?.data);
        setImagePreview(res?.data?.image);
        console.log(imagePreview);
      }
    })();
  }, [id]);

  const validateField = (name, value) => {
    let error = "";
    if (!value || value.trim() === "") {
      error = `${name[0].toUpperCase() + name.slice(1)} is required`;
    } else {
      if (name === "name" && !/^[a-zA-Z ]+$/.test(value)) {
        error = "Only letters and spaces allowed in name";
      }
      if (name === "mobile" && !/^[6-9]\d{9}$/.test(value)) {
        error = "Mobile number must start with 6-9 and be 10 digits";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const inputEvent = (e) => {
    const { name, value } = e.target;
    if (name === "name" && /[^a-zA-Z ]/.test(value)) return;
    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
      if (value.length === 1 && !/^[6-9]$/.test(value)) return;
    }
    validateField(name, value);
    setFormData((old) => ({ ...old, [name]: value }));
    setUpdatedFormData((old) => ({ ...old, [name]: value }));
    setIsChanged(true);
  };

  const hasErrors = () => {
    return Object.values(errors).some((error) => error);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (hasErrors()) {
      toast.error("Please fix form errors before submitting.");
      return;
    }
    if (updateFormData.type && !showModal) return setShowModal(true);
    setLoading(true);
    const fd = new FormData();
    Object.keys(updateFormData).forEach((key) => {
      fd.append(key, updateFormData[key]);
    });
    const { success, message } = await updateUser(id, fd);
    setLoading(false);
    if (success) {
      toast.success(message);
      setTimeout(() => window.history.back(), 1500);
    }
  };

  const captureImage = (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    if (!file) return;
    setFormData((old) => ({ ...old, profile: file }));
    setUpdatedFormData((old) => ({ ...old, profile: file }));
    setIsChanged(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  const modalAction = () => setShowModal(!showModal);
  return (
    <>
      {showModal && (
        <Modal close={modalAction} title="Update User" width="35%">
          <div className="row" style={{ margin: "20px" }}>
            <div className="col col-md-8">
              <table className="table table-md">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{formData.name}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{formData.email}</td>
                  </tr>
                  <tr>
                    <th>User Type</th>
                    <td>{formData.type}</td>
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
                  <i className="fas fa-lock"></i>
                </div>
              </div>
              <input
                onChange={inputEvent}
                value={formData.adminPassword}
                type="password"
                placeholder={`Enter Your Password To Change ${formData.name}'s Type`}
                id="adminPassword"
                name="adminPassword"
                className="form-control"
              />
            </div>
          </div>
          <div className="justify-content-center text-center mb-3">
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              form="updateUserForm"
              style={{ width: "30vh" }}
            >
              Add {formData.type}
            </button>
          </div>
        </Modal>
      )}

      <div className="main-content">
        <section className="section">
          <HeaderSection title={`Edit ${userType}`} />
          <div className="">
            <div className="card-body">
              <form className="row" onSubmit={onSubmit} id="updateUserForm">
                <div className="form-group col-md-12 text-center">
                  <div className="input-group justify-content-center">
                    {/* Hidden File Input */}
                    <input
                      type="file"
                      id="profile"
                      name="profile"
                      className="form-control d-none"
                      onChange={captureImage}
                      accept="image/*"
                    />

                    {/* Label wraps image + edit icon */}
                    <label
                      htmlFor="profile"
                      className="position-relative cursor-pointer"
                    >
                      <img
                        className="rounded"
                        src={imagePreview}
                        width={120}
                        height={120}
                        alt="Profile"
                      />

                      {/* Edit Icon */}
                      <div
                        className="position-absolute bg-secondary px-2 py-2 rounded-circle d-flex justify-content-center align-items-center"
                        style={{ bottom: 0, right: 0 }}
                      >
                        <FaUserEdit className="text-white" size={20} />
                      </div>
                    </label>
                  </div>
                </div>

                <div className="form-group col-md-4">
                  <label>Enter Name</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fas fa-user"></i>
                      </div>
                    </div>
                    <input
                      onChange={inputEvent}
                      value={formData.name}
                      type="text"
                      id="name"
                      name="name"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <div className="invalid-feedback d-block">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-4">
                  <label>Enter Email</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </div>
                    </div>
                    <input
                      onChange={inputEvent}
                      value={formData.email}
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group col-md-4">
                  <label>Enter Username</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fas fa-user-circle"></i>
                      </div>
                    </div>
                    <input
                      onChange={inputEvent}
                      value={formData.username}
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group col-md-3">
                  <label>Enter Mobile Number</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fas fa-phone"></i>
                      </div>
                    </div>
                    <input
                      onChange={inputEvent}
                      value={formData.mobile}
                      type="tel"
                      id="mobile"
                      name="mobile"
                      className={`form-control ${
                        errors.mobile ? "is-invalid" : ""
                      }`}
                    />
                  </div>
                  {errors.mobile && (
                    <div className="invalid-feedback d-block">
                      {errors.mobile}
                    </div>
                  )}
                </div>

                <div className="form-group col-md-3">
                  <label>Enter Password</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </div>
                    </div>
                    <input
                      onChange={inputEvent}
                      value={formData.password}
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                    />
                  </div>
                </div>

                {/* <div className="form-group col-md-3">
                  <label>User Type</label>
                  <select
                    name="type"
                    onChange={inputEvent}
                    value={formData.type}
                    className="form-control select2"
                  >
                    <option>Employee</option>
                    <option>Leader</option>
                    <option>Admin</option>
                  </select>
                </div> */}

                <div className="form-group col-md-3">
                  <label>User Status</label>
                  <select
                    name="status"
                    onChange={inputEvent}
                    value={formData.status}
                    className="form-control select2"
                  >
                    <option>Active</option>
                    <option>Banned</option>
                  </select>
                </div>

                <div className="form-group col-md-12 ">
                  <label>Enter Address</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                    </div>
                    <textarea
                      onChange={inputEvent}
                      value={formData.address}
                      id="address"
                      name="address"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group col-md-3">
                  <button
                    className="btn btn-primary btn-lg rounded-sm d-flex align-items-center justify-content-center gap-2"
                    type="submit"
                    style={{ width: "30vh" }}
                    disabled={!isChanged || loading}
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
                      `Update ${userType}`
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

export default EditUser;
