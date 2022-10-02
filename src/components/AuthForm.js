import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "../../styles/AuthForm.module.css";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const auth = getAuth();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div className="flex flex-col text-center">
      <h1 className="font-bold text-4xl mt-10"> Join BLUESKY Printings</h1>
      <form onSubmit={onSubmit} className=" flex flex-col w-96 p-10 gap-3">
        <input
          name="email"
          className="border border-black bg-white text-black font-bold rounded px-2 py-1"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          className="border border-black bg-white text-black font-bold rounded px-2 py-1"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          className="h-10 px-6 mx-auto mt-4 font-semibold rounded-md bg-gray-700 text-white"
          value={newAccount ? "Create Account" : "Log In"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className={styles.authSwitch}>
        {newAccount
          ? "Already have an account? Sign In ->"
          : "Don't have an account? Create Account ->"}
      </span>
    </div>
  );
};

export default AuthForm;
