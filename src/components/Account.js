import React, { useState } from "react";
// import Orders from "../components/Orders";
import { authService } from "../fbase";

export default function Account({ userObj }) {
  console.log(authService);
  console.log(userObj);
  // const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    // sign out the current user
    authService.signOut();
    // navigate("/");
  };
  console.log("account here");

  return (
    <div className="flex flex-column">
      <h1 className="block text-center text-gray-700 text-lg font-bold my-4">
        Hello, {userObj?.displayName ? userObj?.displayName : "null"}
      </h1>
      <button
        className="h-10 px-6 mx-auto font-semibold rounded-md bg-gray-700 text-white"
        type="submit"
        onClick={onLogOutClick}
      >
        Log Out
      </button>
      {/* <Orders userObj={userObj} /> */}
    </div>
  );
}
