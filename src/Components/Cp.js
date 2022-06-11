import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Recieve=()=>{
  return(
    <div className="row">
          <div className="col-2 col-sm-1 col-md-1">
            <img className='chat-pic' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile img" />
            
          </div>
          <div className="col-7 col-sm-7 col-sm-7">
              <p className='recieve'>This message from reciver
              This message from reciver
              This message from reciver
              This message from reciver
              </p>
              <span className='time float-right'>9:15 PM</span>
            </div>
        </div>
  )
}
const Sent=({message})=>{
  const m='This message from reciver'+'This message from reciver'+'This message from reciver'
  +'This message from reciver'
  return(
    <div className="row justify-content-end">
          <div className="col-7 col-sm-7 col-sm-7 ">
              <p className='sent float-right'>
              {m}
              {message}
              </p>
              <span className='time float-right'>9:15 PM</span>
            </div>
            <div className="col-2 col-sm-1 col-md-1">
            <img className='chat-pic' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile img" />
          </div>
        </div>
  )
}
const ChatPage = ({setShowChats,Show,AddClass}) => {
const [sentMessage, setSentMessage] = useState('')

const onKeyDown=(e)=>{
    e.target.addEventListener('keydown',(key)=>{
      if(key.which ===13){
        SendMessage();
      }
    })
  }
  const SendMessage=(e)=>{
      var message=`<div className="row justify-content-end">
                    <div className="col-7 col-sm-7 col-sm-7 ">
                      <p className='sent float-right'>          
                        ${document.getElementById('txtMessage').value}
                     </p>
                     <span className='time float-right'>9:15 PM</span>
                    </div>
                    <div className="col-2 col-sm-1 col-md-1">
                      <img style={{height:'30px',width:'30px'}} className='chat-pic' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile img" />
                    </div>
                  </div>`;
    document.getElementById('Messages').innerHTML+= message;
    document.getElementById('txtMessage').value=''
    document.getElementById('txtMessage').focus();

    document.getElementById('Messages').scrollTo(0,document.getElementById('Messages').clientHeight);

  }

  return (
    <Chatpage>
    <div className="card" >
      <div className="card-header">
        <div className="row" >
          <div className="col-1 col-sm-1 col-md-1 col-lg-1 d-md-none">
            <i onClick={()=>setShowChats(true)} className="fas fa-list mt-3"></i>
          </div>
          {/* profile pic */}
          <div className="col-2 col-sm-2 col-md-2 col-lg-1">
            <img className='profile-pic' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile img" />
          </div>
          {/* name and seen */}
          <div className="col-3 col-sm-5 col-md-5 col-lg-7">
            <div className="name">Name</div>
            <div className="under-name">last seen</div>
          </div>
          {/* settings */}
          <div className="col-6 col-sm-4 col-md-4 col-lg-3">
            <i className="fa-solid fa-magnifying-glass icon mt-2"></i>
            <i className="fa-solid fa-paperclip icon ml-4"></i>
            <i className="fa-solid fa-ellipsis-vertical icon ml-4"></i>
          </div>
        </div>
      </div>
      <div className="card-body " id='Messages'>
        <Recieve/>
        <Sent/>
        <Recieve/>
        <Sent/>
        <Recieve/>
        <Sent/>
        {paragraphs}
      </div>

      <div className="card-footer">
        <div className="row">
          <div className="col-2 col-md-1">
            <i className="far fa-grin fa-2x"></i>
          </div>
          <div className="col-8 col-md-10">
            <input id='txtMessage' onClick={onKeyDown}
            //  onChange={(e)=>{setSentMessage(e.target.value); console.log(sentMessage)}}  
              type="text" className='form-control form-rounded' placeholder='Type here' name=""  />
          </div>
          <div className="col-2 col-md-1">
            <i onClick={Click} className='fas fa-microphone fa-2x'></i>
          </div>
        </div>
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
    margin-left: 1%;
  }
  .card{
    height: 94vh;
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
  `
export default ChatPage