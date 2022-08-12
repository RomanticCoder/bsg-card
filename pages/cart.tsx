import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import CartItem from "../src/components/CartItem";

import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";
import { dbService, storageService } from "../src/fbase";
import { v4 as uuidv4 } from "uuid";

const Home: NextPage = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsFromLC, setCartItemsFromLC] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userObj = props.userObj;
  const isLoggedIn = Boolean(userObj);

  function getCartItemsfromLocalStorage() {
    setCartItemsFromLC(JSON.parse(localStorage.getItem("cart")));
  }

  const deleteItem = async (id, attachmentUrl) => {
    const docRef = doc(dbService, "carts", id);
    await deleteDoc(docRef);
    if (attachmentUrl) {
      const imageRef = ref(storageService, attachmentUrl);
      await deleteObject(imageRef);
    }
  };

  const updateQty = async (id, amount) => {
    const docRef = doc(dbService, "carts", id);
    await updateDoc(docRef, {
      amount: amount,
    });
  };

  function getCartItemsfromFB() {
    const cartsRef = collection(dbService, "carts");
    const q = query(
      cartsRef,
      // orderBy("createdAt", "desc"),
      where("userId", "==", userObj ? userObj.uid : "")
    );

    onSnapshot(q, (snapshot) => {
      const cartItemsArr = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setCartItems(cartItemsArr);
    });
  }

  async function implementLocalStorageCart() {
    console.log("implement first");
    console.log(cartItemsFromLC);
    cartItemsFromLC.forEach(async (item) => {
      console.log(item);
      let attachmentUrl = "";
      if (item.attachment !== "") {
        const storageRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        await uploadString(storageRef, item.cartInfo.attachment, "data_url");
        attachmentUrl = await getDownloadURL(storageRef);
      }

      const itemObj = {
        ...item,
        userId: userObj.uid,
        attachmentUrl,
      };
      await addDoc(collection(dbService, "carts"), itemObj);
      getCartItemsfromFB();
      setCartItemsFromLC([]);
    });
    localStorage.removeItem("cart");
  }

  useEffect(() => {
    getCartItemsfromLocalStorage();
    console.log(cartItemsFromLC);
    if (isLoggedIn) {
      getCartItemsfromFB();
      console.log("logged in ");
      console.log(cartItemsFromLC);
      if (cartItemsFromLC) {
        implementLocalStorageCart();
      }
    }

    setIsLoading(false);
  }, [userObj, isLoggedIn]);

  const storeCartData = async () => {
    // get data from carts
    const cartsRef = collection(dbService, "carts");
    const q = query(
      cartsRef,
      // orderBy("createdAt", "desc"),
      where("userId", "==", userObj ? userObj.uid : "")
    );

    // cartItems.forEach( async (cartItem)=>{
    //   if (cartItem.attachment !== "") {
    //     const storageRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
    //     await uploadString(storageRef, cartItem.attachment, "data_url");
    //     attachmentUrl = await getDownloadURL(storageRef);
    // }
    //   const itemObj = {
    //     ...cartItem,
    //     createdAt: Date.now(),
    //     userId: userObj.uid,
    //     attachmentUrl
    //   }
    //   await addDoc(collection(dbService, "orders"), itemObj);
    // })
    // setCartItems([]);
  };
  return (
    <>
      <div className={styles.cart}>
        <h1 className="block text-center text-gray-700 text-4xl font-bold my-4 h-full">
          {userObj && <span>{userObj?.displayName}'s Cart</span>}
          {!userObj && <span>Cart (local device)</span>}
        </h1>
        {isLoading && (
          <button type="button" className="bg-indigo-500 " disabled>
            <svg
              className="animate-spin h-5 w-5 mr-3 ..."
              viewBox="0 0 24 24"
            ></svg>
            Loading...
          </button>
        )}
        {cartItems?.length < 1 && (
          <div className="w-96 mx-auto">
            <p className="text-center text-gray-700 text-2xl my-4">
              Your cart is empty.{" "}
            </p>
            <Link href="/products">
              <button className="bg-black text-white p-3 rounded-lg">
                Go to Products
              </button>
            </Link>
          </div>
        )}

        {cartItems.length > 0 && (
          <div>
            {!isLoggedIn && (
              <>
                <p>
                  As a guest user, your cart is only accessible on your current
                  device.
                </p>
                <Link href="/auth">
                  <u>Want to create an account?</u>
                </Link>
                {cartItemsFromLC?.map((item) => (
                  <CartItem
                    onDelete={deleteItem}
                    OnQuantityClick={updateQty}
                    key={Math.random()}
                    item={item}
                  />
                ))}
              </>
            )}
            <div className="flex flex-row justify-center">
              <ul className="flex flex-col p-6 rounded-lg shadow-lg mb-3 divide-y-2">
                {cartItems?.map((item) => (
                  <CartItem
                    onDelete={deleteItem}
                    OnQuantityClick={updateQty}
                    key={Math.random()}
                    item={item}
                  />
                ))}
                {/* button -> firebase > database + storage */}
                {isLoggedIn && cartItems.length > 0 && (
                //   <Checkout
                //     userObj={userObj}
                //     cartItems={cartItems}
                //     onPaymentClick={onPaymentClick}
                //   />
                )}
              </ul>
              {!isLoggedIn && (
                <Link href="/auth">
                  <p className={styles.orderBtn}>
                    Sign in/up to place an order
                  </p>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
