import "./TopBar.scss";
import logo from "../../image/MindBloom.svg";
import logoBlack from "../../image/MindBloomBlack.svg";
import UserIcon from "../../image/UserIconButton.svg";
import UserIconBlack from "../../image/userIconBlack.svg";
import { Input } from "../Input/Input";
import { Filetr } from "../Filter/Filter";
import { NavLink, useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useOutsideClick } from "../../hooks";
import { useAuth } from "../../hooks/AuthContext";

interface TopBarProps {
  onOpenFilter: () => void;
  setIsModalOpenRegistration: () => void;
  isModalOpenRegistration: boolean;
  setIsModalLogIn: () => void;
  isModalLogIn: boolean;
  isCongratulationsOpen: boolean;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  isHomePage: boolean;
  isAbout: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenFilter,
  setIsModalOpenRegistration,
  isModalOpenRegistration,
  setIsModalLogIn,
  isModalLogIn,
  isCongratulationsOpen,
  setCurrentStep,
  isHomePage,
  isAbout,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isTransparentTopBar = isHomePage || isAbout;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useOutsideClick(modalRef, setShowUserMenu);
  const { isLoggedIn } = useAuth();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "navbar-item navbar-item--active" : "navbar-item";


  return (
    <div
      className={`top_bar ${
        isTransparentTopBar ? "topbar--glass" : "topbar--plain"
      }`}
    >
      <div className="wraper__top_bar">
        <NavLink to="/" className="logo">
          <img
            src={isTransparentTopBar ? logo : logoBlack}
            alt="Logo"
            className="logo__img"
          />
        </NavLink>

        {!isModalOpenRegistration &&
          !isModalLogIn &&
          !isCongratulationsOpen && (
            <div className="wraper__inputFilter">
              <div className="input">
                <Input isHomePage={isHomePage} isAbout={isAbout} />
              </div>

              <div className="filter">
                <Filetr
                  onOpen={onOpenFilter}
                  isHomePage={isHomePage}
                  isAbout={isAbout}
                />
              </div>
            </div>
          )}

        <div className="navigation">
          <div className="menu">
            <NavLink className={getLinkClass} to="/about">
              About
            </NavLink>

            <NavLink to="/blog" className={getLinkClass}>
              Blog
            </NavLink>
          </div>

          <div className="user">
            <div
              className="user__button"
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/profile");
                } else {
                  setShowUserMenu((prev) => !prev);
                }
              }}
            >
              <img
                src={isTransparentTopBar ? UserIcon : UserIconBlack}
                alt="userIcon"
                className="button__icon"
              />
            </div>
            {showUserMenu && !isLoggedIn && (
              <div
                className="choose"
                onClick={(e) => e.stopPropagation()}
                ref={modalRef}
              >
                <h2
                  className="choose__sing"
                  onClick={() => {
                    setIsModalOpenRegistration();
                    setShowUserMenu(false);
                    setCurrentStep(1);
                  }}
                >
                  Sing Up
                </h2>
                <h2
                  className="choose__login"
                  onClick={() => {
                    setIsModalLogIn();
                    setShowUserMenu(false);
                  }}
                >
                  Log In
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
