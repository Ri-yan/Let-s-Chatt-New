import React from 'react'
import {useAuth} from '../Context/AuthContext'
import {ButtonGroup,DropdownButton,Dropdown,Form} from 'react-bootstrap';
import Default_Profile_Img from '../Components/Default_Profile_Img.png'
import Modal from 'react-bootstrap/Modal';
import  {Link}  from "react-router-dom";

const ChatBar = ({Show,friend}) => {
  return (
    <Link to={`Let-s-Chatt-New/${friend.UserID}`} style={{ textDecoration:'unset'}}>
      <div onClick={()=>{Show(`${friend.UserID}`,`${friend.name}`,`${friend.photoURL}`)}} className="col-9 col-sm-9 col-md-10" >
                                  <div className="d-flex">
                                    <img className='profile-pic rounded-circle m-2'
                                    src={friend.photoURL}
                                    style={{height:'44px',width:'44px'}}
                                    alt="profile img" title='no'/>
                                    <p className='my-auto mx-3' id='Profile_Name'>
                                    {friend.name}
                                    </p>
                                    </div>
                                </div>   
                                </Link>
  )
}

const LeftPanel = ({addclass,handleShow,
  handleGoogleSignIn,
  handleLogout,
  handleClose,
  Show,
  ChatList,
  setCount,
  Count,show}) => {
  const {CurrentMessageID,LoadFriendList,friendsLoad,chatHeads,MessageSend,currentFriend,CurrentUserID,currentChat,Messages,ActiveChatIdN,LoadChatMessages,AddFriend,currentUser,ShowSignIn,ShowSignOut,logout,currentActiveUser,friendlist,setfriendsLoading,friendsLoading,setFriendList,LoadAllUsers } = useAuth()

  return (
    <div id='side-1 '
          className={addclass?'col-md-4 pe-md-0 d-none d-md-block':'col-md-4 pe-md-0'}
          >
            <div className="card">
              <div className="card-header h-100">
                <div className="row">
                  <div className="col-10 col-sm-9 col-md-10">
                    <div className="d-flex">
                      <img className='profile-pic rounded-circle'
                      id='Profile_Img'
                      src={currentActiveUser?currentUser.photoURL:Default_Profile_Img}
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
                            id={'dropdown-toggle-drop-start bg-transparent'}
                            drop={'start'}
                            variant="light"
                            title={
                                    <span>
                                      <i className="fas fa-ellipsis-v icon" style={{cursor:'pointer',float:'right '}}></i>
                                    </span>
                                  }
                            >
                      <Dropdown.Item onClick={()=>{handleShow()}} data-toggle="modal" data-target="#modalFriendlist" className={ShowSignOut?'d-block':'d-none'} eventKey="1">New Chat</Dropdown.Item>
                      <Dropdown.Item className={!ShowSignOut?'d-block':'d-none'} onClick={handleGoogleSignIn} id='linkSignIn' style={{display:{ShowSignIn}}} eventKey="2">Sign In</Dropdown.Item>
                      <Dropdown.Item id='linkSignOut' eventKey="3">Something else here</Dropdown.Item>
                      <Dropdown.Divider
                      className={ShowSignOut?'d-block':'d-none'}
                      />
                      <Dropdown.Item onClick={handleLogout} className={ShowSignOut?'d-block':'d-none'}  style={{display:{ShowSignOut}}} eventKey="4">Sign Out</Dropdown.Item>
                    </DropdownButton> 
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Friend List</Modal.Title>
                      </Modal.Header>
                      <Modal.Body >
                      <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="email"
                          placeholder="Search Friend"
                          autoFocus
                        />
                      </Form.Group>
                    </Form>
                      <div className="card">
                        <ul className="list-group list-group-flush overflow-auto" id='listFriend' >
                          {
                            friendsLoading ? 
                              <div className="text-center "style={{width:'100%',height:'50vh'}}>
                                <span className="spinner-border text-primary mt-5" style={{width:'7rem',height:'7rem'}}></span>
                              </div>
                            :
                            friendlist.map((friend,index)=>{
                              return( 
                                 <ChatBar style={{ textDecoration:'unset'}} key={index} Show={Show}  friend={friend} />
                                )
                              }) 
                        }
                            </ul>
                          </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
              </div>
              </div>
            <ChatList setCoun={setCount} Count={Count} currentUser={currentUser} LoadFriendList={LoadFriendList} CurrentUserID={CurrentUserID}
             friendsLoad={friendsLoad} chatHeads={chatHeads} Show={Show} />
          </div>
  )
}

export default LeftPanel