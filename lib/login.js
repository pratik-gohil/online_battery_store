import { signInWithPopup } from "firebase/auth";

import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { app } from "../fireabase.config";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const handleLogin = async () => {
  return signInWithPopup(
    auth,
    provider.setCustomParameters({ prompt: "select_account" })
  )
    .then((result) => {
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

      return true;
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
      return false;
    });
};

export default handleLogin;
