import "./App.css";
// import { Header } from "./components/Header/Header";
import { TopBar } from "./components/TopBar/TopBar";
// import { OurServices } from "./components/OurServices/OurServices";
// import { WhyUs } from "./components/WhyUs/WhyUs";
// import { FeelHeard } from "./components/FeelHeard/FeelHeard";
// import { Footer } from "./components/Footer/Footer";
import { useState } from "react";
import { ModalWindow } from "./components/ModalWindow/ModalWindow";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {!isModalOpen && (
        <>
          <TopBar onOpenFilter={() => setIsModalOpen(true)} />
        </>
      )}

      {isModalOpen && (
        <div className="filter__modal">
          <ModalWindow onClose={() => setIsModalOpen(false)} />
        </div>
      )}

      <Outlet context={{ isModalOpen }} />

      {!isModalOpen && (
        <div className="footer__container">
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
