import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import "./userPage.scss";
import { SideBar } from "./SideBar/SideBar";

export const UserPage = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogOut = () => {
    console.log("Token removed:", localStorage.getItem("accessToken"));
    logout();
    navigate("/");
    // setShowUserMenu(false);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <div className="profilePge">
        <SideBar />

        <div className="profilePage">
          <h1 className="profileTitle">Profile information</h1>
          <h1 className="profileTitle">Profile information</h1>
          <h1 className="profileTitle">Profile information</h1>
          <h1 className="profileTitle">Profile information</h1>
          <h1 className="profileTitle">Profile information</h1>
          <h1 className="profileTitle">Profile information</h1>
          
        </div>
      </div>
    </>
  );
};
