import "./Footer.scss";
import instagram from "../../image/media/instagram.svg";
import fecebook from "../../image/media/fecebook.svg";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__wrapper">
        <nav className="footer__nav">
          <ul className="footer__list">
            <li className="footer__item">
              <a className="footer__link" href="#">
                Home
              </a>
            </li>
            <li className="footer__item">
              <NavLink to="/about" className="footer__link" >
                About Us
              </NavLink>
            </li>
            <li className="footer__item">
              <NavLink to="/blog" className="footer__link">
                Blog
              </NavLink>
            </li>
            <li className="footer__item">
              <a className="footer__link" href="#">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer__mediaIcon">
          <a href="#" className="footer__icon">
            <img src={instagram} alt="mediaIcon" />
          </a>

          <a href="#" className="footer__icon">
            <img src={fecebook} alt="mediaIcon" />
          </a>
        </div>
      </div>

      <span className="footer__line"></span>

      <div className="footer__upWrapper">
        <nav className="footer__upNav">
          <ul className="footer__list2">
            <li className="footer__item2">
              <a className="footer__link" href="#">
                Terms & Conditions
              </a>
            </li>

            <li className="footer__item2">
              <a className="footer__link" href="#">
                Privacy Policy
              </a>
            </li>

            <li className="footer__item2">
              <a className="footer__link" href="#">
                Privacy Policy
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer__contact">
          <a href="mailto:support.mindbloom.@gmail.com" className="footer__email">
          Contact us: support.mindbloom.@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};
