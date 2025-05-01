import { NavLink } from "react-router-dom";
import "./Header.scss";
import React from "react";

type HeaderProps = {
  isModalOpenRegistration: boolean;
  isModalLogIn: boolean;
  isCongratulationsOpen: boolean
};

export const Header: React.FC<HeaderProps> = ({ isModalOpenRegistration, isModalLogIn, isCongratulationsOpen }) => {
  return (
    <div className="header">
      {/* <div className="header__wrapper"> */}
      {!isModalOpenRegistration && !isModalLogIn && !isCongratulationsOpen &&(
        <div className="header__bottom">
          <div className="header__wrapper">
            <div className="header__titleWrapper">
              <h3 className="header__title">Your Mental Health Matters</h3>
            </div>

            <div className="header__descriptionWrapper">
              {/* <div className="Wrapper__description"> */}
              <h2 className="header__description">
                Your journey to feeling better starts here
              </h2>
              {/* </div> */}

              <div className="Wrapper__Text">
                <h2 className="header__text">
                  Take a quick test, use our filters, or search to easily find a
                  specialist who suits your needs perfectly.
                </h2>

                <div className="button__testWrapper">
                  <NavLink to="/test" className="button__test">
                    Start the Test
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    // </div>
  );
};
