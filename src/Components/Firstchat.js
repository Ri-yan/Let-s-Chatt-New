import { useAuth } from "../Context/AuthContext"
import { useState } from 'react';

const Firstchat = ({AddClass,currentUser, setCurrentUser}) => {
  const { logout } = useAuth()
  const [error, setError] = useState("")

  const {googleSignIn} = useAuth()
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error.message);
    }
  };
  async function handleLogout() {
    setError("")
    try {
      await logout()
      window.location.reload(true);
    } catch {
      setError("Failed to log out")
    }
  }
  return (
    // <div className="col-md-8 pl-0" id='side-2'>
        <div className="text-center pt-5">
            <i className="fas fa-comments mt-5" style={{fontSize:'250px'}}></i>
            <h3 className="mt-4">You need to click chat head</h3>
            <a href="#" className='d-md-none' style={{cursor:'pointer'}} onClick={AddClass}>New Chat</a>
            <a 
            onClick={handleGoogleSignIn} 
            href="#" className='btn btn-primary mx-1' style={{cursor:'pointer'}} >Sign In</a>
            <a href="#" className='btn btn-primary mx-1 right' style={{cursor:'pointer'}} 
                     onClick={handleLogout}
                     >Sign Out</a> 
            </div>
    // </div>
  )
}

export default Firstchat

