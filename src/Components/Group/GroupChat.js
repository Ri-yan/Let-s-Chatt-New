import { useState ,useEffect,useRef} from 'react'
import styled from 'styled-components'
import {useAuth} from '../../Context/AuthContext'
import {ButtonGroup,DropdownButton,Dropdown,Form} from 'react-bootstrap';
import InputEmoji from "react-input-emoji";
import { auth,db } from "../../firebase"
import { addDoc, collection,getDocs,getDoc,doc,setDoc,onSnapshot,addDocs,query,collectionGroup, where,orderBy} from "firebase/firestore";
import  {Link,useNavigate}  from "react-router-dom";
import sent from '../../sound/sent.mp3'
import recieve from '../../sound/recieve.mp3'
import sendicon from '../../sound/sendicon.png'
import bg from '../../sound/bg2.png'
import grouppic from './grouppic.png'
const Recieve=({messageText,time,img,senderId,name,photo})=>{
  // const [reciveMessageDetails, setreciveMessageDetails] = useState({
  //   name:'sender',
  //   photoURL:`${grouppic}`
  // })
  //     const shouldLog = useRef(true)
  //     useEffect(() => {
  //       if(shouldLog.current){
  //         shouldLog.current=false;
  //       const unsub=()=>getDocs(collection(db,'users'))
  //       .then((snaphot)=>{
  //         snaphot.docs.forEach((user)=>{
  //           if(senderId===user.data().UserID){
  //             setreciveMessageDetails({name:`${user.data().name}`,photoURL:`${user.data().photoURL}`})
  //           }
  //         })
  //       }
  //       )
  //       .catch(err=>{
  //         console.log(err.message)
  //       })
  //       return () => unsub();
  //     }
  //   }, [time])
  return(
    <div className="row" style={{marginBottom:'30px'}}>
          <div className="col-2 col-sm-1 col-md-1">
            <img className='chat-pic rounded-circle' src={photo} alt="profile img" title={name} />
          </div>
          <div className="col-7 col-sm-7 col-sm-7 sss">
              <p className=''>
                {messageText}
              </p>
              <span className='time '>{time}</span>
            </div>
        </div>
  )
}

const Sent=({messageText,time,img})=>{
  return(
      <div className="row justify-content-end "style={{marginBottom:'30px'}}>
          <div className="col-7 col-sm-7 col-sm-7 rrr ">
              <p className=''>
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

const GroupChat = ({CurrentgroupKey,Count,setCount,setunHide,CurrentMessageID,MessageSend,ActiveChatIdN,currentUser,CurrentUserID,currentFriend,setShowChats,Show,AddClass,currentChat}) => {
 const {SendGroupMessage,setGMessages,GMessages}=useAuth();
const scrollRef = useRef();
const [sentMessage, setSentMessage] = useState('');
const [sendButton, setsendButton] = useState(false);
const{LoadChat,Messages, setMessages}= useAuth()
const onSub=async(e)=>{
    e.preventDefault()
    let message ={
        messageText:sentMessage,
        time:new Date().toLocaleString('en-US'),
        
    }
    if(sentMessage!==''){
      new Audio(sent).play();
    await SendGroupMessage(sentMessage,CurrentgroupKey.name,`${currentUser.displayName}`,`${currentUser.photoURL}`).then(setSentMessage(''))
    // document.getElementById('GtxtMessage').value='';
    setSentMessage('');
    setsendButton(false);
    scrollRef.current?.scrollIntoView({behaviour:"smooth"});

    }
    // if(document.getElementById('GtxtMessage').value==='')
    // setsendButton(false);
   
}

const [Seen, setSeen] = useState('XXX');
const shouldLog = useRef(true)
useEffect(() => {
  if(shouldLog.current){
    shouldLog.current=false;
    const messageRef =query(collection(doc(db,"GroupMessageList",`${CurrentgroupKey.key}`),'messages'),orderBy('time'))
    const unsub=()=>onSnapshot(messageRef, (snapshots) => {  
    const M=[];
    snapshots.docs.forEach((user)=>{
      // console.log(user.data());
      M.push(user.data());
      setGMessages([])
      })
      setGMessages(M);
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


useEffect(() => {
  if(sentMessage!='') setsendButton(true); else setsendButton(false);
}, [sentMessage])
const CClick=()=>{
  setShowChats(true); navigate('/'); setunHide(false);setCount(0);  
}
const navigate = useNavigate();
  return (
    <Groupchat>
    <div className="card" >
      <div className="card-header">
        <div className="row" >
          <div className="col-1 col-sm-1 col-md-1 col-lg-1 d-md-none">
            <i onClick={CClick} className="fa fa-arrow-left mt-2"></i>
          </div>
          {/* profile pic */}
          <div className="col-2 col-sm-2 col-md-2 col-lg-1">
            <img onClick={()=>AddClass(false)} className='rounded-circle profile-pic' src={CurrentgroupKey.image} alt="profile img" />
          </div>
          {/* name and seen */}
          <div className="col-7 col-sm-5 col-md-7 col-lg-9">
            <div className="name">{CurrentgroupKey.name}</div>
            <div className="under-name">members</div>
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
      <div className="card-body " style={{ backgroundImage:`url(${bg})` }} id='Messages' >
        {
       (CurrentgroupKey) ? (
        (GMessages.length!==0)?GMessages.map((id,key)=>{
          if(id.senderId===CurrentUserID){
            return(
              <Sent key={key} messageText={id.messageText} time={id.time} img={currentUser.photoURL}/>
            )
          }
          else{
            return(
              <Recieve key={key} name={id.name} photo={id.photoURL} senderId={id.senderId} messageText={id.messageText} time={id.time} img={currentFriend.photoURL}/>
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
          {/* <div className="col-2 col-md-1">
            <i className="far fa-grin fa-2x"></i>
          </div> */}
          <div className="col-10 col-md-11">
          <InputEmoji
          className='rr'
          id={'GtxtMessage'}
      value={sentMessage}
      onChange={setSentMessage}
      placeholder="Type a message"
    />
            {/* <textarea rows="2" cols="50" required autoFocus id='GtxtMessage' 
             onChange={(e)=>{setSentMessage(e.target.value); setsendButton(true)}}  
              type="text" className='form-control form-rounded textareaElement' placeholder='Type here' name=""  />
           */}
          </div>
          <div  className="col-2 col-md-1  ps-2 pe-0 mx-auto mt-1 ">
            {
              sendButton?<img onClick={onSub} style={{paddingLeft:'7px'}} className='icon-color' src={sendicon} alt="" />: <i onClick={onSub} className='fas fa-microphone fa-2x icon-color'></i>
            }
          {/* <i onClick={onSub} className={sendButton?'fas fa-paper-plane fa-2x icon-color':'fas fa-microphone fa-2x icon-color'}></i> */}
          </div>
        </form>
      </div>
      </div>
    </Groupchat>
  )
}
const Groupchat = styled.div`
.sss{
  display: flex;
  flex-direction: column;
    max-width: max-content;
    padding: 15px 10px;
    transform: translateY(18px);
    background: #ffffff;
    border-top-left-radius:5px !important;
    border-radius: 1rem;
    padding: 10px 15px 5px 15px;
    max-height: fit-content;
    box-shadow: 0 0 9px 0px #59595961;
    min-width: min-content;

}
.sss p{
  background: #ffffff;
  margin: 0px;

}
.rrr{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
    max-width: max-content;
    padding: 15px 10px;
    transform: translateY(18px);
    background: lightgreen;
    border-top-right-radius:5px !important;
    border-radius: 1rem;
    padding: 10px 15px 5px 15px;
    max-height: fit-content;
    box-shadow: 0 0 9px 0px #59595961;
    min-width: min-content;
}
.rrr p{
  background: lightgreen;
  margin: 0px;

}
.card-body{
  background-size: contain;
  background-repeat: round;
}
.react-emoji{
  flex-direction: row-reverse;
}
.react-emoji-picker--wrapper{
  right: unset;
}
.react-input-emoji--container{
  border-radius: 10px !important;
}
/* .react-input-emoji--button{
    background: white !important;
    padding: 7px !important;
    border-top-left-radius: 10px !important;
    border-bottom-left-radius: 10px !important;
    margin-right: -11px !important;
    border: 0.1px solid #66666612 !important;
} */
.icon-color{
  border: 1px solid #0fc144c2;
    border-radius: 60%;
    padding: 5px 10px;
    background: #0fc144c2;
    color: white;
    margin: auto;
}
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
    background: whitesmoke;
    border-top-left-radius:5px !important;
    border-radius: 1rem;
    padding: 10px 15px;
    display: inline-block;
    max-width: 100%;
    max-height: fit-content;
    transform: translateY(10px);
  }
  .sent{    
    background: lightgreen;
    border-top-right-radius:5px !important;
    border-radius: 1rem;
    padding: 10px 15px;
    display: inline-block;
    max-width: 100%;
    max-height: fit-content;
    transform: translateY(10px);
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
export default GroupChat