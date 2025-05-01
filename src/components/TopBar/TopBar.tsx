import "./TopBar.scss";
import logo from "../../image/MindBloom.svg";
import UserIcon from "../../image/UserIconButton.svg";
import { Input } from "../Input/Input";
import { Filetr } from "../Filter/Filter";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks";

interface TopBarProps {
  onOpenFilter: () => void;
  setIsModalOpenRegistration: () => void;
  isModalOpenRegistration: boolean;
  setIsModalLogIn: () => void;
  isModalLogIn: boolean;
  isCongratulationsOpen: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenFilter,
  setIsModalOpenRegistration,
  isModalOpenRegistration,
  setIsModalLogIn,
  isModalLogIn,
  isCongratulationsOpen,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useOutsideClick(modalRef, setShowUserMenu);
  return (
    <div className="top_bar">
      <div className="wraper__top_bar">
        <NavLink to="/" className="logo">
          <img src={logo} alt="Logo" className="logo__img" />
        </NavLink>

        {!isModalOpenRegistration &&
          !isModalLogIn &&
          !isCongratulationsOpen && (
            <div className="wraper__inputFilter">
              <div className="input">
                <Input />
              </div>

              <div className="filter">
                <Filetr onOpen={onOpenFilter} />
              </div>
            </div>
          )}

        <div className="navigation">
          <div className="menu">
            <NavLink to="/about" className="about">
              About
            </NavLink>

            <NavLink to="/blog" className="blog">
              Blog
            </NavLink>
          </div>

          <div className="user">
            <button
              className="user__button"
              // onClick={setIsModalOpenRegistration}
              onClick={() => setShowUserMenu((prev) => !prev)}
            >
              <img src={UserIcon} alt="userIcon" className="button__icon" />
              {/* <Registration onClose={onOpenFilter}/> */}
            </button>
            {showUserMenu && (
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
