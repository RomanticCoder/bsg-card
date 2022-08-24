import React from "react";
import { authService } from "../src/fbase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import SignIn from "../src/components/SignIn";
import Account from "../src/components/Account";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/Auth.module.css";
import { NextPage } from "next";

type PageProps = {
   userObj: {
    displayName: string,
           
          uid: string,
   }
}

const Auth: NextPage<PageProps> = (props) => {
  console.log(props)
  const userObj = props.userObj;
  console.log(userObj);
  if (userObj) {
    return <Account userObj={userObj} />;
  } else {
    return <SignIn />;
  }
};

export default Auth;
