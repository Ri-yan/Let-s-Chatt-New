import React from 'react'
const ChatHead=({Show,Name,last_message})=>{
  return(
    <li  onClick={Show} className="list-group-item list-group-item-action">
        <div className="row">
          <div className="col-md-2">
            <img className='friend-pic' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile img" />
          </div>
          <div className="col-md-10">
            <div className="name">{Name}</div>
            <div className="under-name">{last_message}</div>
          </div>
        </div>
      </li>
  )
}
const ChatList = ({Show}) => {
  return (
    <ul className="list-group list-group-flush ">
      {/* search box */}
      <li  className="list-group-item" style={{background: '#f8f8f8'}}>
        <input type="search" name="Search" id="" className='form-control form-rounded' />
      </li>
      
      {/* chat heads */}
      <ChatHead Show={Show} Name={'John Dove'} last_message={'See you soon'}/>
      <ChatHead Show={Show} Name={'Riyan'} last_message={'Some messages'}/>
      <ChatHead Show={Show} Name={'Eleven'} last_message={'Some messages'}/>
      <ChatHead Show={Show} Name={'Steven'} last_message={'Some messages'}/>
      <ChatHead Show={Show} Name={'User name'} last_message={'Some messages'}/>
      <ChatHead Show={Show} Name={'User Name'} last_message={'Some messages'}/>
      
    </ul>
  )
}

export default ChatList