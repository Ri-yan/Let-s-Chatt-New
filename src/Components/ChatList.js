import {useEffect,useState,useRef} from 'react'
import { doc, onSnapshot ,collection} from "firebase/firestore";
import { auth,db } from "../firebase"
const ChatHead=({Show,Name,last_message,friendKey,friendName,friendImage})=>{
  return(
    <li  onClick={()=>Show(`${friendKey}`,`${friendName}`,`${friendImage}`)} className="list-group-item list-group-item-action">
        <div className="row">
          <div className="col-3 col-md-3 col-sm-2 mx-2">
            <img className='friend-pic rounded-circle ' src={friendImage} alt="profile img" />
          </div>
          <div className="col-7 col-md-7 col-sm-8 p-start-3 "
          //  style={{paddingLeft:'40px'}}
           >
            <div className="name">{Name}</div>
            <div className="under-name">{last_message}</div>
          </div>
        </div>
      </li>
  )
}
const ChatList = ({currentUser,LoadFriendList,CurrentUserID,Show,friendsLoad,chatHeads}) => {
  // useEffect(() => {
  //   const unsub=()=>{if(currentUser)LoadFriendList(currentUser.uid)}
  //   return () => unsub();
  // }, [chatHeads,currentUser])
  const [Chats, setChats] = useState([])
  const [Fload, setFload] = useState(true)

  const shouldLog = useRef(true)

// useEffect(() => {
//   if(shouldLog.current){
//     shouldLog.current=false;
//   const FRef =collection(doc(db, "friendList",`${currentUser.uid}`),'UserFriends')
//   const unsub = onSnapshot(FRef, (snapshots) => {
//     const newFriend=[] 
//     snapshots.docs.forEach((id)=>{
//       newFriend.push(id.data());
//       // console.log("Current data: ", id.data());
//     })
//     setChats(...Chats,newFriend);
//     setFload(false);
// });
//   return () => unsub;
// }}, [])


  





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