import React, { useEffect, useState } from "react";
import "./FillingInfo.scss";
import ModalCloce from "../../../image/modalClose.svg";
import { PsychologId } from "../../../types/psychologId";
import time from "../../../image/Calendar/time.svg";
import calendar from "../../../image/Calendar/calendar-month.svg";

interface FillingInfoProps {
  onClose: () => void;
  psycholog: PsychologId;
  selectedDate: Date;
  chooseHour: string;
}

export const FillingInfo: React.FC<FillingInfoProps> = ({
  onClose,
  psycholog,
  selectedDate,
  chooseHour,
}) => {
  //firstName
  const [firtsName, setFirtsName] = useState("");
  const [hasFirtsNameError, setHasFirtsNameError] = useState(false);
  const [errorFirtsName, setErrorFirtsName] = useState("");
  //LastName
  const [lastName, setLastName] = useState("");
  const [hasLastNameError, setHasLastNameError] = useState(false);
  const [errorLastName, setErrorLastName] = useState("");
  //email
  const [email, setEmail] = useState("");
  const [hasEmailError, setHasEmailError] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");

  const handleFirtsNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFirtsName(value);
    setHasFirtsNameError(false);
    setErrorFirtsName("");
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLastName(value);
    setHasLastNameError(false);
    setErrorLastName("");
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    setHasEmailError(false);
    setErrorEmail("");
  };

  const handleConcinue = () => {
    if (firtsName) {
      setHasFirtsNameError(true);
      setErrorFirtsName("Please enter your name");
      return;
    }

    if (!lastName) {
      setHasLastNameError(true);
      setErrorLastName("Please enter your lastname");
      return;
    }

    if (!email) {
      setHasEmailError(true);
      setErrorEmail("Email is required");
      return;
    }

    setHasEmailError(false);
    setHasLastNameError(false);
    setHasLastNameError(false);
  };

  useEffect(() => {
    // прокрутка вгору
    window.scrollTo({ top: 0, behavior: "smooth" });

    // вимкнути прокрутку
    document.body.classList.add("no-scroll");

    return () => {
      // увімкнути прокрутку назад
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = new Date(chooseHour).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="FillingInfo-backdrop">
      <div className="FillingInfo-content">
        <button className="close" onClick={onClose}>
          <img src={ModalCloce} alt="close" />
        </button>
        <div className="AlmostWrapper">
          <div className="AlmostTitle">
            <h2 className="titleAlmost">You're Almost There!</h2>
          </div>
          <div className="generalInfo">
            <div className="totalPrice">
              <p className="PriceTilte">
                <span className="PriceLabel">Total Price:</span>
                <span className="PriceAmount">
                  ${psycholog.sessionPrice} .
                </span>{" "}
                {/* <span className="PricePoint">.</span> */}
                <span className="PriceDuration"> 50 hour</span>
              </p>
            </div>
            <div className="WrapperTimeDay">
              <div className="BoxTimeDay">
                <img src={time} alt="time" />
                <p className="titleTimeDay">{formattedTime}</p>
              </div>
              <div className="BoxTimeDay">
                <img src={calendar} alt="time" />
                <p className="titleTimeDay">{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>

        <span className="FillingLine"></span>

        <div className="wrapperAboutYou">
          <div className="wrapperTitleDesAY">
            <h2 className="aboutYouTitle">Tell Us a Bit About You</h2>
            <p className="aboutYouDes">
              We just need a few details to secure your booking and send you the
              confirmation.
            </p>
          </div>

          <div className="FormAboutYou">
            <div className="wrappeBoxInput">
              <div className="field__First">
                <label className="labelFirst" htmlFor="SingIn-FirstName">
                  First Name
                </label>

                <div className="FirstNameBox">
                  <input
                    type="text"
                    id="SingIn-FirstName"
                    className={`inputFirst ${
                      hasFirtsNameError ? "is-danger" : ""
                    }`}
                    value={firtsName}
                    onChange={handleFirtsNameChange}
                  />
                </div>
                {hasFirtsNameError && (
                  <p className="help is-danger">{errorFirtsName}</p>
                )}
              </div>

              <div className="field__LastName">
                <label className="label__LastName" htmlFor="SingIn-LastName">
                  Last Name
                </label>

                <div className="LastNameBox">
                  <input
                    type="text"
                    id="SingIn-LastName"
                    className={`inputLastName ${
                      hasLastNameError ? "is-danger" : ""
                    }`}
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                </div>
                {hasLastNameError && (
                  <p className="help is-danger">{errorLastName}</p>
                )}
              </div>
            </div>

            <div className="wrapperBoxEmail">
              <div className="field__email">
                <label className="labelEmail" htmlFor="SingIn-email">
                  Email Address
                </label>

                <div className="emailBox">
                  <input
                    type="email"
                    id="SingIn-email"
                    className={`inputEmail ${hasEmailError ? "is-danger" : ""}`}
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                {hasEmailError && (
                  <p className="help is-danger">{errorEmail}</p>
                )}
              </div>

              <p className="emailDes">We’ll send the session link here</p>
            </div>

            <button className="FillingContinueBt">Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};
