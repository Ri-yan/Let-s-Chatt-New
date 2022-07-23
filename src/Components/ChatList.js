import {useState,useRef} from 'react'
import  {Link}  from "react-router-dom";

const ChatHead=({Show,Name,last_message,friendKey,friendName,friendImage,setCount,Count})=>{
  return(
    <Link to={`/${friendKey}`}  >
    <li  onClick={()=>{Show(`${friendKey}`,`${friendName}`,`${friendImage}`)}} className="list-group-item list-group-item-action">
        <div className="row">
          <div className="col-3 col-md-3 col-sm-2 mx-2">
            <img  className='friend-pic rounded-circle '  src={friendImage} alt="profile img" />
          </div>
          <div className="col-7 col-md-7 col-sm-8 p-start-3 ">
            <div className="name">{Name}</div>
            <div className="under-name">{last_message}</div>
          </div>
        </div>
      </li></Link>
  )
}
const ChatList = ({currentUser,LoadFriendList,CurrentUserID,Show,friendsLoad,chatHeads,setCount,Count}) => {
  const [Chats, setChats] = useState([])
  const [Fload, setFload] = useState(true)
  const shouldLog = useRef(true)
  return (
    <ul className="list-group list-group-flush" style={{height:'84vh',overflowY:'scroll'}}>
      <li  className="list-group-item" style={{background: '#f8f8f8'}}>
        <input type="search" name="Search" id="" className='form-control form-rounded' />
      </li>
        {
          friendsLoad?
          <div className="text-center "style={{width:'100%',height:'50vh'}}>
            <span className="spinner-border text-primary mt-5" style={{width:'3rem',height:'3rem'}}></span>
          </div>
          :(chatHeads.length!==0)?
          chatHeads.map((id,key)=>{
            return (
              <ChatHead friendKey={id.friendId} friendName={id.friendName} friendImage={id.photoURL}
              key={key} Show={Show} Name={id.friendName} last_message={'See you soon'}/>
              )
        }):<div className='text-center' style={{ fontSize: '10px',
          color: '#9CA1A3 ',
          marginTop: '2%',
          marginLeft:'2%'}}>no active chats</div>
        }
    </ul>
  )
}

export default ChatList