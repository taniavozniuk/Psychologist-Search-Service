import "./SideBar.scss";
import calendar from "../../../image/profileCalendar.svg";
import { NavLink, useNavigate } from "react-router-dom";
import user from "../../../image/user.svg";
import { useAuth } from "../../../hooks/AuthContext";
import likeProfile from "../../../image/profileLike.svg";
import logOut from "../../../image/logOut.svg";
import { useState } from "react";

export const SideBar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [modalLogOut, setModalLogOut] = useState(false);

  const handleLogOut = () => {
    console.log("Token removed:", localStorage.getItem("accessToken"));
    logout();
    navigate("/");
    // setShowUserMenu(false);
  };

  return (
    <div className="sidebar">
      <ul className="sidebarUl">
        <div className="wrapperIl">
          <NavLink to="/profile" className="sidebarIl">
            <img src={user} alt="profile" className="sidebarIcon" />
            <span className="sidebarText">Personal Info</span>
          </NavLink>
        </div>

        <div className="wrapperIl">
          <NavLink to="/profile/sessions" className="sidebarIl">
            <img src={calendar} alt="book" className="sidebarIcon" />
            <span className="sidebarText">My Sessions</span>
          </NavLink>
        </div>

        <NavLink to="/profile/favorites" className="sidebarIl">
          <img src={likeProfile} alt="like" className="sidebarIcon" />
          <span className="sidebarText">Favorites</span>
        </NavLink>

        <span className="sidebarLine"></span>

        <div className="sidebarIl" onClick={() => setModalLogOut(true)}>
          <img src={logOut} alt="like" className="sidebarIcon" />
          <span className="sidebarText">Log Out</span>
        </div>
      </ul>

      {modalLogOut && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2 className="modalTitleDeteils">Log out of your account?</h2>
            <p className="modalDesDeteils">
              You’ll need to sign in again to access your account.
            </p>

            <div className="modal-actions">
              <button onClick={handleLogOut} className="cancel-button">
                Log Out
              </button>
              <button
                onClick={() => setModalLogOut(false)}
                className="confirm-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
