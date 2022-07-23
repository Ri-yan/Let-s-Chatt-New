import { getFirestore} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const app = firebase.initializeApp({
  apiKey:process.env.React_App_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
})
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app

// import { getFirestore} from 'firebase/firestore';
// import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyAOH7xKX9G9bjlI_5tVTtPKip1w_5mtRi0",
//   authDomain: "chatt-server.firebaseapp.com",
//   databaseURL: "https://chatt-server-default-rtdb.firebaseio.com",
//   projectId: "chatt-server",
//   storageBucket: "chatt-server.appspot.com",
//   messagingSenderId: "779193614155",
//   appId: "1:779193614155:web:c9e12774ef4932fab632ce"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)
// export const db = getFirestore(app);
// export default app
