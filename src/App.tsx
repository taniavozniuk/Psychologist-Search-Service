import "./App.scss";
// import { Header } from "./components/Header/Header";
import { TopBar } from "./components/TopBar/TopBar";
// import { OurServices } from "./components/OurServices/OurServices";
// import { WhyUs } from "./components/WhyUs/WhyUs";
// import { FeelHeard } from "./components/FeelHeard/FeelHeard";
// import { Footer } from "./components/Footer/Footer";
import { useState } from "react";
import { ModalWindow } from "./components/ModalWindow/ModalWindow";
import { Outlet } from "react-router-dom";
import { Registration } from "./components/Registration/Registration";
// import { Footer } from "./components/Footer/Footer";


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenRegistration, setIsModalOpenRegistration] = useState(false);

  return (
    <>
      {!isModalOpen  &&(
        <>
          <TopBar
            onOpenFilter={() => setIsModalOpen(true)}
            setIsModalOpenRegistration={() => setIsModalOpenRegistration(true)}
            isModalOpenRegistration={isModalOpenRegistration}
          />
        </>
      )}

      {isModalOpen && (
        <div className="filter__modal">
          <ModalWindow onClose={() => setIsModalOpen(false)} />
        </div>
      )}

      {isModalOpenRegistration && !isModalOpen && (
        <div className="registation__modal" onClick={(e) => e.stopPropagation()}>
          <Registration onClose={() => setIsModalOpenRegistration(false)} />
        </div>
      )}


      <Outlet context={{ isModalOpen, isModalOpenRegistration }} />
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
