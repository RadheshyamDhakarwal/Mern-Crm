import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getUser } from "../../http";

const Employee = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    mobile: "",
    image: "",
    type: "",
    status: "",
    account_number: "",
    ifsc: "",
    bank_name: "",
    desgination: "",
    current_address: "",
    permanent_address: "",
    branch: "",
    DOB: "",
    father_name: "",
    mother_name: "",
    alternate_number: "",
    DOJ: "",
    experience: "",
    company_name: "",
    total_experience: "",
    reason_of_leaving: "",
    nominee_name: "",
    nominee_relation: "",
    nominee_mobile: "",
    nominee_address: "",
    nominee_age: "",
  });

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await getUser(id);
      if (res.success) setUser(res.data);
      // console.log(res);
      
    })();
  }, [id]);

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-primary">Employee Profile</h1>
          <NavLink to={`/edituser/${id}`} className="btn btn-outline-primary shadow-sm">
            ✏️ Edit Profile
          </NavLink>
        </div>

        <div className="card shadow rounded p-4 mb-4">
          {/* Profile Overview */}
          <div className="text-center mb-4">
            <img
              src={user?.image || "/assets/icons/user-1.jpg"}
              alt="Profile"
              className="rounded-circle border border-3 shadow"
              width="130"
              height="130"
            />
            <h3 className="mt-3 mb-1">{user.name}</h3>
            <span className="badge bg-info me-2">{user.desgination}</span>
            <span className="badge bg-secondary">{user.branch}</span>
          </div>

          {/* Section: Personal Info */}
          <div className="border-top pt-3 mt-3">
            <h5 className="text-dark fw-bold mb-3">👤 Personal Information</h5>
            <div className="row">
              <Info label="Username" value={user.username} />
              <Info label="DOB" value={user.DOB} />
              <Info label="DOJ" value={user.DOJ} />
              <Info label="Status" value={user.status} />
              <Info label="Type" value={user.type} />
              <Info label="Experience" value={user.experience} />
              <Info label="Company Name" value={user.company_name} />
              <Info label="Total Experience" value={user.total_experience} />
              <Info label="Reason of Leaving" value={user.reason_of_leaving} />
            </div>
          </div>

          {/* Section: Contact Info */}
          <div className="border-top pt-3 mt-3">
            <h5 className="text-dark fw-bold mb-3">📞 Contact Information</h5>
            <div className="row">
              <Info label="Email" value={user.email} />
              <Info label="Mobile" value={user.mobile} />
              <Info label="Alternate Number" value={user.alternate_number} />
              <Info label="Current Address" value={user.current_address} />
              <Info label="Permanent Address" value={user.permanent_address} />
            </div>
          </div>

          {/* Section: Bank Info */}
          <div className="border-top pt-3 mt-3">
            <h5 className="text-dark fw-bold mb-3">🏦 Bank Details</h5>
            <div className="row">
              <Info label="Bank Name" value={user.bank_name} />
              <Info label="Account Number" value={user.account_number} />
              <Info label="IFSC Code" value={user.ifsc} />
            </div>
          </div>

          {/* Section: Family Info */}
          <div className="border-top pt-3 mt-3">
            <h5 className="text-dark fw-bold mb-3">👪 Family Information</h5>
            <div className="row">
              <Info label="Father's Name" value={user.father_name} />
              <Info label="Mother's Name" value={user.mother_name} />
            </div>
          </div>

          {/* Section: Nominee Info */}
          <div className="border-top pt-3 mt-3">
            <h5 className="text-dark fw-bold mb-3">🧾 Nominee Information</h5>
            <div className="row">
              <Info label="Nominee Name" value={user.nominee_name} />
              <Info label="Relation" value={user.nominee_relation} />
              <Info label="Age" value={user.nominee_age} />
              <Info label="Mobile" value={user.nominee_mobile} />
              <Info label="Address" value={user.nominee_address} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Reusable Field Component
const Info = ({ label, value }) => (
  <div className="col-md-4 mb-3">
    <div className="text-muted fw-semibold small mb-1">{label}</div>
    <div className="text-dark">{value || "—"}</div>
  </div>
);

export default Employee;
