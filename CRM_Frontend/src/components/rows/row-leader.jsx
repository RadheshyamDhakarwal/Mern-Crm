import { NavLink } from "react-router-dom";

const RowLeader = ({index,data}) =>
{
    return(
        <tr>
            <td>{index}</td>
            {/* <td><figure className="avatar"> <img src={data.image} alt={data.name}/> </figure></td> */}
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.mobile}</td>
            <td><div className={`badge ${data.status==='Active' ? 'bg-label-primary' :'bg-label-danger'}`}>{data.status}</div></td>
            <td>
                { data.team && Object.keys(data.team).length!==0 ?
                    <NavLink to={`/team/${data.team.id}`} className='badge  bg-label-primary'>
                    {/* <img src={data.team.image} className='avatar avatar-sm mr-2' alt="Person" width="96" height="96"/> */}
                    {data.team.name}
                </NavLink>
                :
                <div className='badge  badge-light'>
                    {/* <img src='/assets/icons/team.png' className='avatar avatar-sm mr-2' alt="Person" width="96" height="96"/> */}
                    No Team
                </div> }
            </td>
            <td><NavLink to={`/employee/${data.id}`} className="btn bg-label-warning">Detail</NavLink></td>
        </tr>
    );
}

export default RowLeader;