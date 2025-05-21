import { FeelHeard } from "../FeelHeard/FeelHeard";
import { Header } from "../Header/Header";
import OurServices from "../OurServices/OurServices";
import { WhyUs } from "../WhyUs/WhyUs";
import { useOutletContext } from "react-router-dom";
import "./HomePage.scss";
import { FadeInSection } from "../../utils/useInViewAnimation";

type OutletContextType = {
  isModalOpen: boolean;
  isModalOpenRegistration: boolean;
  isModalLogIn: boolean;
  isCongratulationsOpen: boolean;
};

export const HomePage = () => {
  const {
    isModalOpen,
    isModalOpenRegistration,
    isModalLogIn,
    isCongratulationsOpen,
  } = useOutletContext<OutletContextType>();

  return (
    <>
      <div className="conteiner__header">
        <Header
          isCongratulationsOpen={isCongratulationsOpen}
          isModalOpenRegistration={isModalOpenRegistration}
          isModalLogIn={isModalLogIn}
        />
      </div>

      {!isModalOpen && !isModalOpenRegistration && (
        <div className="main">
          <OurServices />

          <FadeInSection>
            <WhyUs />
          </FadeInSection>

          <FadeInSection>
            <FeelHeard />
          </FadeInSection>
        </div>
      )}
    </>
  );
};
