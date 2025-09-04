import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import { addTeam } from "../../http";
import { FaUserCircle } from "react-icons/fa";

const AddTeam = () => {
  const [imagePreview, setImagePreview] = useState("/assets/icons/team.png");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", description: "", image: null },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const { name, description, image } = data;
    if (!name || !description) return toast.error("All fields are required");

    setLoading(true);
    const fd = new FormData();
    fd.append("name", name);
    fd.append("description", description);
    if (image) fd.append("image", image);

    const res = await addTeam(fd);
    if (res.success) {
      reset();
      setImagePreview("/assets/icons/team.png");
      toast.success(res.message);
    }
    setLoading(false);
  };

  const captureImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image", file);
    trigger("image");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImagePreview(reader.result);
  };

  const handleNameInput = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setValue("name", value);
    trigger("name");
  };

  return (
    <div className="main-content">
      <section className="section">
        <HeaderSection title="Add Team" />
        <div className="card-body">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group col-md-3 text-center">
              <div className="input-group justify-content-center">
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="form-control d-none"
                  onChange={captureImage}
                  accept="image/*"
                />
                <label htmlFor="image" className="position-relative">
                  <img
                    className="rounded"
                    src={imagePreview}
                    width="120"
                    alt="Preview"
                  />
                  <div className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2">
                    <FaUserCircle className="text-white" />
                  </div>
                </label>
              </div>
            </div>

            <div className="form-group col-md-4">
              <label>Enter Team Name</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <input
                  {...register("name", {
                    required: "Team name is required",
                    pattern: {
                      value: /^[a-zA-Z\s]*$/,
                      message: "Only letters allowed",
                    },
                  })}
                  onChange={handleNameInput}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                />
              </div>
              {errors.name && (
                <div className="invalid-feedback d-block">
                  {errors.name.message}
                </div>
              )}
            </div>

            <div className="form-group col-md-4">
              <label>Enter Team Description</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fas fa-file-alt"></i>
                  </div>
                </div>
                <input
                  {...register("description", {
                    required: "Team description is required",
                  })}
                  className={`form-control ${errors.description ? "is-invalid" : ""}`}
                />
              </div>
              {errors.description && (
                <div className="invalid-feedback d-block">
                  {errors.description.message}
                </div>
              )}
            </div>

            <div className="form-group text-center col-md-4">
              <button
                className="btn btn-primary btn-lg d-flex justify-content-center align-items-center gap-2"
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
                  "Add Team"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddTeam;