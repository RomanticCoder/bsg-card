import React from "react";
import { authService } from "../fbase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import AuthForm from "./AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "../../styles/Auth.module.css";

const Auth = () => {
  const onSocialClick = async (event) => {
    const name = event.target.name;
    let provider;

    if (name === "google") {
      provider = new GoogleAuthProvider();
      await signInWithRedirect(authService, provider);
      const result = await getRedirectResult(authService);

      if (result) {
        const user = result.user;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
      }
    } else if (name === "github") {
      provider = new GithubAuthProvider();
      await signInWithPopup(authService, provider);
    }
  };

  return (
    <div className={styles.authContainer}>
      <AuthForm />
      <div className={styles.dividerContainer}>
        <div className={styles.divider}></div>
        <span>OR</span>
        <div className={styles.divider}></div>
      </div>
      <div className="flex flex-col gap-2 mb-40">
        <button
          onClick={onSocialClick}
          name="google"
          className="bg-blue-500 text-white rounded-xl px-4 py-2"
        >
          Continue with Google{" "}
          <FontAwesomeIcon icon={faGoogle} className="text-lx" />
        </button>
        <button
          onClick={onSocialClick}
          name="github"
          className="bg-blue-500 text-white rounded-xl px-4 py-2"
        >
          Continue with Github{" "}
          <FontAwesomeIcon icon={faGithub} className="text-lx" />
        </button>
      </div>
    </div>
  );
};

export default Auth;
