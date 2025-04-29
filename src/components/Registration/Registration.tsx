import "./Registration.scss";
import ModalCloce from "../../image/modalClose.svg";

interface RegistrationProps {
  onClose: () => void;
}

export const Registration: React.FC<RegistrationProps> = ({ onClose }) => {
  // const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   if (event.target === event.currentTarget) {
  //     onClose();
  //   }
  // };
  return (
    <div className="Registration__content" onClick={(e) => e.stopPropagation()}>
      <div className="registrationTitle__wrapper">
        <div className="wrapper__stepTitle">
          <p className="registration__step">Step 1 of 2</p>
          <h2 className="registration__title">Create Your Account</h2>
        </div>

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
            <h3 className="haveAccount">Already have an account?</h3>
            <h3 className="login">Login</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
