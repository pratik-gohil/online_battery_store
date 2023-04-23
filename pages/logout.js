import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

function logout() {
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    signOut(auth)
      .then(() => {
        toast.success("Log Out Successfully!");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("user-change"));
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return null;
}

export default logout;
