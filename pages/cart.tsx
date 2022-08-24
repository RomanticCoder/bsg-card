import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import CartItem from "../src/components/CartItem";
import UserInfoForm from "../src/components/UserInfoForm";

import React, { useState, useEffect, useRef } from "react";
import {
  addDoc,
  setDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  updateDoc,
  getDocs,
  namedQuery
} from "firebase/firestore";
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";
import { dbService, storageService } from "../src/fbase";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

type PageProps = {
   userObj: {
    displayName: string,
           
          uid: string,
   }
}

const Home: NextPage<PageProps> = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsFromLC, setCartItemsFromLC] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

      const router = useRouter();

  const nameInput = useRef(null);
  const phoneInput = useRef(null);
  const emailInput = useRef(null);

  const userObj = props.userObj;
  const isLoggedIn = Boolean(userObj);

  console.log(cartItems)

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
      console.log(cartItemsArr)

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

      const update = async (uid:string) => {

        const userInfoObj = {
          name: nameInput?.current.value,
          phone: phoneInput?.current.value,
          email:emailInput?.current.value
        }
        console.log(userInfoObj)
        const q = query(
            collection(dbService, "carts"),
            where("userId", "==", uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (item) => {
            console.log(item.id, " => ", item.data());
            await setDoc(doc(dbService, "orders", item.id), {
              ...item.data(),
              createdAt: Date.now(),
              contactInfo: userInfoObj
            });
            const docRef = doc(dbService, "carts", item.id)
            await deleteDoc(docRef);

        });
    }

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const uid = userObj?.uid;

    update(uid);

    router.push('/auth')
    console.log("form was submitted")
    // delete
    // cartData.forEach( async(cart) => {
    //   const docRef = doc(dbService, "carts", `${cart.id}`)
    //   await deleteDoc(docRef);

    //   const imageRef = ref(storageService, cart.attachmentUrl)
    //   await deleteObject(imageRef);
    // });
  };

  return (
    <div className="p-10">
      <h1 className="block text-center text-gray-700 text-4xl font-bold my-4 h-full">
        {userObj && <span>{userObj?.displayName}`&apos;` Cart</span>}
        {!userObj && <span>Cart (local device)</span>}
      </h1>

      {/* {isLoading && (
        <button type="button" className="bg-indigo-500 " disabled>
          <svg
            className="animate-spin h-5 w-5 mr-3 ..."
            viewBox="0 0 24 24"
          ></svg>
          Loading...
        </button>
      )} */}

      {cartItems?.length < 1 && (
        <div className="w-96 mx-auto flex flex-col">
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

      {
        cartItems?.length>0 && (
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
            <form
              onSubmit={onFormSubmit}
              className="flex flex-col bg-gray-200 gap-6 rounded-xl p-4"
            >
              <legend className="text-center font-bold">Contact Info</legend>
              <span className="text-red-600 text-sm">
                * Our staff will contact you soon to confirm the order and help
                you make a payment.
              </span>
              <div className="flex flex-col gap-3">
                <label>
                  Name:
                  <input className="px-2 rounded-lg" ref={nameInput} type="text" name="name" required />
                </label>
                <label>
                  Phone number:
                  <input className="px-2 rounded-lg" ref={phoneInput} type="tel" name="phone" placeholder="123-456-7890" required />
                </label>
                <label>
                  Email Address: 
                  <input className="px-2 rounded-lg" ref={emailInput} type="email" name="email" required />
                </label>
              </div>

              <input
                className="bg-slate-800 text-white rounded-xl py-2"
                type="submit"
                value="Place an Order"
              />
            </form>
            //   <Checkout
            //     userObj={userObj}
            //     cartItems={cartItems}
            //     onPaymentClick={onPaymentClick}
            //   />
          )}
        </ul>
        {!isLoggedIn && (
          <Link href="/auth">
            <p className={styles.orderBtn}>Sign in/up to place an order</p>
          </Link>
        )}
      </div>
        )
      }


    </div>
  );
};

export default Home;
