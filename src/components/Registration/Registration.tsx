import './/Registration.scss'

interface RegistrationProps {
  onClose: () => void;
}

export const Registration: React.FC<RegistrationProps> = ({ onClose }) => {
  return (
    <div className="Registration__content">
      <p>Registration form here</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};
