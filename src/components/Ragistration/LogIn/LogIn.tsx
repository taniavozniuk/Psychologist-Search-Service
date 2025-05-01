import { useRef, useState } from "react";
import ModalCloce from "../../../image/modalClose.svg";
import { useOutsideClick } from "../../../hooks";
import "./LogIn.scss";
import CloseEye from "../../../image/Resitration/closeEye.svg";
import OpneEye from "../../../image/Resitration/openEye.svg";
import { logInUser } from "../../../api/api";

interface LogInProps {
  onClose: () => void;
}

export const LogIn: React.FC<LogInProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useOutsideClick(modalRef, onClose);

  const [email, setEmail] = useState("");
  const [hasEmailError, setHasEmailError] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");

  const [password, setPassword] = useState("");
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    localStorage.setItem("registrationEmail", value);
    setHasEmailError(false);
    setErrorEmail("");
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    setHasPasswordError(false);
    localStorage.setItem("registrationPassword", value);
    setErrorPassword("");
  };

  const handleSingIn = async () => {
    if (!email) {
      setHasEmailError(true);
      setErrorEmail("Email is required");
      return;
    }

    if (!password) {
      setHasPasswordError(true);
      setErrorPassword("Password is required");
      return;
    }

    if (!isValidEmail(email)) {
      setHasEmailError(true);
      setErrorEmail("Please enter a valid email address example@gmail.com");
      return;
    }

    try {
      localStorage.removeItem("accessToken");

      const response = await logInUser({ email, password }); // API запит
      console.log("User logged in successfully", response);
      const { token } = response;

      if (token) {
        localStorage.setItem("accessToken", token);
        console.log("Token saved:", token);
      }

      onClose(); // закрити модалку
    } catch (err) {
      console.error("Login failed", err);
      // setError("Login failed. Please check your credentials and try again.");
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  return (
    <div
      ref={modalRef}
      className="Registration__content"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="registrationTitle__wrapper">
        <h2 className="LogIn__title">Welcome Back!</h2>
        <button onClick={onClose} className="registration__close">
          <img src={ModalCloce} alt="close" className="close" />
        </button>
      </div>
      <span className="modal__line"></span>

      <div className="registration__from">
        <div className="registration__infoBox">
          <h3 className="registration__description">
            Register with your e-mail
          </h3>
          <div className="registration__haveAccount">
            <h3 className="haveAccount">New user?</h3>
            <h3 className="regitration">Create an account</h3>
          </div>
        </div>

        <div className="formSingUp">
          <div className="field__Email">
            <label className="label__email" htmlFor="SingIn-email">
              Email
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
            {hasEmailError && <p className="help is-danger">{errorEmail}</p>}
          </div>

          <div className="field__Password">
            <label className="label__paswword" htmlFor="SingIn-paswword">
              Password
            </label>

            <div className="PaswwordBox">
              <input
                type={showPassword ? "text" : "password"}
                id="SingIn-paswword"
                className={`inputEmail ${hasPasswordError ? "is-danger" : ""}`}
                value={password}
                onChange={handlePasswordChange}
              />
              {hasPasswordError && (
                <p className="help is-danger">{errorPassword}</p>
              )}
              <button
                type="button"
                className="showPassword"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <img
                  className="imgPassword"
                  src={showPassword ? OpneEye : CloseEye}
                  alt={showPassword ? "Hide passwprd" : "Show password"}
                />
              </button>
            </div>
          </div>

          <button className="registrationContinue" onClick={handleSingIn}>
            Sign In
          </button>

          <span className="registration__lineDown"></span>

          <div className="registrationWrapperButton">
            <button className="registrationGoogle">Google Login</button>
            <button className="registrationApple">Apple Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};
