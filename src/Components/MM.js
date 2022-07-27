import { useState,useEffect} from 'react';
import {useAuth} from '../Context/AuthContext'
import styled from 'styled-components'
import { ChatList, Firstchat,ChatPage } from '.'
import LeftPanel from './LeftPanel';
import  {useNavigate}  from "react-router-dom";
import { auth,db } from "../firebase"
import { addDoc,collection,updateDoc,getDocs,getDoc,doc,setDoc,onSnapshot,addDocs,query,collectionGroup, where,orderBy} from "firebase/firestore";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import GroupChat from './Group/GroupChat';
const MM = () => {
  const [showchats, setShowChats] = useState(true)
  const [addclass, setaddclass] = useState(true)
  const [CurrentgroupKey, setCurrentgroupKey] = useState([])
  const [Count, setCount] = useState(0)
  const AddClass=()=>{
    setaddclass(false)
  }


  const [unHide, setunHide] = useState(false)
  const Show=async(friendKey,friendName,friendImage)=>{
    setunHide(true);
    setCount(1)
    handleClose();
    setShowChats(false);
    setaddclass(true);
    await AddFriend(friendKey,friendName,friendImage)
  }
  const GShow=async(friendKey,friendName,friendImage)=>{
    setShowChats(false);
    setunHide(true);
    setCount(1)
    handleClose();
    setShowChats(false);
    setaddclass(true);
    console.log("idddddd",friendKey.split(" ").join(""))
    var c={
      key:friendKey,
      name:friendName,
      image:friendImage,
      id:friendKey.split(" ").join("")
    }
    setCurrentgroupKey(c);
    await GroupLoadMessages(friendKey);
    AddNewGroup(friendKey,friendName)
  }
// //////////////////////////////////////////////////////////// login
  const {AddNewGroup,GroupLoadMessages,setlog,groupheads,LastSeen,CurrentMessageID,LoadFriendList,friendsLoad,chatHeads,MessageSend,currentFriend,CurrentUserID,currentChat,Messages,ActiveChatIdN,LoadChatMessages,AddFriend,currentUser,ShowSignIn,ShowSignOut,logout,currentActiveUser,friendlist,setfriendsLoading,friendsLoading,setFriendList,LoadAllUsers } = useAuth()
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
    setlog(true);
    try {
      LastSeen();
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
    <BrowserRouter>
    <MainContainer>
      <span className='top'></span>
      <div  className="chatbox container-fluid bg-white shadow-lg rounded">
        <div className="row h-100">
        {
            (auth.currentUser!=null)?<><div id='side-1 '
            // className={addclass?'col-md-4 pe-md-0 d-none d-md-block':'col-md-4 pe-md-0'} 
            className={`col-md-4 pe-md-0 ${unHide?'d-none d-md-block':'d-block'}`}
            > 
              <LeftPanel GShow={GShow} groupheads={groupheads} currentActiveUser={currentActiveUser} addclass={addclass} currentUser={currentUser} 
                  handleShow ={handleShow} show={show} handleGoogleSignIn ={handleGoogleSignIn} handleLogout ={handleLogout}
                  handleClose ={handleClose} Show ={Show} ChatList ={ChatList} setCount ={setCount} Count ={Count}/>
              </div>
            <div id='side-2'
            //  className={addclass?'col-md-8 ps-md-0':'col-md-8 ps-md-0 d-none'}
             className={`col-md-8 ps-md-0  ${unHide?'d-block':'d-none d-md-block'}`}
             >
              {
                (Count!==0)?<Routes>
                  <Route path={`/group/${CurrentgroupKey.id}`} element={<PrivateRoute><GroupChat CurrentgroupKey={CurrentgroupKey} Count={Count} Messages={Messages} LoadChatMessages={LoadChatMessages} CurrentMessageID={CurrentMessageID} 
                MessageSend={MessageSend} ActiveChatIdN={ActiveChatIdN} currentUser={currentUser} CurrentUserID={CurrentUserID}
                 currentFriend={currentFriend} currentChat={currentChat} AddClass={AddClass} Show={Show} setunHide={setunHide}
                 setCount={setCount}    setShowChats={setShowChats}/></PrivateRoute>}></Route>
                  <Route path={`/${ActiveChatIdN}`} element={<PrivateRoute><ChatPage Count={Count} Messages={Messages} LoadChatMessages={LoadChatMessages} CurrentMessageID={CurrentMessageID} 
                MessageSend={MessageSend} ActiveChatIdN={ActiveChatIdN} currentUser={currentUser} CurrentUserID={CurrentUserID}
                 currentFriend={currentFriend} currentChat={currentChat} AddClass={AddClass} Show={Show} setunHide={setunHide}
                 setCount={setCount}    setShowChats={setShowChats}/></PrivateRoute>}>
                  </Route></Routes>:<Firstchat ShowSignOut={ShowSignOut} handleLogout={handleLogout} handleGoogleSignIn={handleGoogleSignIn} AddClass={AddClass} />
              }
            </div></>
             :<Firstchat ShowSignOut={ShowSignOut} handleLogout={handleLogout} handleGoogleSignIn={handleGoogleSignIn} AddClass={AddClass} />
        }
      </div>
      </div>
    </MainContainer>
    </BrowserRouter>
  )
}
const MainContainer = styled.div`

  background: linear-gradient(180deg,#dddbd1,#d2dbdc);
  height: 100vh;
  width: 100%;
  position: fixed;
  .react-emoji-picker--wrapper{
  right: unset;
}
  a{
    text-decoration: unset;
}
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
    /* border: 3px solid #0fc144c2; */
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
  right:0px;
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

export default MM