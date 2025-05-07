import { useEffect, useState } from "react";

export const UserPage = () => {
    const [, setIsLoggedIn] = useState<boolean>(
      () => !!localStorage.getItem("accessToken")
    );
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  });
    
  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    console.log("Token removed:", localStorage.getItem("accessToken"));
    setIsLoggedIn(false);
    // setShowUserMenu(false);
  };
  return (
    <>
      <h1>userpage</h1>
      <h1>userpage</h1>
      <h1>userpage</h1>
      <h1>userpage</h1>
      <h1>userpage</h1>

      <h2
        // className="choose__logout"
        onClick={() => {
          handleLogOut();
        }}
      >
        Log Out
      </h2>
    </>
  );
};
