import { signInWithPopup } from "firebase/auth";

import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { app, db } from "../fireabase.config";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const handleLogin = async () => {
  return signInWithPopup(
    auth,
    provider.setCustomParameters({ prompt: "select_account" })
  )
    .then(async (result) => {
      // The signed-in user info.
      const user = result.user;

      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: user.uid,
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        })
      );

      window.dispatchEvent(new Event("user-change"));

      const docRef = await doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return true;
      }

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });

      return true;
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
      return false;
    });
};

export default handleLogin;
