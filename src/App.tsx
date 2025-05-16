import "./App.scss";
import { TopBar } from "./components/TopBar/TopBar";
import { useState } from "react";
import { ModalWindow } from "./components/ModalWindow/ModalWindow";
import { Outlet, useLocation } from "react-router-dom";
import { LogIn } from "./components/Ragistration/LogIn/LogIn";
import { NextStep } from "./components/Ragistration/nextstep";
import { Congratulations } from "./components/Ragistration/Congratulations/Congratulations";
import { Registration } from "./components/Ragistration/SingUp/Ragistration";
import { Footer } from "./components/Footer/Footer";
import { SideBar } from "./components/userPage/SideBar/SideBar";
// import { Footer } from "./components/Footer/Footer";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenRegistration, setIsModalOpenRegistration] = useState(false);
  const [isModalLogIn, setIsModalLogIn] = useState(false);
  const [isCongratulationsOpen, setIsCongratulationsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [selectedSex, setSelectedSex] = useState<string | null>(null); //збереження Sex
  // const [selectedSpec, setSelectedSpec] = useState<string | null>(null); //збереження спеціалізації
  // const [selectedCon, setSelectedCon] = useState<string[]>([]); //збереження чекбоксів Concerns
  // const [selectedAppr, setSelectedAppr] = useState<string[]>([]); //збереження чекбоксів Approaches

  // const handleResetFilters = () => {
  //   setSelectedSex(null);
  //   setSelectedSpec(null);
  //   setSelectedCon([]);
  //   setSelectedAppr([]);
  // };

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAbout = location.pathname === "/about";
  const isUserPage =
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/sessions") ||
    location.pathname.startsWith("/favorites");

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
            setCurrentStep={setCurrentStep}
            isHomePage={isHomePage}
            isAbout={isAbout}
          />
        </>
      )}

      {isModalOpen && (
        <div className="filter__modal">
          <ModalWindow
            onClose={() => setIsModalOpen(false)}
            // selectedSex={selectedSex}
            // selectedSpec={selectedSpec}
            // selectedCon={selectedCon}
            // selectedAppr={selectedAppr}
            // setSelectedSex={setSelectedSex}
            // setSelectedSpec={setSelectedSpec}
            // setSelectedCon={setSelectedCon}
            // setSelectedAppr={setSelectedAppr}
            // onReset={handleResetFilters}
          />
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
            openLoginModal={() => {
              setIsModalOpenRegistration(false);
              setIsModalLogIn(true);
            }}
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
            setCurrentStep={setCurrentStep}
            openLoginModal={() => {
              setIsModalOpenRegistration(false);
              setIsModalLogIn(true);
            }}
          />
        </div>
      )}

      {isModalLogIn && !isModalOpen && (
        <div className="logIn__modal" onClick={(e) => e.stopPropagation()}>
          <LogIn
            onClose={() => setIsModalLogIn(false)}
            openRegistration={() => {
              setIsModalLogIn(false);
              setIsModalOpenRegistration(true);
            }}
          />
        </div>
      )}

      {isCongratulationsOpen && (
        <div className="congratulations__modal">
          <Congratulations onClose={() => setIsCongratulationsOpen(false)} />
        </div>
      )}

      <div className="wrappeSideBar">{isUserPage && <SideBar />}</div>

      <Outlet
        context={{
          isModalOpen,
          isModalOpenRegistration,
          isModalLogIn,
          isCongratulationsOpen,
        }}
      />

      {!isModalOpen && !isModalOpenRegistration && !isModalLogIn && (
        <div className="footer__container">
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
