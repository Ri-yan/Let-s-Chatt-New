import  {Link}  from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Default_Profile_Img from '../Default_Profile_Img.png'
import grouppic from './grouppic.png'
const GroupList = ({Search,groupheads,GShow}) => {
    const {GroupLoadMessages} = useAuth()
    return(
        <div className="">
        {
            (groupheads.length!==0)?
            groupheads.filter(name => name.groupName.toLowerCase().includes(Search)).map((id,key)=>{
              return ( 
              <Link key={key} to={`group/${id.id}`}  >
                <li onClick={()=>{GShow(`${id.groupName}`,`${id.groupName}`,`${grouppic}`);GroupLoadMessages(id.groupName)}} key={key} className="list-group-item list-group-item-action">
                 <div className="row">
                   <div className="col-3 col-md-3 col-sm-2 mx-2">
                     <img  className='friend-pic rounded-circle ' src={grouppic} alt="profile img" />
                   </div>
                   <div className="col-7 col-md-7 col-sm-8 p-start-3 ">
                     <div className="name">{id.groupName}</div>
                     <div className="under-name">this is a group</div>
                   </div>
                 </div>
               </li>
               </Link>
                )
          }):<div className='text-center' style={{ fontSize: '10px',
            color: '#9CA1A3 ',
            marginTop: '2%',
            marginLeft:'2%'}}>no active groups</div>
          }
    </div>
    )
  
}

export default GroupList