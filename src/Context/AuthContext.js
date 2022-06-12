import { useContext, useState, useEffect,createContext } from "react"
import { auth } from "../firebase"
import {GoogleAuthProvider,signInWithPopup,onAuthStateChanged,signOut} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState('')
  const [currentActiveUser, setCurrentActiveUser] = useState(false)

  const [loading, setLoading] = useState(true)
  const [ShowSignIn, setShowSignIn] = useState('none')
  const [ShowSignOut, setShowSignOut] = useState(false)

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
    //   let userprofile ={ email:'',name:'',photoURL:''}
    //   userprofile.email=currentUser.email
    //   userprofile.name=currentUser.displayName
    //   userprofile.photoURL=currentUser.photoURL
    //  faDatabase().ref('users').push(userprofile,callback())
     setShowSignIn('none')
     setShowSignOut(true)
     setCurrentActiveUser(true)
    } 
    else {
     setShowSignIn('block')
     setShowSignOut(false)
     setCurrentActiveUser(false)
    }   
  }
 const callback=()=>{
  //  if(error){
  //    alert(error)
  //  }
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
    googleSignIn,
    ShowSignIn,
    ShowSignOut,
    currentActiveUser
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