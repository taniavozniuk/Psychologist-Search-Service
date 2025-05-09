import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import "./userPage.scss";

export const UserPage = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  if (!user) return <p>Loading...</p>;
  const handleLogOut = () => {
    console.log("Token removed:", localStorage.getItem("accessToken"));
    logout();
    navigate("/");
    // setShowUserMenu(false);
  };
  return (
    <>
      <div className="profilePge">
        <div className="sidebar">
          <ul className="sidebarUl">
            <li className="sidebarIl">Dashboard</li>
            <li className="sidebarIl">Settings</li>
            <li className="sidebarIl" onClick={handleLogOut}>
              Log Out
            </li>
          </ul>
        </div>

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
