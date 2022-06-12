import { useState } from 'react';
import {useAuth} from '../Context/AuthContext'
import styled from 'styled-components'
import { ChatPage,ChatList, Firstchat } from '.'
import {ButtonGroup,DropdownButton,Dropdown} from 'react-bootstrap';
import Default_Profile_Img from '../Components/Default_Profile_Img.png'

const Main = () => {
  const [showchats, setShowChats] = useState(true)
  const [addclass, setaddclass] = useState(true)
  const AddClass=()=>{
    setaddclass(false)
  }
  const Show=()=>{
    setShowChats(false)
    setaddclass(true)
  }
// //////////////////////////////////////////////////////////// login
  const { currentUser,ShowSignIn,ShowSignOut,logout,currentActiveUser } = useAuth()
  const [error, setError] = useState("")
  const {googleSignIn} = useAuth()
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
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
///////////////////////////////////////////////////////////////////// login
  return (
    <MainContainer>
      <span className='top'></span>
      <div  className="chatbox container-fluid bg-white shadow-lg rounded">
        <div className="row h-100">
          <div id='side-1'
          className={addclass?'col-md-4 pr-0 d-none d-md-block':'col-md-4 pr-0'}
          >
            <div className="card">
              <div className="card-header h-100">
                <div className="row">
                  <div className="col-1 col-sm-1 col-md-1 d-md-none">
                    <i onClick={()=>setaddclass(true)} className="fa fa-arrow-left mt-2" style={{fontSize:'20px',cursor:'pointer'}}></i>
                  </div>
                  <div className="col-9 col-sm-9 col-md-10">
                    <div className="d-flex">
                      <img className='profile-pic rounded-circle'
                      id='Profile_Img'
                      src={
                        currentActiveUser? currentUser.photoURL:Default_Profile_Img
                      }
                      alt="profile img" title='no'/>
                      <p className='my-auto mx-3' id='Profile_Name'>
                        {currentActiveUser? currentUser.displayName:''}
                      </p>
                      </div>
                  </div>                        
                  <div style={{float:'right'}} className="col-2 col-sm-2 col-md-2 m-0 p-0">
                    <DropdownButton
                            as={ButtonGroup}
                            key={'start'}
                            id={'dropdown-toggle-drop-start bg-transparent '}
                            drop={'start'}
                            variant="light"
                            title={
                                    <span>
                                      <i className="fas fa-ellipsis-v icon" style={{cursor:'pointer',float:'right '}}></i>
                                    </span>
                                  }
                            >
                      <Dropdown.Item className={ShowSignOut?'d-block':'d-none'} eventKey="1">New Chat</Dropdown.Item>
                      <Dropdown.Item className={!ShowSignOut?'d-block':'d-none'} onClick={handleGoogleSignIn} id='linkSignIn' style={{display:{ShowSignIn}}} eventKey="2">Sign In</Dropdown.Item>
                      <Dropdown.Item id='linkSignOut' eventKey="3">Something else here</Dropdown.Item>
                      <Dropdown.Divider
                      className={ShowSignOut?'d-block':'d-none'}
                      />
                      <Dropdown.Item onClick={handleLogout} className={ShowSignOut?'d-block':'d-none'}  style={{display:{ShowSignOut}}} eventKey="4">Sign Out</Dropdown.Item>
                    </DropdownButton>  
                  </div>
                </div>
              </div>
              </div>
            <ChatList Show={Show} />
          </div>
          <div className={addclass?'col-md-8 pl-0':'col-md-8 pl-0 d-none'}
           id='side-2'>
          {
            showchats ? <Firstchat ShowSignOut={ShowSignOut} handleLogout={handleLogout} handleGoogleSignIn={handleGoogleSignIn} AddClass={AddClass} />
            :<ChatPage AddClass={AddClass} Show={Show} setShowChats={setShowChats}/>
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
`

export default Main