import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useOutsideClick } from "../../hooks";
import "./nextstep.scss";
import ModalCloce from "../../image/modalClose.svg";
import { Checkbox, FormControlLabel } from "@mui/material";
import { singUp } from "../../api/api";

interface nextStepProps {
  onClose: () => void;
  email: string;
  password: string;
  setIsCongratulationsOpen: Dispatch<SetStateAction<boolean>>;
}

export const NextStep: React.FC<nextStepProps> = ({
  onClose,
  email,
  password,
  setIsCongratulationsOpen
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useOutsideClick(modalRef, onClose);
  const [firstName, setFirstName] = useState("");
  const [hasFirstNameError, setHasFirstNameError] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState("");

  const [secondName, setSecondName] = useState("");
  const [hasSecondNameError, setHasSecondNameError] = useState(false);
  const [errorSecondName, setErrorSecondName] = useState("");

  const [isAgreed, setIsAgreed] = useState(false);
  const [hasCheckboxError, setHasCheckboxError] = useState(false);
  const [errorCheckbox, setErrorCheckbox] = useState("");

  const [, setError] = useState("");

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFirstName(value);
    setHasFirstNameError(false);
    setErrorFirstName("");
  };

  const handleSecondNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSecondName(value);
    setHasSecondNameError(false);
    setErrorSecondName("");
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsAgreed(checked);
    setHasCheckboxError(false);
    setErrorCheckbox("");
  };

  const handleCreateAcount = async () => {
    if (!firstName) {
      setHasFirstNameError(true);
      setErrorFirstName("FirstName is required");
      return;
    }

    if (!secondName) {
      setHasSecondNameError(true);
      setErrorSecondName("SecondName is required");
      return;
    }

    if (!isAgreed) {
      setHasCheckboxError(true);
      setErrorCheckbox("You must choose Checkbox");
      return;
    }

    try {
      const response = await singUp({
        email,
        password,
        firstName,
        lastName: secondName,
        fatherName: "Not Provided",
        confirmPassword: password,
        gender: "OTHER",
        role: "CUSTOMER",
      });

      console.log("User registered successfully", response);
      setIsCongratulationsOpen(true);
      onClose(); // or navigate to login
    } catch (err) {
      setError("Registration failed. Try again later.");
      console.error(err);
    }
  };

  return (
    <div
      ref={modalRef}
      className="next__content"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="nextStepTitle__wrapper">
        <div className="wrapper__stepTitle">
          <p className="nextStep__step">Step 2 of 2</p>
          <h2 className="nextStep__title">Create Your Account</h2>
        </div>

        <button onClick={onClose} className="nextStep__close">
          <img src={ModalCloce} alt="close" className="close" />
        </button>
      </div>
      <span className="nextStep__line"></span>

      <div className="nextStep__from">
        <div className="nextStep__haveAccount">
          <h3 className="haveAccount">Already have an account?</h3>
          <h3 className="login">Login</h3>
        </div>

        <div className="formName">
          <div className="field__FirstName">
            <label className="label__FirstName" htmlFor="SingIn-FirstName">
              First Name
            </label>

            <div className="FirstNameBox">
              <input
                type="text"
                id="SingIn-FirstName"
                className={`inputFirstName ${
                  hasFirstNameError ? "is-danger" : ""
                } `}
                value={firstName}
                onChange={handleFirstNameChange}
              />
              {hasFirstNameError && (
                <p className="help is-danger">{errorFirstName}</p>
              )}
            </div>
          </div>

          <div className="field__SecondName">
            <label className="label__SecondName" htmlFor="SingIn-SecondName">
              Second Name
            </label>

            <div className="SecondNameBox">
              <input
                type="text"
                id="SingIn-SecondName"
                className={`inputSecondName ${
                  hasSecondNameError ? "is-danger" : ""
                } `}
                value={secondName}
                onChange={handleSecondNameChange}
              />
              {hasSecondNameError && (
                <p className="help is-danger">{errorSecondName}</p>
              )}
            </div>
          </div>

          <button className="registrationContinue" onClick={handleCreateAcount}>
            Create Account
          </button>
        </div>

        <span className="registration__lineDown"></span>

        <FormControlLabel
          control={
            <Checkbox
              className="model__concernsList"
              checked={isAgreed}
              onChange={handleCheckboxChange}
              sx={{
                color: "#0C0B09",
                "&.Mui-checked": {
                  color: "#9B6A00",
                },
                "&:hover": {
                  color: "#7C746A",
                },
              }}
            />
          }
          label={
            <span className="checkBoxAggre">
              You agree to our{" "}
              <a
                className="agreeLink"
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              and{" "}
              <a
                className="agreeLink"
                href="/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>
              {hasCheckboxError && (
                <p className="help is-danger">{errorCheckbox}</p>
              )}
            </span>
          }
        />
      </div>
    </div>
  );
};
