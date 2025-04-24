import "./App.css";
import { Header } from "./components/Header/Header";
import { TopBar } from "./components/TopBar/TopBar";
import { OurServices } from "./components/OurServices/OurServices";
import { WhyUs } from "./components/WhyUs/WhyUs";
import { FeelHeard } from "./components/FeelHeard/FeelHeard";
import { Footer } from "./components/Footer/Footer";
import { useState } from "react";
import { ModalWindow } from "./components/ModalWindow/ModalWindow";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="conteiner__header">
        <Header />
      </div>

      {!isModalOpen && (
        <>
          <TopBar onOpenFilter={() => setIsModalOpen(true)} />

          <div className="main">
            <div className="conteiner__section">
              <OurServices />
            </div>

            <div className="conteiner__section">
              <WhyUs />
            </div>

            <div className="conteiner__section">
              <FeelHeard />
            </div>

            <div className="conteiner__section">
              <Footer />
            </div>
          </div>
        </>
      )}

      {isModalOpen && (
        <div className="filter__modal">
          <ModalWindow onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </>
  );
}

export default App;
