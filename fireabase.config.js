// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_apiKey,
//   authDomain: process.env.NEXT_PUBLIC_authDomain,
//   projectId: process.env.NEXT_PUBLIC_projectID,
//   storageBucket: process.env.NEXT_PUBLIC_storageBucket,
//   messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
//   appId: process.env.NEXT_PUBLIC_appId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAYIdDKdtcsdoXJp0EENDNAkNt-eYdp3As",
  authDomain: "authentication-dbe78.firebaseapp.com",
  projectId: "authentication-dbe78",
  storageBucket: "authentication-dbe78.appspot.com",
  messagingSenderId: "889379813691",
  appId: "1:889379813691:web:d0a8e5ef08fffc5bf51f1e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
