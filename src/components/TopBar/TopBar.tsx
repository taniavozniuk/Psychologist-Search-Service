import "./TopBar.scss";
import logo from "../../image/MindBloom.svg";
import UserIcon from "../../image/UserIconButton.svg";
import { Input } from "../Input/Input";
import { Filetr } from "../Filter/Filter";
import { NavLink } from "react-router-dom";

interface TopBarProps {
  onOpenFilter: () => void;
  onOpenRegistration: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenFilter, onOpenRegistration }) => {
  return (
    <div className="top_bar">
      <div className="wraper__top_bar">
        <NavLink to='/'className="logo">
          <img src={logo} alt="Logo" className="logo__img" />
        </NavLink>

        <div className="wraper__inputFilter">
          <div className="input">
            <Input />
          </div>

          <div className="filter">
            <Filetr onOpen={onOpenFilter} />
          </div>
        </div>
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
            <button className="user__button" onClick={onOpenRegistration}>
              <img src={UserIcon} alt="userIcon" className="button__icon" />
              {/* <Registration onOpen={onOpenFilter}/> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
