import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  getDocs,
} from "firebase/firestore";

export default function Orders({ userObj }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOrders = async () => {
    const ordersRef = collection(dbService, "orders");
    console.log(userObj.uid);
    const userID = userObj?.uid;
    const q = query(
      collection(dbService, "orders"),
      where("userId", "==", userID)
    );
    const ordersArr = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((item) => {
      ordersArr.push(item.data());
    });
    setOrders(ordersArr);
    setIsLoading(false);
    console.log(ordersArr);
  };

  useEffect(() => {
    console.log("user effect");
    getOrders();
    console.log(orders);
  }, []);

  // getOrders();
  return (
    <div className="flex flex-col items-center">
      <h1 className="block text-center text-gray-700 text-lg font-bold my-4">
        {userObj?.displayName ? userObj?.displayName : "null"}'s Order History
      </h1>
      {isLoading && (
        <div>
          <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
        </div>
      )}
      {!isLoading && orders.length === 0 && "no order history"}
      <ul className="flex flex-col p-6 w-2/3 rounded-lg shadow-lg mb-3 divide-y-2">
        {orders?.map((item) => {
          return (
            <li className="flex p-6 w-full  mb-3">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                {/* <Link to={`/product/${item.productId}`}> */}
                <img
                  src={item.attachment || `/img/${item.url}`}
                  alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                  className="h-full w-full object-cover object-center"
                />
                {/* </Link> */}
              </div>

              <div className="ml-4 flex flex-1 flex-col w-96">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      {item.name}
                      {/* <Link to={`/product/${item.productId}`}>{item.name}</Link> */}
                    </h3>
                    {/* <p className="ml-4">${item.price}</p> */}
                    <p className="ml-4">Total: ${item.price * item.amount}</p>
                  </div>
                  {item.options?.length > 0 &&
                    item.options.map((option, index) => {
                      const name = Object.keys(option)[0];
                      const value = option[name];
                      console.log(name, value);
                      return (
                        <p
                          key={`options_${index}`}
                          className="mt-1 text-sm text-gray-500 flex justify-start"
                        >
                          {name}:{value}
                        </p>
                      );
                      // return (<p className="mt-1 text-sm text-gray-500 flex justify-start">good {option}</p>)
                    })}
                </div>
                <div className="flex flex-1 items-end justify-between text-sm mt-2">
                  <p className="text-gray-700">Amount: {item.amount}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
