import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";

export const UserPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogOut = () => {
    console.log("Token removed:", localStorage.getItem("accessToken"));
    logout();
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
