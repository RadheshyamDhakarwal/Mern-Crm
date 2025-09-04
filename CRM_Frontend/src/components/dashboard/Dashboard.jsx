import { useSelector } from "react-redux";
import HeaderSection from "../HeaderSection";
import Admin from "./Admin";
import Employee from "./Employee";
import Leader from "./Leader";

const Dashboard = () =>
{
  const {user} = useSelector(state=>state.authSlice);
    return(
        <div className="main-content">
        <section className="section">
        <div className="d-flex align-items-baseline">
        <i class="bi bi-grid-1x2-fill me-2" style={{fontSize:"16px"}}></i> <HeaderSection title='Dashboard'/>

        </div>
          {
            user?.user?.type=='Admin' ? <Admin/> : user?.user?.type==='Leader' ? <Leader/> : <Employee/>
          }
        </section>
      </div>
    )
}

export default Dashboard;