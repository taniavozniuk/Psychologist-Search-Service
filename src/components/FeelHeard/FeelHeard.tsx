import "./FeelHeard.scss";
import feelImg from "../../image/feelImg.svg";

export const FeelHeard = () => {
  return (
    <div className="feel">
      <h3 className="section__title">Feel Heard</h3>

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
          <button className="feel__findButton">Find therapist</button>
        </div>

        <img src={feelImg} alt="feelImg" className="feel__Img" />
      </div>
    </div>
  );
};
