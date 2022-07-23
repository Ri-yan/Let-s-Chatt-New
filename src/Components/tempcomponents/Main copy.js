import { useState,useEffect } from 'react';
import {useAuth} from '../Context/AuthContext'
import styled from 'styled-components'
import { ChatList, Firstchat,ChatPage } from '.'
import {ButtonGroup,DropdownButton,Dropdown,Form} from 'react-bootstrap';
import Default_Profile_Img from '../Components/Default_Profile_Img.png'
import Modal from 'react-bootstrap/Modal';
import LeftPanel from './LeftPanel';

const Main = () => {
  const [showchats, setShowChats] = useState(true)
  const [addclass, setaddclass] = useState(true)
  const [Count, setCount] = useState(0)
  const AddClass=()=>{
    setaddclass(false)
  }
  const Show=async(friendKey,friendName,friendImage)=>{
    handleClose();
    setShowChats(false);
    setaddclass(true);
    await AddFriend(friendKey,friendName,friendImage)
    // .then(LoadChatMessages(CurrentUserID,ActiveChatIdN,`${CurrentUserID+ActiveChatIdN}`))
  }
// //////////////////////////////////////////////////////////// login
  const {CurrentMessageID,LoadFriendList,friendsLoad,chatHeads,MessageSend,currentFriend,CurrentUserID,currentChat,Messages,ActiveChatIdN,LoadChatMessages,AddFriend,currentUser,ShowSignIn,ShowSignOut,logout,currentActiveUser,friendlist,setfriendsLoading,friendsLoading,setFriendList,LoadAllUsers } = useAuth()
  const [error, setError] = useState("")
  const {googleSignIn} = useAuth()
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      window.location.reload(true);
    } catch (err) {
      console.log(err.message);
      setError(err.message)
      alert(error)
    }
  };
   async function handleLogout() {
    setError("")
    try {
      await logout()
      window.location.reload(true);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      alert(error)
    }
  }
  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); }
  const handleShow = () => {setShow(true);  };
  
///////////////////////////////////////////////////////////////////// login
  return (
    <MainContainer>
      <span className='top'></span>
      <div  className="chatbox container-fluid bg-white shadow-lg rounded">
        <div className="row h-100">
          <LeftPanel currentActiveUser={currentActiveUser} addclass={addclass} currentUser={currentUser} 
          handleShow ={handleShow} show={show} handleGoogleSignIn ={handleGoogleSignIn} handleLogout ={handleLogout}
           handleClose ={handleClose} Show ={Show} ChatList ={ChatList} setCount ={setCount} Count ={Count}/>
          <div id='side-2' className={addclass?'col-md-8 ps-md-0':'col-md-8 ps-md-0 d-none'}>
          {
            showchats ? 
            <Firstchat ShowSignOut={ShowSignOut} handleLogout={handleLogout} handleGoogleSignIn={handleGoogleSignIn} AddClass={AddClass} />
            :
            <ChatPage Count={Count} Messages={Messages} LoadChatMessages={LoadChatMessages} CurrentMessageID={CurrentMessageID} 
            MessageSend={MessageSend} ActiveChatIdN={ActiveChatIdN} currentUser={currentUser} CurrentUserID={CurrentUserID}
             currentFriend={currentFriend} currentChat={currentChat} AddClass={AddClass} Show={Show} 
             setShowChats={setShowChats}/>
          } 
          </div>
      </div>
      </div>
    </MainContainer>
  )
}
const MainContainer = styled.div`
  background: linear-gradient(180deg,#dddbd1,#d2dbdc);
  height: 100vh;
  width: 100%;
  position: fixed;
  .top{
    height: 130px;
    width: 100%;
    background:#009688 ;
    position: fixed;
    z-index: -1;
  }
  .chatbox{
    margin-top:20px;
    height: calc(100% - 40px);
    width: 95%;
    padding: 0px;
  }
  .profile-pic{
    height: 40px;
    width: 40px;
  }
  .friend-pic{
    height: 50px;
    width: 50px;
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
    .dropdown-toggle::after {
      display: none !important;
    }
    .dropstart .dropdown-toggle::before{
      display: none !important;
    }
  .show>.btn-light.dropdown-toggle {
    background-color: #ffffff00 !important;
    border-color: #ffffff00 !important;
    border: none !important;
    padding-left: 0px;

}
.btn-light {
    color: #ffffff00 !important;
    background-color: #ffffff00 !important;
    border-color: #ffffff00 !important;
    border: none !important;
    padding-left: 0px;

} 
.dropdown-menu.show {
    display: block;
    transform: translate3d(-30px, 0px, 0px);
}
@media screen and (max-width:960px) {
  .chatbox{
    margin-top: 0px;
    width: -webkit-fill-available;
    height: 100vh;
  }
  /* .card{
    height: 100vh;
  } */
}
`

export default Main