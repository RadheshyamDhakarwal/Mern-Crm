import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import { assignSalary, getEmployees, getLeaders } from "../../http";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";

const AssignSalary = () => {
  const initialState = { salary: "", bonus: "", reasonForBonus: "" };
  const [formData, setFormData] = useState(initialState);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [employees, setEmployees] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      const emps = await getEmployees();
      const leaders = await getLeaders();
      setEmployees([...emps.data, ...leaders.data]);
    };
    fetchEmployees();
  }, []);

  const inputEvent = (e) => {
    console.log(formData);
    const { name, value } = e.target;
    setFormData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { salary, bonus, reasonForBonus } = formData;

    if (!salary || !bonus || !reasonForBonus) {
      toast.error("All fields are required");
      return;
    }

    try {
      setIsLoading(true); // 🔄 Start loading

      const payload = { ...formData, employeeID: selectedEmployee };
      const res = await assignSalary(payload);
      const { success, message } = res;

      if (success) {
        toast.success("Salary Assigned!");
        setFormData(initialState);
      } else {
        toast.error(message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error assigning salary:", error);
      toast.error("Server Error. Please try again.");
    } finally {
      setIsLoading(false); // ✅ Stop loading
    }
  };

  const allowOnlyNumbers = (e) => {
    if (/[a-zA-Z]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="main-content">
        <section className="section">
          <HeaderSection title="Salary" />
          <div className="">
            <div className="card-body p-0" style={{ shadow: "none" }}>
              <form className="row" onSubmit={onSubmit} id="addUserForm">
                <div className="form-group col-md-4">
                  <label>Employees</label>
                  <select
                    className="form-control select2"
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                  >
                    <option value="">Employees</option>
                    {employees?.map((employee) => (
                      <option key={employee._id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group col-md-4">
                  <label>Enter Salary</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fas fa-pen"></i>
                      </div>
                    </div>
                    <input
                      onChange={inputEvent}
                      value={formData.salary}
                      onKeyPress={allowOnlyNumbers}
                      type="text"
                      id="salary"
                      name="salary"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group col-md-4">
                  <label>Enter Bonus</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fas fa-pen"></i>
                      </div>
                    </div>
                    <input
                      onChange={inputEvent}
                      onKeyPress={allowOnlyNumbers}
                      value={formData.bonus}
                      type="text"
                      id="bonus"
                      name="bonus"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group col-md-12 ">
                  <label>Enter Reason</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fas fa-book"></i>
                      </div>
                    </div>
                    <input
                      onChange={inputEvent}
                      value={formData.reasonForBonus}
                      type="text"
                      id="reasonForBonus"
                      name="reasonForBonus"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group text-center col-md-12">
                  <button
                    className="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2"
                    type="submit"
                    style={{ width: "30vh" }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Assigning...
                      </>
                    ) : (
                      "Assign Salary"
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

export default AssignSalary;
