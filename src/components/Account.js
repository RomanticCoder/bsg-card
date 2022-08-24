import React, { useState } from "react";
// import Orders from "../components/Orders";
import { authService } from "../fbase";
import Orders from "./Orders";

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
    <div className="flex flex-col">
      <button
        className="h-10 px-6 mx-auto font-semibold rounded-md bg-gray-700 text-white"
        type="submit"
        onClick={onLogOutClick}
      >
        Log Out
      </button>
      <Orders userObj={userObj} />
    </div>
  );
}
