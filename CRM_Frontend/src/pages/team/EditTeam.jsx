import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import { getTeam, updateTeam } from "../../http";
import { FaUserEdit } from "react-icons/fa";

const EditTeam = () => {
  const [imagePreview, setImagePreview] = useState("/assets/icons/team.png");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [updateFormData, setUpdatedFormData] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await getTeam(id);
      if (res.success) {
        setFormData(res?.data);
        setImagePreview(res?.data?.image);
      }
    })();
  }, [id]);

  const validateField = (name, value) => {
    let error = "";
    if (!value || value.trim() === "") {
      error = `${name[0].toUpperCase() + name.slice(1)} is required`;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const inputEvent = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setFormData((old) => ({ ...old, [name]: value }));
    setUpdatedFormData((old) => ({ ...old, [name]: value }));
    setIsChanged(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, description, status } = formData;

    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!status.trim()) newErrors.status = "Status is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      Object.keys(updateFormData).forEach((key) => {
        if (updateFormData[key]) {
          fd.append(key, updateFormData[key]);
        }
      });

      const res = await updateTeam(id, fd);

      if (res.success) {
        setIsChanged(false);
        toast.success(res.message);
        setTimeout(() => window.history.back(), 2000);
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const captureImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((old) => ({ ...old, image: file }));
    setUpdatedFormData((old) => ({ ...old, image: file }));
    setIsChanged(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImagePreview(reader.result);
  };

  return (
    <div className="main-content">
      <section className="section">
        <HeaderSection title="Edit Team" />
        <div className="card">
          <div className="card-body pr-5 pl-5 m-1">
            <form className="row" onSubmit={onSubmit}>
              <div className="form-group col-md-12 text-center">
                <div className="input-group justify-content-center bg-gray-400 z-99 my-10">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="form-control d-none"
                    onChange={captureImage}
                    accept="image/*"
                  />

                  <label
                    htmlFor="image"
                    className="position-relative d-inline-block"
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      className="rounded"
                      src={imagePreview}
                      width="120"
                      alt="Preview"
                    />

                    <div className="position-absolute bottom-0 end-0 bg-primary p-2 rounded-circle">
                      <FaUserEdit className="text-white" />
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group col-md-6">
                <label>Enter Team Name</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={inputEvent}
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                  />
                </div>
                {errors.name && (
                  <div className="invalid-feedback d-block">{errors.name}</div>
                )}
              </div>

              <div className="form-group col-md-6">
                <label>Team Status</label>
                <select
                  name="status"
                  onChange={inputEvent}
                  value={formData.status}
                  className={`form-control select2 ${
                    errors.status ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Banned">Banned</option>
                  <option value="Expired">Expired</option>
                  <option value="Deleted">Deleted</option>
                </select>
                {errors.status && (
                  <div className="invalid-feedback d-block">
                    {errors.status}
                  </div>
                )}
              </div>

              <div className="form-group col-md-12">
                <label>Enter Team Description</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-file-alt"></i>
                    </div>
                  </div>
                  <input
                    name="description"
                    value={formData.description}
                    onChange={inputEvent}
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                  />
                </div>
                {errors.description && (
                  <div className="invalid-feedback d-block">
                    {errors.description}
                  </div>
                )}
              </div>

              <div className="form-group text-center col-md-12">
                <button
                  className="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2"
                  style={{
                    cursor: !isChanged || loading ? "not-allowed" : "pointer",
                    width: "30vh",
                  }}
                  type="submit"
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
                    "Update Team"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditTeam;
