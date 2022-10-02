import "../styles/globals.css";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { authService } from "../src/fbase";

function MyApp({ Component, pageProps }: AppProps) {
  const [userObj, setUserObj] = useState<{} | null>(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName
            ? user.displayName
            : user?.email?.split("@")[0],
          uid: user.uid,
          // updateProfile: () => updateProfile(user, { displayName: user.displayName }),
        });
      } else {
        setUserObj(null);
      }
    });
  }, []);

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <Header userObj={userObj} />
      <Component userObj={userObj} {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
