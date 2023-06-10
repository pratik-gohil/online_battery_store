import React, { useEffect, useState } from "react";

function ProfileOverview() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : null
    );
  }, []);

  return (
    <div>
      {user && (
        <>
          <img src={user.image} />
          <h1>{user.name}</h1>
          <h1>{user.email}</h1>
        </>
      )}
    </div>
  );
}

export default ProfileOverview;
