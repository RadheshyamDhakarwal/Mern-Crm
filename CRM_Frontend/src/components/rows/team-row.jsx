import { NavLink } from "react-router-dom";

const RowTeam = ({index,data}) =>
{
    return(
        <tr>
            <td>{index}</td>
            {/* <td><figure className="avatar"> <img src={data.image} alt={data.name}/> </figure></td> */}
            <td>{data.name}</td>
            <td>
                { data.leader ?
                    <NavLink to='/' className='badge  bg-label-primary'>
                    {/* <img src={data.leader.image} className='avatar avatar-sm mr-2' alt="Person" width="96" height="96"/> */}
                    {data.leader.name}
                </NavLink>
                :
                <div className='badge  badge-light'>
                    {/* <img src='/assets/icons/user.png' className='avatar avatar-sm mr-2' alt="data" width="96" height="96"/> */}
                    No Leader
                </div> }
            </td>
            <td><div className={`badge ${data.status==='Active' ? 'bg-label-primary' :'bg-label-danger'}`}>{data.status}</div></td>
            <td><NavLink to={`/team/${data.id}`} className="bg-label-warning btn">Detail</NavLink></td>
        </tr>
    );
}

export default RowTeam;