import React, { useEffect, useState } from "react";
import { db } from "../../fireabase.config";
import { collection, getDocs, query, where } from "firebase/firestore";

function ProfileOrders() {
  const [orders, setOrders] = useState([]);
  const user = localStorage.getItem("user");

  useEffect(async () => {
    const { _id } = JSON.parse(user);

    if (_id) {
      const querySnapshot = await getDocs(
        query(collection(db, "orders"), where("uid", "==", _id))
      );

      const orderDocs = [];

      querySnapshot.forEach((doc) => orderDocs.push(doc.data()));

      setOrders(orderDocs);
    }
  }, [user]);

  // console.log(orders);

  return (
    <div>
      {/* {orders.map((order) => {
        <h1>Order</h1>;
        // order
      })} */}
      orders
    </div>
  );
}

export default ProfileOrders;
