import { components } from "./conponents";
import './WhyUs.scss';

export const WhyUs = () => {
  return (
    <div className="whyUs">
      <h3 className="section__title">Why Us</h3>

      <div className="whyUs__card">
        {components.map((component, index) => (
          <div className="whyUs__content" key={index}>
            <div className="whyUs__number">{component.number}</div>
            <h2 className="whyUs__title">{component.title}</h2>
            <p className="whyUs__description">{component.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
