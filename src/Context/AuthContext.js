import { useContext, useState, useEffect,createContext,useRef } from "react"
import { auth,db } from "../firebase"
import { addDoc, collection,getDocs } from "firebase/firestore";

import { GoogleAuthProvider,signInWithPopup,onAuthStateChanged,signOut } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState('')
  const [currentActiveUser, setCurrentActiveUser] = useState('')

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
  
 const onStateChange= async (user)=>{

    const userRef=collection(db, 'users')
    let userprofile={
      email:"",
      name:"",
      photoURL:""
     }
    if(user){
      userprofile.email=user.email
      userprofile.name=user.displayName
      userprofile.photoURL=user.photoURL
      let f=0
      await getDocs(userRef)
      .then((snaphot)=>{
        snaphot.docs.forEach((doc)=>{
          if(doc.data().email===userprofile.email){
            f++
          }
        })
      })
      .catch(err=>{
        console.log(err.message)
      })
      if(f!==0){
        console.log(' User already exist')
      }
      else{
        addDoc(userRef,userprofile)
        console.log('user Added')
      }
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

// solution to useeffect twice running
  const shouldLog = useRef(true)
  useEffect(() => {
    if(shouldLog.current){
      shouldLog.current=false;
      onfirebaseStateChange()
      const unsubscribe = onAuthStateChanged(auth,(user) => {
        setCurrentUser(user)
        // onStateChange(user)
        setLoading(false)
        // onfirebaseStateChange()
    })
    return ()=>unsubscribe
    
  }}, [])

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