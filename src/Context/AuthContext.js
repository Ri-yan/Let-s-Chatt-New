import { useContext, useState, useEffect,createContext,useRef } from "react"
import { auth,db } from "../firebase"
import { addDoc,updateDoc, collection,getDocs,doc,onSnapshot,query,where,orderBy} from "firebase/firestore";
import { GoogleAuthProvider,signInWithPopup,onAuthStateChanged,signOut } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState('')
  const [currentActiveUser, setCurrentActiveUser] = useState('')
  const [loading, setLoading] = useState(true)
  const [ShowSignIn, setShowSignIn] = useState('none')
  const [ShowSignOut, setShowSignOut] = useState(false)
  const [log, setlog] = useState(false)
  function logout() {
    return signOut(auth)
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth,googleAuthProvider);
  }

  const LastSeen=()=>{
    const data = {
      lastSeen:new Date().toLocaleString() 
    };
    const mrf=doc(db,"users",`${firebaseDocId}`)
    updateDoc(mrf, data)
    .then(docRef => {
        console.log("A New Document Field has been added to an existing document");
    })
    .catch(error => {
        console.log(error);
    })
  }
  const [firebaseDocId, setfirebaseDocId] = useState('')
  const [ CurrentUserID,  setCurrentUserID] = useState('')
  const onStateChange= async (user)=>{
  let CUID='';
  let userI='';
    const userRef=collection(db, 'users')
    let userprofile={
      UserID:"",
      email:"",
      name:"",
      photoURL:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      lastSeen:'online'
     }
    if(user){
      userprofile.email=user.email
      userprofile.name=user.displayName
      userprofile.photoURL=user.photoURL
      userprofile.UserID=user.uid
      let f=0
      await getDocs(userRef)
      .then((snaphot)=>{
        snaphot.docs.forEach((doc)=>{
          if(doc.data().email===userprofile.email){
            CUID=doc.data().UserID;
            userI=doc.id;
            f++;
          }
        })
      }
      )
      .catch(err=>{
        console.log(err.message)
      })
      if(f!==0){
        console.log('Welcome',`${userI}`)
        const data = {
          lastSeen:'online'
        };
        updateDoc(doc(db,'users',`${userI}`), data)
        .then(docRef => {
            console.log("A New Document Field has been added to an existing document");
        })
        .catch(error => {
            console.log(error);
        })
      }
      else{
        addDoc(userRef,userprofile)
        .then(userRef=>{
          CUID=user.uid;
          userI=userRef.id
          console.log('Welcome User',CUID);
        })
      }
     setShowSignIn('none');
     setShowSignOut(true);
     setCurrentActiveUser(true);
    } 
    else {
     setShowSignIn('block')
     setShowSignOut(false)
     setCurrentActiveUser(false)
    }  
    setCurrentUserID(CUID);
    setfirebaseDocId(userI);
  }

//For Creating the friend List
  const [CurrentMessageID, setCurrentMessageID] = useState('');
  const [currentChat, setcurrentChat] = useState(false)
  const [ActiveChatIdN, setActiveChatIdN] = useState('')
  const [currentFriend, setcurrentFriend] = useState( { name:'name',photoURL:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'})
  const AddFriend= async(friendKey,friendName,friendImage)=>{
    let ActiveChat='';
    let MessageID='';
    setcurrentFriend({
      UserID:`${friendKey}`,
      name:`${friendName}`,
      photoURL:`${friendImage}`,
      messageID:`${CurrentUserID+friendKey}`
    })
    let flag=true
    let friendDetail={
      friendId:friendKey,
      friendName:friendName,
      photoURL:friendImage,
      userId:CurrentUserID,
      messageID:`${CurrentUserID+friendKey}`
      // messageID:CurrentUserID+friendKey
    }
    const FRef =collection(doc(db, "friendList",CurrentUserID),'UserFriends')
    await getDocs(FRef)
      .then((snaphot)=>{
        snaphot.docs.forEach((user)=>{
          if((user.data().friendId===friendDetail.friendId))
          {
            ActiveChat=user.data().friendId;
            setcurrentChat(true);
            flag=false;
            MessageID=user.data().messageID;
          }
        })
      }
      )
      .catch(err=>{
        console.log(err.message)
      })
    if(flag){
        const docRef = doc(db, "friendList", CurrentUserID);
        const colRef = collection(docRef,'UserFriends');
       await addDoc(colRef,friendDetail)
        .then((docRef)=>{
          ActiveChat=friendDetail.friendId;
          setcurrentChat(true);
          console.log('friend added',docRef.id);
          MessageID=friendDetail.messageID;
          }
          )
        .catch(err=>{
          console.log(err.message)
        }) 

        await addDoc(collection(doc(db, "friendList",friendDetail.friendId),'UserFriends'),{
          friendId:CurrentUserID,
          friendName:currentUser.displayName,
          photoURL:currentUser.photoURL,
          userId:ActiveChatIdN,
          messageID:CurrentUserID+friendKey
        }).then(console.log('link established')).catch(err=>{
          console.log(err.message)
        }) 
    }    
     else{
      setcurrentChat(true);
      console.log('already in friends');
    }
    setActiveChatIdN(ActiveChat);
    setCurrentMessageID(MessageID);
    LoadChat(CurrentUserID,ActiveChat,MessageID)
    // LoadChatMessages(CurrentUserID,ActiveChat,MessageID);
    // console.log('Active Chat Head',ActiveChat);
    // console.log('MessageID ',MessageID)
  }

// For Loading All Contacts
  const [friendsLoading, setfriendsLoading] = useState(true)
  const [friendlist,setFriendList]=useState([])
  const LoadAllContacts = async (CUD)=>{
    try {
      console.log('CurrentUserID',CurrentUserID,currentUser.uid,currentUser)
      const userRef=collection(db, 'users');
      const q = query(userRef,where('UserID','!=',`${CUD}`))
      onSnapshot(q, (snapshots) => {
        let friends=[];
        snapshots.docs.forEach((doc)=>{
          if((doc.data().email!==currentUser.email) && (doc.data().UserID!==currentUser.uid))
            friends.push(doc.data());
      })
      setFriendList(friends);
      setfriendsLoading(false);
        })
    } catch (error) {
      console.log(error.message)
    }
    console.log(friendlist)
  }
//For Active ChatHeads 
  const [friendsLoad, setfriendsLoad] = useState(true)
  const [chatHeads, setchatHeads] = useState([])
  const LoadActiveChats=(id) => {
    const FRef =collection(doc(db, "friendList",`${id}`),'UserFriends')
    onSnapshot(FRef, (snapshots) => {
      const newFriend=[] 
      snapshots.docs.forEach((id)=>{
        newFriend.push(id.data());
      })
      setchatHeads(newFriend);
      setfriendsLoad(false)    
  });
  }
//For Sending Messages
  async function MessageSend(messageText,time){
    let message ={
      senderId:`${CurrentUserID}`,
      reciverId:`${ActiveChatIdN}`,
      messageText:messageText,
      time:new Date().toLocaleString(),
      messageID:CurrentMessageID
  }
    const messageRef =collection(doc(db,"MessageList",`${CurrentUserID+ActiveChatIdN}`),'messages')
    const messageRef2 =collection(doc(db,"MessageList",`${ActiveChatIdN+CurrentUserID}`),'messages')

    console.log('message is : ',message)
    await addDoc(messageRef,message)
    .then(console.log('message added'))
    .catch(err=>console.log(err.message))

    await addDoc(messageRef2,message)
    .then(console.log('message added'))
    .catch(err=>console.log(err.message))
  }




const [Messages, setMessages] = useState([]);
  const LoadChat=async(current,friendid,Mid)=>{
    try {
      const messageRef =query(collection(doc(db,"MessageList",`${current+friendid}`),'messages'),orderBy('time'))
      onSnapshot(messageRef, (snapshots) => {  
        let M=[];
        snapshots.docs.forEach((user)=>{
          console.log(user.data());
          M.push(user.data());
          })
          setMessages(M);
        }
      )
    } catch (err) {
      console.log(err.message)
    }
    
  }







const [SetSign, setSetSign] = useState(false)

// solution to useeffect twice running
  const shouldLog = useRef(true)
  useEffect(() => {
    if(shouldLog.current){
      shouldLog.current=false;
      const unsubscribe = onAuthStateChanged(auth,(user) => {
        console.log("Auth",user);
        setCurrentUser(user);
        setLoading(false);
        onStateChange(user);
        LoadActiveChats(user.uid);
        LoadAllContacts(user.uid)
       
    })
    return () => {
      unsubscribe();
    };
  }}, [])

  const value = {
    currentUser,
    logout,
    setSetSign,
    googleSignIn,
    ShowSignIn,
    ShowSignOut,
    currentActiveUser,
    friendlist,
    setFriendList,
    friendsLoading,
    setfriendsLoading,
    AddFriend,
    currentFriend,
    MessageSend,
    loading,chatHeads,
    friendsLoad,
    ActiveChatIdN,
    currentChat,
    CurrentUserID,
    CurrentMessageID,Messages, setMessages, LastSeen,setlog

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