import { Link } from "react-router-dom"

const Firstchat = ({ShowSignOut,handleGoogleSignIn,handleLogout,AddClass}) => {
  return (
        <div className="text-center pt-5">
            <i className="fas fa-comments mt-5" style={{fontSize:'250px'}}></i>
            <h3 className="mt-4">You need to click chat head</h3>
            <Link to={'/'}className='d-md-none' 
            style={{cursor:'pointer'}} onClick={AddClass}
            >New Chat</Link>
            {/* <a href="/Let-s-Chatt-New/#chatpage" className='d-md-none' 
            style={{cursor:'pointer'}} onClick={AddClass}>New Chat</a> */}
            <button 
            onClick={handleGoogleSignIn} 
            className={!ShowSignOut?'btn btn-primary mx-1':'btn btn-primary mx-1 d-none'}
             style={{cursor:'pointer'}} >Sign In</button>
            <button 
             className={ShowSignOut?'btn btn-primary mx-1 right':'btn btn-primary mx-1 right d-none'} 
             style={{cursor:'pointer'}} 
             onClick={handleLogout}>Sign Out</button> 
            </div>
  )
}

export default Firstchat

