import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { viewEmployeeSalary } from "../../http";
import { toast } from "react-toastify";
import Loading from "../Loading";

const Salary = () => {
  const { user } = useSelector((state) => state.authSlice);
  const [salary, setSalary] = useState();
console.log(user.user);
console.log(salary);


  useEffect(() => {
    const obj = {
      employeeID: user.id,
    };
    // console.log(user.id);
    const fetchData = async () => {
      const res = await viewEmployeeSalary(obj);
      const { success, data } = res;
      if (data.length > 0) {
        setSalary(res.data[0]);
      } else toast.error(user.name + "'s" + " " + "Salary not found");
    };
    fetchData();
  }, []);

  return (
    <>
      {salary ? (
        <div className="main-content">
          <section className="section">
              <div className="section-header ps-0">
                {!salary ? (
                  <h1>Salary not yet updated</h1>
                ) : (
                  <h1>Updated Salary from {salary?.assignedDate}</h1>
                )}
            </div>

            <div className={` ${salary ? "" : "d-none"}`}>
              <div className="card-body row">
                {/* <div className="col-md-3 ">
                  <img
                    className="img-fluid img-thumbnail"
                    src={user.image}
                    alt=""
                  />
                </div> */}
                <div className="col-md-12">
                  <table className="table border roundedtable">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Address</th>
                        <th>Salary</th>
                        <th>Bonus</th>
                        <th>Reason for Bonus</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{user?.user?.name}</td>

                        <td>{user?.user?.email}</td>
                        <td>{user?.user?.mobile}</td>
                        <td>{user?.user?.permanent_address}</td>
                        <td> Rs. {salary?.salary}</td>
                        <td> Rs. {salary?.bonus}</td>
                        <td>{salary?.reasonForBonus}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Salary;
