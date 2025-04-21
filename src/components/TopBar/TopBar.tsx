import "./TopBar.scss";
import logo from "../../image/MindBloom.svg";
import UserIcon from "../../image/UserIconButton.svg";
import { Input } from "../Input/Input";
import { Filetr } from "../Filter/Filter";

export const TopBar = () => {
  return (
    <div className="top_bar">
      <div className="wraper__top_bar">
        <a className="logo">
          <img src={logo} alt="Logo" className="logo__img" />
        </a>

        <div className="wraper__inputFilter">
          <div className="input">
            <Input />
          </div>

          <div className="filter">
            <Filetr />
          </div>
        </div>
        <div className="navigation">
          <div className="menu">
            <a className="about">About</a>

            <a className="blog">Blog</a>
          </div>

          <div className="user">
            <button className="user__button">
              <img src={UserIcon} alt="userIcon" className="button__icon"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
