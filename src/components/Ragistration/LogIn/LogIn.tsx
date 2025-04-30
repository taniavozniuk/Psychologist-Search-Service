import { useRef } from "react";
import ModalCloce from "../../../image/modalClose.svg";
import { useOutsideClick } from "../../../hooks";

interface LogInProps {
  onClose: () => void;
}

export const LogIn: React.FC<LogInProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useOutsideClick(modalRef, onClose);
  return (
    <div
      ref={modalRef}
      className="Registration__content"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="registrationTitle__wrapper">
        LOG IN
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
