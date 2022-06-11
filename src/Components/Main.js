import { useState } from 'react';
import styled from 'styled-components'
import { ChatPage,ChatList, Firstchat } from '.'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import {ButtonGroup} from 'react-bootstrap';
import {useAuth} from '../Context/AuthContext'

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


  
  const { currentUser } = useAuth()
  const [error, setError] = useState("")

  
  // const history = useNavigate()
  // const { login,googleSignIn } = useAuth()
  // const [error, setError] = useState("")
  // const [loading, setLoading] = useState(false)
  // const handleGoogleSignIn = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await googleSignIn();
  //     history("/");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  return (
    <MainContainer>
      <span className='top'></span>
      <div  className="chatbox container-fluid bg-white shadow-lg rounded">
        <div className="row h-100">
          <div id='side-1'
          //  className="col-md-4 pr-0 d-none d-md-block"
          className={addclass?'col-md-4 pr-0 d-none d-md-block':'col-md-4 pr-0'}
          >
            <div className="card">
              <div className="card-header h-100">
                <div className="row">
                  <div className="col-1 col-sm-1 col-md-1 d-md-none">
                    <i onClick={()=>setaddclass(true)} className="fa fa-arrow-left mt-2" style={{fontSize:'20px',cursor:'pointer'}}></i>
                  </div>
                  <div className="col-9 col-sm-9 col-md-9">
                    <div className="d-flex">
                      <img className='profile-pic rounded-circle'
                      id='Profile_Img'
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      alt="profile img" title='no'/>
                      <p className='my-auto mx-3' id='Profile_Name'>Name</p>
                      </div>
                  </div>                        
                  <div className="col-2 col-sm-2 col-md-2">
                  
                    <div className="dropleft">
                      <span className="dropdown-toggle" data-toggle="dropdown">
                        <i className="fas fa-ellipsis-v icon" onClick={()=>setaddclass(true)} style={{cursor:'pointer',float:'right '}}></i>
                        <DropdownButton
                    // as={ButtonGroup}
                    key={'start'}
                    id={'dropdown-toggle-drop-start bg-transparent'}
                    drop={'start'}
                    variant="light"
                    title={''}
                  >
                  <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                  </DropdownButton>
                      </span>
                      <div className="dropdown-menu">
                        <a href="#" id='linkSign' className="dropdown-item">Sign In</a>
                        <a href="#" id='linkSignOut' className="dropdown-item">Sign Out</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            <ChatList Show={Show} />

          </div>
      
          <div className={addclass?'col-md-8 pl-0':'col-md-8 pl-0 d-none'}
          // className="col-md-8 pl-0"
           id='side-2'>
          {
            showchats ? <Firstchat currentUser={currentUser}  AddClass={AddClass} />:<ChatPage AddClass={AddClass} Show={Show} setShowChats={setShowChats}/>
          } 
          </div>
          {/* <div className="mx-auto my-3 ">
            <button  onClick={handleGoogleSignIn}>Signin</button>
          </div> */}
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

}
.btn-light {
    color: #ffffff00 !important;
    background-color: #ffffff00 !important;
    border-color: #ffffff00 !important;
    border: none !important;
}
`

export default Main