import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import CartItem from "../src/components/CartItem";
import UserInfoForm from "../src/components/UserInfoForm";
import emailjs from "emailjs-com";

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
  namedQuery,
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
    displayName: string;

    uid: string;
  };
};

type cartItem = { [x: string]: any };

const Home: NextPage<PageProps> = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [localCartItems, setLocalCartItems] = useState<cartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const formRef = useRef();

  const nameInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);

  const userObj = props.userObj;
  const isLoggedIn = Boolean(userObj);

  function getCartItemsfromLocalStorage() {
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      setCartItems(JSON.parse(localCart));
    }
  }

  const deleteItem = async (id: string, attachmentUrl: string) => {
    const docRef = doc(dbService, "carts", id);
    await deleteDoc(docRef);
    if (attachmentUrl) {
      const imageRef = ref(storageService, attachmentUrl);
      await deleteObject(imageRef);
    }
  };

  // const updateQty = async (id, amount) => {
  //   const docRef = doc(dbService, "carts", id);
  //   await updateDoc(docRef, {
  //     amount: amount,
  //   });
  // };

  function getCartItemsfromFB() {
    const cartsRef = collection(dbService, "carts");
    const q = query(
      cartsRef,
      // orderBy("createdAt", "desc"),
      where("userId", "==", userObj ? userObj.uid : "")
    );

    onSnapshot(q, (snapshot) => {
      const cartItemsArr: any = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setCartItems(cartItemsArr);
    });
  }

  async function implementLocalCart() {
    localCartItems.forEach(async (item) => {
      console.log(item);
      let attachmentUrl = "";
      if (item.attachment !== "") {
        const storageRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        await uploadString(storageRef, item.attachment, "data_url");
        attachmentUrl = await getDownloadURL(storageRef);
      }

      const itemObj = {
        ...item,
        userId: userObj.uid,
        attachmentUrl,
      };

      await addDoc(collection(dbService, "carts"), itemObj);
      getCartItemsfromFB();
      setLocalCartItems([]);
    });
    localStorage.removeItem("cart");
  }

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      if (!isLoggedIn) {
        setCartItems(JSON.parse(localCart));
      }

      if (isLoggedIn) {
        setLocalCartItems(JSON.parse(localCart));
      }
    }

    if (isLoggedIn) {
      getCartItemsfromFB();
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

  const placeOrder = async (uid: string) => {
    if (!nameInput) {
      return;
    }
    const userInfoObj = {
      name: nameInput?.current?.value,
      phone: phoneInput?.current?.value,
      email: emailInput?.current?.value,
    };
    console.log(userInfoObj);
    const q = query(collection(dbService, "carts"), where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (item) => {
      console.log(item.id, " => ", item.data());
      await setDoc(doc(dbService, "orders", item.id), {
        ...item.data(),
        createdAt: Date.now(),
        contactInfo: userInfoObj,
      });
      const docRef = doc(dbService, "carts", item.id);
      await deleteDoc(docRef);
    });
  };

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const uid = userObj?.uid;

    placeOrder(uid);

    router.push("/auth");
    console.log("form was submitted");
    // delete
    // cartData.forEach( async(cart) => {
    //   const docRef = doc(dbService, "carts", `${cart.id}`)
    //   await deleteDoc(docRef);

    //   const imageRef = ref(storageService, cart.attachmentUrl)
    //   await deleteObject(imageRef);
    // });
  };

  return (
    <div className="p-10 flex flex-col items-center gap-10">
      <h1 className="block text-center text-gray-700 text-4xl font-bold my-4 h-full">
        {userObj && <span>Your Cart</span>}
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

      {isLoggedIn && localCartItems.length > 0 && (
        <div className="bg-yellow-300 p-5 flex flex-row gap-24 ">
          <p className="text-gray-800 ">
            * You have{" "}
            <span className="text-red-600">{localCartItems.length}</span>{" "}
            item(s) saved on your local device. do you want to save it to your
            account?
          </p>
          <button
            onClick={implementLocalCart}
            className="bg-slate-700 text-white px-5 rounded-xl"
          >
            Yes
          </button>
        </div>
      )}

      {cartItems?.length > 0 && (
        <div className="flex flex-row justify-center">
          <ul className="flex flex-col p-6 rounded-lg shadow-lg mb-3 divide-y-2">
            {cartItems?.map((item) => (
              <CartItem onDelete={deleteItem} key={Math.random()} item={item} />
            ))}
            {/* button -> firebase > database + storage */}
            {isLoggedIn && (
              <form
                onSubmit={onFormSubmit}
                className="flex flex-col bg-gray-200 gap-6 rounded-xl p-4"
              >
                <legend className="text-center font-bold">Contact Info</legend>
                <span className="text-red-600 text-sm">
                  * Our staff will contact you soon to confirm the order and
                  help you make a payment.
                </span>
                <div className="flex flex-col gap-3">
                  <label className="flex gap-3">
                    Name:
                    <input
                      className="px-2 rounded-lg"
                      ref={nameInput}
                      type="text"
                      name="name"
                      required
                    />
                  </label>
                  <label className="flex gap-3">
                    Phone number:
                    <input
                      className="px-2 rounded-lg"
                      ref={phoneInput}
                      type="tel"
                      name="phone"
                      placeholder="123-456-7890"
                      required
                    />
                  </label>
                  <label className="flex gap-3">
                    Email Address:
                    <input
                      className="px-2 rounded-lg"
                      ref={emailInput}
                      type="email"
                      name="email"
                      required
                    />
                  </label>
                </div>

                <input
                  className="bg-slate-800 text-white rounded-xl py-2"
                  type="submit"
                  value="Place an Order"
                />
              </form>
            )}
            {!isLoggedIn && (
              <Link href="/auth">
                <p className="bg-slate-800 text-white rounded-xl py-2 text-center">
                  Sign in/up to place an order
                </p>
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
