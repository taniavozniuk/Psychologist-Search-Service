import { NavLink } from "react-router-dom";
import "./Congratulations.scss";
import { useRef } from "react";
import { useOutsideClick } from "../../../hooks";

interface CongratulationsProps {
  onClose: () => void; // Prop to close the modal
}

export const Congratulations: React.FC<CongratulationsProps> = ({
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useOutsideClick(modalRef, onClose);

  return (
    <div className="Congratulations__wrapper" ref={modalRef}>
      <div className="Congratulations__modal">
        <h2 className="Congratulations__title">You're Registered!</h2>
        <p className="Congratulations__description">
          Your account is all set. Now you can save your test results, add
          psychologists to favorites, and book sessions anytime.
        </p>
      </div>

      <NavLink to="/find" className="CongratulationsBT" onClick={onClose}>
        Find a Therapist
      </NavLink>
    </div>
  );
};
