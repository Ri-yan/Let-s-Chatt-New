import React from 'react'
import { useEffect,useState } from 'react';
import {useAuth} from '../Context/AuthContext'
import {ButtonGroup,DropdownButton,Dropdown,Form, Button} from 'react-bootstrap';
import Default_Profile_Img from '../Components/Default_Profile_Img.png'
import Modal from 'react-bootstrap/Modal';
import  {Link,useNavigate}  from "react-router-dom";
import { auth,db } from "../firebase"

const ChatBar = ({Show,friend}) => {
  return (
    <Link to={`/${friend.UserID}`} style={{ textDecoration:'unset',color:'black'}}>
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

const LeftPanel = ({addclass,handleShow,GShow,
  handleGoogleSignIn,
  handleLogout,
  handleClose,
  Show,
  ChatList,
  setCount,
  Count,show}) => {
  const {groupheads,AddNewGroup,CurrentMessageID,LastSeen,LoadFriendList,friendsLoad,chatHeads,MessageSend,currentFriend,CurrentUserID,currentChat,Messages,ActiveChatIdN,LoadChatMessages,AddFriend,currentUser,ShowSignIn,ShowSignOut,logout,currentActiveUser,friendlist,setfriendsLoading,friendsLoading,setFriendList,LoadAllUsers } = useAuth()
  let nav = useNavigate();


  const onClose = () => {
    if(window.confirm(" are you sure you want to close this page ？")){
      window.opener=null;
      window.open('','_self');
      window.close();
      window.self.close()
 }
 else{}
  };

  const [Gshow, setGShow] = useState(false);
  const GhandleClose = () => {setGShow(false); setContactSearch([]); setgroupMembers([]);setgroupName('') }
  const GhandleShow = () => {setGShow(true); setContactSearch([]) };
const [ContactSearch, setContactSearch] = useState('')
  const [groupMembers, setgroupMembers] = useState([])
  const [groupName, setgroupName] = useState('')
  const AddGroupMembers = (e)=>{
    if(e.target.checked){
      groupMembers.push(e.target.value)
      console.log('added',e.target.value);
    }
    else if(!e.target.checked){
      groupMembers.forEach((id,i)=>{
        if(id===e.target.value){
          groupMembers.splice(i,1)
          console.log('removed',id,i);
        }
      })
    }
  }
  const CreateGroup =(e)=>{
    e.preventDefault();
    if(groupMembers.length===0)
    console.log('no members selected')
    else{
      try {
        AddNewGroup(groupName,groupMembers)
        console.log('group '+groupName+' with members',groupMembers);
        GhandleClose();
      } catch (error) {
        console.log(error.message)
      }
      
    }

  }
  
  return (
    // <div id='side-1 'className={addclass?'col-md-4 pe-md-0 d-none d-md-block':'col-md-4 pe-md-0'} >
      <div className="">
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
                            align={{ lg: 'end' }}                            drop={'start'}
                            variant="light"
                            title={
                                    <span>
                                      <i className="fas fa-ellipsis-v icon" style={{cursor:'pointer',float:'right '}}></i>
                                    </span>
                                  }
                            >
                      <Dropdown.Item onClick={()=>{handleShow()}} data-toggle="modal" data-target="#modalFriendlist" className={ShowSignOut?'d-block':'d-none'} eventKey="1">New Chat</Dropdown.Item>
                      <Dropdown.Item onClick={GhandleShow} data-toggle="modal" data-target="#modalFriendlist" className={ShowSignOut?'d-block':'d-none'} eventKey="3">Create Group</Dropdown.Item>
                      <Dropdown.Item className={!ShowSignOut?'d-block':'d-none'} onClick={handleGoogleSignIn} id='linkSignIn' style={{display:{ShowSignIn}}} eventKey="2">Sign In</Dropdown.Item>
                      <Dropdown.Item id='linkSignOut' eventKey="3" onClick={onClose}>Something else here</Dropdown.Item>
                      <Dropdown.Divider
                      className={ShowSignOut?'d-block':'d-none'}
                      />
                      <Dropdown.Item onClick={()=>{handleLogout(); LastSeen(); nav('/');}} className={ShowSignOut?'d-block':'d-none'}  style={{display:{ShowSignOut}}} eventKey="4">Sign Out</Dropdown.Item>
                    </DropdownButton> 

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Friend List</Modal.Title>
                      </Modal.Header>
                      <Modal.Body >
                      <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="name"
                          placeholder="Search Friend"
                          autoFocus
                          onChange={(e)=>setContactSearch(e.target.value.toLowerCase())}
                        />
                      </Form.Group>
                    </Form>
                      <div className="card" style={{overflowY: 'scroll',maxHeight:' 20em'}}>
                        <ul className="list-group list-group-flush overflow-auto" id='listFriend' >
                          {
                            friendsLoading ? 
                              <div className="text-center "style={{width:'100%',height:'50vh'}}>
                                <span className="spinner-border text-primary mt-5" style={{width:'7rem',height:'7rem'}}></span>
                              </div>
                            :
                            friendlist.filter(name => name.name.toLowerCase().includes(ContactSearch)).map((friend,index)=>{
                              return( 
                                 <ChatBar style={{ textDecoration:'unset'}} key={index} Show={Show}  friend={friend} />
                                )
                              }) 
                        }
                            </ul>
                          </div>
                      </Modal.Body>
                    </Modal>




                    <Modal show={Gshow} onHide={GhandleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add to group</Modal.Title>
                      </Modal.Header>
                      <Modal.Body >
                        <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Control
                          type="name"
                          placeholder="Search Friend"
                          autoFocus
                          onChange={(e)=>setContactSearch(e.target.value.toLowerCase())}
                        />
                      </Form.Group>
                    </Form>
                      <div className="card" style={{overflowY: 'scroll',maxHeight:' 15em'}}>
                        <ul className="list-group list-group-flush overflow-auto" id='listFriend' >
                          {
                            friendsLoading ? 
                              <div className="text-center "style={{width:'100%',height:'50vh'}}>
                                <span className="spinner-border text-primary mt-5" style={{width:'7rem',height:'7rem'}}></span>
                              </div>
                            :
                            friendlist.filter(name => name.name.toLowerCase().includes(ContactSearch)).map((friend,index)=>{
                              return( 
                                <div key={index} className="col-9 col-sm-9 col-md-10" >
                                  <div className="d-flex">
                                    <img className='col-6 profile-pic rounded-circle m-2'
                                    src={friend.photoURL}
                                    style={{height:'44px',width:'44px'}}
                                    alt="profile img" title='no'/>
                                    <p className='col-10 my-auto mx-3' id='Profile_Name'>
                                    {friend.name}
                                    </p>
                                    <input type="checkbox" value={friend.UserID} onChange={(AddGroupMembers)} className='col-1' name="" id="" ></input>
                                    </div>
                                </div>
                                )
                              }) 
                        }
                            </ul>
                          </div>
                          
                      </Modal.Body>
                      <Modal.Body>

                      <Form onSubmit={CreateGroup}>
                        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput3">
                        <label htmlFor="exampleGInputName">Enter the Group Name</label>
                        <Form.Control
                         type="name"
                         onChange={(e)=>{setgroupName(e.target.value)}}
                         placeholder="Group Name..." required
                          autoFocus
                        />
                      </Form.Group>
                   
                      <Modal.Footer>   
                        <Button variant="secondary" onClick={GhandleClose}>
                          Cancel
                        </Button>
                        <Button variant="primary" type='submit'>
                          Add New Group
                        </Button>
                      </Modal.Footer>
                     </Form>
                     </Modal.Body>
                    
                    </Modal>
                  </div>
                </div>
              </div>
              </div>
            <ChatList GShow={GShow} groupheads={groupheads} setCoun={setCount} Count={Count} currentUser={currentUser} LoadFriendList={LoadFriendList} CurrentUserID={CurrentUserID}
             friendsLoad={friendsLoad} chatHeads={chatHeads} Show={Show} />
          {/* </div> */}
          </div>
  )
}

export default LeftPanel