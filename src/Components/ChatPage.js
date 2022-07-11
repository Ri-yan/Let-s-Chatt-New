import { useState ,useEffect,useRef} from 'react'
import styled from 'styled-components'
// import { auth,db } from "../firebase"
// import { addDoc, collection,getDocs,getDoc,doc,setDoc,onSnapshot,addDocs,query,collectionGroup, where,orderBy} from "firebase/firestore";
import {useAuth} from '../Context/AuthContext'
import { auth,db } from "../firebase"
import { addDoc, collection,getDocs,getDoc,doc,setDoc,onSnapshot,addDocs,query,collectionGroup, where,orderBy} from "firebase/firestore";


const Recieve=({messageText,time,img})=>{
  return(
    <div className="row">
          <div className="col-2 col-sm-1 col-md-1">
            <img className='chat-pic rounded-circle' src={img} alt="profile img" />
          </div>
          <div className="col-7 col-sm-7 col-sm-7">
              <p className='recieve'>
                {messageText}
              </p>
              <span className='time float-right'>{time}</span>
            </div>
        </div>
  )
}
const Sent=({messageText,time,img})=>{
  return(
      <div className="row justify-content-end">
          <div className="col-7 col-sm-7 col-sm-7 ">
              <p className='sent float-end'>
              {messageText}
              </p>
              <span className='time-sent float-end align-bottom m-end-2'>{time}</span>
            </div>
            <div className="col-2 col-sm-1 col-md-1">
            <img className='chat-pic rounded-circle' src={img} alt="profile img" />
          </div>
        </div>






  )
}
const ChatPage = ({LoadChatMessages,CurrentMessageID,MessageSend,Messages,ActiveChatIdN,currentUser,CurrentUserID,currentFriend,setShowChats,Show,AddClass,currentChat}) => {
const scrollRef = useRef();
  const [sentMessage, setSentMessage] = useState('');
  const [sendButton, setsendButton] = useState(false);
const{LoadChat}= useAuth()
const onSub=async(e)=>{
    e.preventDefault()
    let message ={
        messageText:sentMessage,
        time:new Date().toLocaleString()
    }
    if(sentMessage!==''){
    await MessageSend(sentMessage,message.time)
    document.getElementById('txtMessage').value='';
    setSentMessage('');
    setsendButton(false);
    }
    if(document.getElementById('txtMessage').value==='')
    setsendButton(false);

}
// useEffect(() => {
//   if(document.getElementById('txtMessage').value==='')
//     setsendButton(false);
//     else
//     setsendButton(true);
//     scrollRef.current?.scrollIntoView({behaviour:"smooth"});
// }, [Messages])
const shouldLog = useRef(true)

const [Me, setMe] = useState([]);
useEffect(() => {
  if(shouldLog.current){
    shouldLog.current=false;
    console.log('currentFriend',currentFriend.messageID)
  // const messageRef =query(collection(doc(db,"MessageList",`${currentUser.uid+currentFriend.UserID}`),'messages'),orderBy('time'))
  const unsub=()=>onSnapshot(query(collection(doc(db,"MessageList",`${currentUser.uid+currentFriend.UserID}`),'messages'),orderBy('time')), (snapshots) => {  
    const M=[];
    snapshots.docs.forEach((user)=>{
      console.log('Helllllloo',`${currentUser.uid+ActiveChatIdN}`)
      console.log(user.data());
      M.push(user.data());
      })
      // setMessages(M);
      setMe(M);
      scrollRef.current?.scrollIntoView({behaviour:"smooth"});
    })
  return () => unsub();
}}, [])



  return (
    <Chatpage>
    <div className="card" >
      <div className="card-header">
        <div className="row" >
          <div className="col-1 col-sm-1 col-md-1 col-lg-1 d-md-none">
            <i onClick={()=>setShowChats(true)} className="fa fa-arrow-left mt-2"></i>
          </div>
          {/* profile pic */}
          <div className="col-2 col-sm-2 col-md-2 col-lg-1">
            <img onClick={()=>AddClass(false)} className='rounded-circle profile-pic' src={currentFriend.photoURL} alt="profile img" />
          </div>
          {/* name and seen */}
          <div className="col-3 col-sm-5 col-md-7 col-lg-9">
            <div className="name">{currentFriend.name}</div>
            <div className="under-name">last seen on 2/7/2022</div>
          </div>
          {/* settings */}
          <div className="col-6 col-sm-4 col-md-3 col-lg-2 float-right">
            <i  className="fa-solid fa-magnifying-glass icon mt-2 "></i>
            <i className="fa-solid fa-paperclip icon ml-4"></i>
            <i className="fa-solid fa-ellipsis-vertical icon ml-4"></i>
          </div>
        </div>
      </div>
      <div className="card-body " id='Messages' ref={scrollRef}>
        {
       (ActiveChatIdN===currentFriend.UserID) ? (
        (Me.length!==0)?Me.map((id,key)=>{
          if(id.senderId===CurrentUserID){
            return(
              <Sent key={key} messageText={id.messageText} time={id.time} img={currentUser.photoURL}/>
            )
          }
          else{
            return(
              <Recieve key={key} messageText={id.messageText} time={id.time} img={currentFriend.photoURL}/>
            )
          }
        }
       )
        :<div className='text-center time'>Start chat by sending</div>
        )
        :
          <div className="text-center "style={{width:'100%',height:'50vh'}}>
        <span className="spinner-border text-primary mt-5" style={{width:'3rem',height:'3rem'}}></span>
      </div>
      }


      </div>

      <div className="card-footer">
        <form onSubmit={onSub} className="row">
          <div className="col-2 col-md-1">
            <i className="far fa-grin fa-2x"></i>
          </div>
          <div className="col-8 col-md-10">
            <input id='txtMessage' 
             onChange={(e)=>{setSentMessage(e.target.value); setsendButton(true)}}  
              type="text" className='form-control form-rounded' placeholder='Type here' name=""  />
          </div>
          <div  className="col-2 col-md-1">
          <i onClick={onSub} className={sendButton?'fas fa-paper-plane fa-2x':'fas fa-microphone fa-2x'}></i>
          </div>
        </form>
      </div>
      </div>
    </Chatpage>
  )
}
const Chatpage = styled.div`
  .profile-pic{
    height: 40px;
    width: 40px;
  }
  .form-rounded{
    border-radius: 1rem;
  }
    .name{
      font-weight: 400;
      color: #000;
    }
    .under-name{
      font-weight: 400;
      color: #000;
      font-size: 12px;
      line-height: 15px;
      max-height: 15px;
    }
    .icon{
      font-size: 20px;
      color: #9CA1A3;
      margin-left: 1em;
      cursor: pointer;
    }
  .chat-pic{
    height: 30px;
    width: 30px;
  }
  .recieve{
    background: lightgreen;
    border-radius: 1rem;
    padding: 10px 15px;
    display: inline-block;
  }
  .sent{
    background: whitesmoke;
    border-radius: 1rem;
    padding: 10px 15px;
    display: inline-block;
  }
  .time{
    font-size: 10px;
    color: #9CA1A3 ;
    margin-top: 2%;
    margin-left: 2%;
  }
  .time-sent{
    font-size: 10px;
    color: #9CA1A3 ;
    margin-right: 3%;
    margin-top: 3.5%;

  }
  .card{
    height: 94vh;
    /* height: calc(100% - 40px); */
    overflow-y: scroll;

  }
  #Messages{
    overflow-y: scroll;
    overflow-x: hidden;

  }
  .card-footer{
    /* position: sticky;
    bottom: 16px;
    background: whitesmoke; */
  }
  @media screen and (max-width:960px) {
  .card{
    height: 100vh;
  }
}
  `
export default ChatPage