import "./FeelHeard.scss";

import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import feelImgDesktop from "../../image/feelImg.svg";
import feelImgTablet from "../../image/fellImg2.svg";

export const FeelHeard = () => {
  const isTablet = useMediaQuery({ maxWidth: 768 });

  const selectedImage = isTablet ? feelImgTablet : feelImgDesktop;

  return (
    <div className="feel">
      <div className="section__wrapper">
        <div className="line"></div>
        <h3 className="section__title">Feel Heard</h3>
        <div className="line"></div>
      </div>

      <div className="feel__content">
        <div className="feel__wrappe">
          <div className="feel__contentWrapper">
            <h2 className="feel__title">
              We match you with the right specialists based on your personal
              experience
            </h2>
            <div className="feel__line"></div>
            <p className="feel__description">
              We help you find a trusted, verified psychologist online — quickly
              and with care. Whether you’re feeling overwhelmed, stuck, or just
              need someone to talk to, we’re here to guide you to the right
              support.
            </p>
          </div>
          <NavLink to="/find" className="feel__findButton">
            Find therapist
          </NavLink>
        </div>

        <img src={selectedImage} alt="feel" className="feel__Img" />
      </div>
    </div>
  );
};
