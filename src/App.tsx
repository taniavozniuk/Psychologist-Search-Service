import "./App.scss";
import { TopBar } from "./components/TopBar/TopBar";
import { useState } from "react";
import { ModalWindow } from "./components/ModalWindow/ModalWindow";
import { Outlet } from "react-router-dom";
import { LogIn } from "./components/Ragistration/LogIn/LogIn";
import { NextStep } from "./components/Ragistration/nextstep";
import { Congratulations } from "./components/Ragistration/Congratulations/Congratulations";
import { Registration } from "./components/Ragistration/SingUp/Ragistration";
// import { Footer } from "./components/Footer/Footer";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenRegistration, setIsModalOpenRegistration] = useState(false);
  const [isModalLogIn, setIsModalLogIn] = useState(false);
  const [isCongratulationsOpen, setIsCongratulationsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNextStep = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setCurrentStep(2);
  };

  return (
    <>
      {!isModalOpen && (
        <>
          <TopBar
            onOpenFilter={() => setIsModalOpen(true)}
            setIsModalOpenRegistration={() => setIsModalOpenRegistration(true)}
            isModalOpenRegistration={isModalOpenRegistration}
            isCongratulationsOpen={isCongratulationsOpen}
            setIsModalLogIn={() => setIsModalLogIn(true)}
            isModalLogIn={isModalLogIn}
          />
        </>
      )}

      {isModalOpen && (
        <div className="filter__modal">
          <ModalWindow onClose={() => setIsModalOpen(false)} />
        </div>
      )}

      {isModalOpenRegistration && currentStep === 1 && !isModalOpen && (
        <div
          className="registation__modal"
          onClick={(e) => e.stopPropagation()}
        >
          <Registration
            onClose={() => setIsModalOpenRegistration(false)}
            onNextStep={handleNextStep}
          />
        </div>
      )}

      {currentStep === 2 && isModalOpenRegistration && (
        <div className="next__modal">
          <NextStep
            onClose={() => setIsModalOpenRegistration(false)}
            email={email}
            password={password}
            setIsCongratulationsOpen={setIsCongratulationsOpen}
          />
        </div>
      )}

      {isModalLogIn && !isModalOpen && (
        <div className="logIn__modal" onClick={(e) => e.stopPropagation()}>
          <LogIn onClose={() => setIsModalLogIn(false)} />
        </div>
      )}

      {isCongratulationsOpen && (
        <div className="congratulations__modal">
          <Congratulations onClose={() => setIsCongratulationsOpen(false)}/>
        </div>
      )}

      <Outlet
        context={{ isModalOpen, isModalOpenRegistration, isModalLogIn, isCongratulationsOpen }}
      />
    </>
  );

  {
    /* {!isModalOpen && (
        <div className="footer__container">
          <Footer />
        </div>
      )} */
  }
}

export default App;
