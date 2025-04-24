import { FeelHeard } from "../FeelHeard/FeelHeard";
import OurServices from "../OurServices/OurServices";
import { WhyUs } from "../WhyUs/WhyUs";

export const HomePage = () => {
  return (
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
  );
};
