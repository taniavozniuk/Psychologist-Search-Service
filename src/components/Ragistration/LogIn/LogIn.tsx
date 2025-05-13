import { useEffect, useRef, useState } from "react";
import ModalCloce from "../../../image/modalClose.svg";
import { useOutsideClick } from "../../../hooks";
import "./LogIn.scss";
import CloseEye from "../../../image/Resitration/closeEye.svg";
import OpneEye from "../../../image/Resitration/openEye.svg";
import { logInUser } from "../../../api/api";
import Google from "../../../image/Resitration/google.svg";
import Apple from "../../../image/Resitration/iphone.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/AuthContext";

interface LogInProps {
  onClose: () => void;
  openRegistration: () => void;
}

export const LogIn: React.FC<LogInProps> = ({ onClose, openRegistration }) => {
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
  const navigate = useNavigate();

  const { login: onSuccessLogin } = useAuth();

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
        onSuccessLogin(token);
        console.log("Token saved:", token);
      }

      onClose(); // закрити модалку
    } catch (err) {
      console.error("Login failed", err);
      // setError("Login failed. Please check your credentials and try again.");
    }

    navigate("/profile");
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
      <span className="LogiLine"></span>

      <div className="registration__from">
        <div className="registration__infoBox">
          <div className="registration__haveAccount">
            <h3 className="haveAccount">New user?</h3>
            <h3
              className="regitration"
              onClick={() => {
                onClose();
                openRegistration();
              }}
            >
              Create an account
            </h3>
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
          <h2 className="ForgotPassword">Forgot Password?</h2>
        </div>
        <div className="WrapperBt">
          <button className="registrationContinue" onClick={handleSingIn}>
            Sign In
          </button>

          {/* <span className="registration__lineDown"></span> */}

          <div className="registrationWrapperButton">
            <button className="registrationBt">
              <img src={Google} />
            </button>
            <button className="registrationBt">
              <img src={Apple} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
