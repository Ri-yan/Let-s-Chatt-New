import { useContext, useState, useEffect,createContext } from "react"
import { auth } from "../firebase"
import {GoogleAuthProvider,signInWithPopup,onAuthStateChanged,signOut} from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState('')
  const [loading, setLoading] = useState(true)

  function logout() {
    return signOut(auth)
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth,googleAuthProvider);
  }

  const onfirebaseStateChange=()=>{
    onAuthStateChanged(auth,onStateChange)
  }
  const onStateChange=(user)=>{
    if(user){
      // alert(user.displayName)
     document.getElementById("Profile_Img").src = user.photoURL
     document.getElementById("Profile_Img").title = user.displayName
     document.getElementById("Profile_Name").innerHTML = `${user.displayName}`
    }    
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      setCurrentUser(user)
      onfirebaseStateChange(user)
      setLoading(false)
    })
    return ()=> {unsubscribe();}
  }, [])

  const value = {
    currentUser,
    logout,
    googleSignIn
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
export function useAuth() {
  return useContext(AuthContext)
}