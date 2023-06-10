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

  return (
    <div>
      <h1>orders</h1>
      {orders &&
        orders.map((order) => (
          <div key={order.checkoutSessionId}>
            <p className="price">{order.amountTotal}</p>
            {order.products.map((product) => (
              <div key={product.id}>
                <p>{product.description}</p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export default ProfileOrders;
