import { FeelHeard } from "../FeelHeard/FeelHeard";
import { Header } from "../Header/Header";
import OurServices from "../OurServices/OurServices";
import { WhyUs } from "../WhyUs/WhyUs";
import { useOutletContext } from "react-router-dom";


type OutletContextType = {
  isModalOpen: boolean;
  isModalOpenRegistration: boolean;
};

export const HomePage = () => {
  const { isModalOpen, isModalOpenRegistration } = useOutletContext<OutletContextType>();

  return (
    <>
      <div className="conteiner__header">
        <Header isModalOpenRegistration={isModalOpenRegistration}/>
      </div>

      {!isModalOpen && !isModalOpenRegistration && (
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
        </div>
      )}
    </>
  );
};
