import { NavLink } from "react-router-dom";
import "./About.scss";
import logo from "../../image/MindBloomBlack.svg";
import clarity from "../../image/About/clarity.svg";
import focused from "../../image/About/focused.svg";
import you from "../../image/About/you.svg";

export const About = () => {
  return (
    <>
      <div className="HeaderaboutWrapper">
        <div className="wrapperAbout">
          <div className="titleWrapper">
            <h3 className="aboutSmallTitle">About Us</h3>
            <h2 className="aboutTitle">Find Your Inner Balance</h2>
          </div>
          <div className="decriptionWrapper">
            <p className="firstDescription">
              Our mission is to make mental health support accessible and
              personalized.
            </p>

            <div className="wrapperDesBt">
              <p className="secondDescription">
                We created this platform to help you connect with trusted
                psychologists who truly suit your needs — based on your goals,
                preferences, and availability.
              </p>

              <NavLink className="createAccount" to="/createAccount">
                Create an Account
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="aboutInformation">
        <div className="ConteinerLogo">
          <div className="logoWrap">
            <img src={logo} alt="logo" />
          </div>

          <div className="DesWrap">
            <p className="logoDescription">
              This platform was born from a simple, human need — to be heard and
              understood. We believe that everyone deserves access to the right
              mental health support, without confusion or long searches. That’s
              why we created a space where finding a trusted psychologist is
              clear, personal, and supportive from the very beginning.
            </p>
          </div>
        </div>

        <span className="aboutLine"></span>

        <div className="AboutCard">
          <div className="cardAbout">
            <img src={focused} alt="focused" />

            <div className="TextWpar">
              <h3 className="cardTitle">Focused on You</h3>
              <p className="cardDescription">
                We created this platform to make finding a psychologist simple,
                supportive, and human. Everything here is built around you —
                your needs, your pace, your comfort. Our goal isn’t just to
                match you with a specialist, but to help you find someone you
                truly feel safe and at ease with. No stress, no pressure — just
                a space where you can open up.
              </p>
            </div>
          </div>

          <div className="cardAboutSecond">
            <div className="TextWparSecond">
              <h3 className="cardTitle">Clarity, Trust, Care</h3>
              <p className="cardDescription">
                We believe that taking the first step toward therapy shouldn’t
                feel overwhelming. That’s why our platform offers a clear and
                honest experience: every psychologist has a detailed profile,
                approach description, session fees, and available time slots.
                Nothing is hidden — so you can make calm, informed decisions.
                Trust starts even before the first session.
              </p>
            </div>
            <img src={clarity} alt="focused" />
          </div>

          <div className="cardAbout">
            <img src={you} alt="focused" />

            <div className="TextWpar">
              <h3 className="cardTitle">We’re Here for You</h3>
              <p className="cardDescription">
                There are moments when all you need is to know you’re not alone.
                Whether you’re going through a hard time or facing everyday
                challenges, it’s important to have easy access to support.
                That’s exactly why we built this platform. At any time, you can
                find a psychologist, check their availability, and book a
                session online — quickly, conveniently, and without barriers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
