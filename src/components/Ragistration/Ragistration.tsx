import "./Ragistration.scss";
import ModalCloce from "../../image/modalClose.svg";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks";
import CloseEye from "../../image/Resitration/closeEye.svg";
import OpneEye from "../../image/Resitration/openEye.svg";

interface RegistrationProps {
  onClose: () => void;
  onNextStep: (email: string, password: string) => void;
}

export const Registration: React.FC<RegistrationProps> = ({
  onClose,
  onNextStep,
}) => {
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

  // зчитування з localStorage при першому рендері
  // useEffect(() => {
  //   const savedEmail = localStorage.getItem("registrationEmail");
  //   const savedPassword = localStorage.getItem("registrationPassword");

  //   if (savedEmail) setEmail(savedEmail);
  //   if (savedPassword) setPassword(savedPassword);
  // }, []);

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

  const handleContinue = () => {
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

    // localStorage.removeItem("registrationEmail");
    // localStorage.removeItem("registrationPassword");

    setHasEmailError(false);
    setHasPasswordError(false);
    onNextStep(email, password);
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
        <div className="wrapper__stepTitle">
          <p className="registration__step">Step 1 of 2</p>
          <h2 className="registration__title">Create Your Account</h2>
        </div>

        <button onClick={onClose} className="registration__close">
          <img src={ModalCloce} alt="close" className="close" />
        </button>
      </div>
      <span className="registration__line"></span>

      <div className="registration__from">
        <div className="registration__infoBox">
          <h3 className="registration__description">
            Register with your e-mail
          </h3>
          <div className="registration__haveAccount">
            <h3 className="haveAccount">Already have an account?</h3>
            <h3 className="login">Login</h3>
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
              Create Password
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

          <button className="registrationContinue" onClick={handleContinue}>
            Continue
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
