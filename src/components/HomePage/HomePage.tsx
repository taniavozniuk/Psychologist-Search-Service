import { FeelHeard } from "../FeelHeard/FeelHeard";
import { Header } from "../Header/Header";
import OurServices from "../OurServices/OurServices";
import { WhyUs } from "../WhyUs/WhyUs";
import { useOutletContext } from "react-router-dom";

export const HomePage = () => {
  const { isModalOpen } = useOutletContext<{ isModalOpen: boolean }>();
  return (
    <>
      <div className="conteiner__header">
        <Header />
      </div>

      {!isModalOpen && (
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
