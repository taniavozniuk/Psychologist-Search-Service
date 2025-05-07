import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserPage = () => {
  const navigate = useNavigate();
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
    navigate("/");
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
