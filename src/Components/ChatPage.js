import { useState ,useEffect,useRef} from 'react'
import styled from 'styled-components'
import {ButtonGroup,DropdownButton,Dropdown,Form} from 'react-bootstrap';

// import { auth,db } from "../firebase"
// import { addDoc, collection,getDocs,getDoc,doc,setDoc,onSnapshot,addDocs,query,collectionGroup, where,orderBy} from "firebase/firestore";
import {useAuth} from '../Context/AuthContext'
import { auth,db } from "../firebase"
import { addDoc, collection,getDocs,getDoc,doc,setDoc,onSnapshot,addDocs,query,collectionGroup, where,orderBy} from "firebase/firestore";
import  {Link,useNavigate}  from "react-router-dom";

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
const ChatPage = ({Count,CurrentMessageID,MessageSend,ActiveChatIdN,currentUser,CurrentUserID,currentFriend,setShowChats,Show,AddClass,currentChat}) => {
const scrollRef = useRef();
const [sentMessage, setSentMessage] = useState('');
const [sendButton, setsendButton] = useState(false);
const{LoadChat,Messages, setMessages}= useAuth()
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
// const [Messages, setMessages] = useState([]);
const [Seen, setSeen] = useState('XXX');
const shouldLog = useRef(true)
useEffect(() => {
  if(shouldLog.current){
    shouldLog.current=false;
    console.log('currentFriend messageid',currentFriend.messageID);
  const messageRef =query(collection(doc(db,"MessageList",`${currentUser.uid+currentFriend.UserID}`),'messages'),orderBy('time'))
  const unsub=()=>onSnapshot(messageRef, (snapshots) => {  
    const M=[];
    snapshots.docs.forEach((user)=>{
      // console.log(user.data());
      M.push(user.data());
      setMessages([])
      })
      console.log('Messages : ',M);
      setMessages(M);
      scrollRef.current?.scrollIntoView({behaviour:"smooth"});
    })
  return () => unsub();
}}, [])
useEffect(() => {
  onSnapshot(collection(db,'users'), (snapshots) => {  
    let stat='';
    snapshots.docs.forEach((user)=>{
      if(user.data().UserID===ActiveChatIdN)
      stat=user.data().lastSeen;
  })
  setSeen(stat)
});
  scrollRef.current?.scrollIntoView({behavior: 'smooth'});
}, [Messages]);
const navigate = useNavigate();
  return (
    <Chatpage>
    <div className="card" >
      <div className="card-header">
        <div className="row" >
          <div className="col-1 col-sm-1 col-md-1 col-lg-1 d-md-none">
            <i onClick={()=>{setShowChats(true); navigate('/Let-s-Chatt-New/#chatpage');}} className="fa fa-arrow-left mt-2"></i>
          </div>
          {/* profile pic */}
          <div className="col-2 col-sm-2 col-md-2 col-lg-1">
            <img onClick={()=>AddClass(false)} className='rounded-circle profile-pic' src={currentFriend.photoURL} alt="profile img" />
          </div>
          {/* name and seen */}
          <div className="col-7 col-sm-5 col-md-7 col-lg-9">
            <div className="name">{currentFriend.name}</div>
            <div className="under-name">{Seen}</div>
          </div>
          {/* settings */}
          <div className="col-2 col-sm-4 col-md-3 col-lg-2 float-right" style={{display:'flex',alignItems:'baseline'}}>
            <i  className="fa-solid fa-magnifying-glass icon mt-2 d-none d-md-block d-lg-block"></i>
            <i className="fa-solid fa-paperclip icon ml-4 d-none d-md-block d-lg-block"></i>
            {/* <i className="fa-solid fa-ellipsis-vertical icon ml-4 mt-1"></i> */}
            <DropdownButton
                            as={ButtonGroup}
                            key={'start'}
                            id={'dropdown-toggle-drop-start bg-transparent'}
                            // drop={'start'}
                            variant="light"
                            title={
                                    <span>
                                      <i className="fas fa-ellipsis-v icon" style={{cursor:'pointer',float:'right '}}></i>
                                    </span>
                                  }
                            >
                      <Dropdown.Item  eventKey="1">Feature 1</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Feature 2</Dropdown.Item>
                      <Dropdown.Item id='linkSignOut' eventKey="3">Feature 3</Dropdown.Item>
                    </DropdownButton> 
          </div>
        </div>
      </div>
      <div className="card-body " id='Messages' >
        {
       (ActiveChatIdN===currentFriend.UserID) ? (
        (Messages.length!==0)?Messages.map((id,key)=>{
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

<div  ref={scrollRef} />

      </div>

      <div className="card-footer">
        <form onSubmit={onSub} className="row">
          <div className="col-2 col-md-1">
            <i className="far fa-grin fa-2x"></i>
          </div>
          <div className="col-8 col-md-10">
            <textarea rows="2" cols="50" required autofocus id='txtMessage' 
             onChange={(e)=>{setSentMessage(e.target.value); setsendButton(true)}}  
              type="text" className='form-control form-rounded textareaElement' placeholder='Type here' name=""  />
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
textarea { 
  min-height: 2.1em;
  max-height:fit-content;
  resize: vertical; 
  max-width: 100%; 
    max-height: 100px;
 }
 .textareaElement {
  max-width: 100%; 
  min-height: 2.1em;
  max-height: 3em;
  overflow-x: hidden;
  overflow-y: auto;
}
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
    max-width: 100%;
    max-height: fit-content;
  }
  .sent{
    background: whitesmoke;
    border-radius: 1rem;
    padding: 10px 15px;
    display: inline-block;
    max-width: 100%;
    max-height: fit-content;
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