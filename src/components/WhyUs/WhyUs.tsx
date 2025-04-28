// import { useMediaQuery } from "react-responsive";
import { components } from "./conponents";
import "./WhyUs.scss";
import nextBt from "../../image/nextBt.svg";
import prevBt from "../../image/prevBt.svg";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useMediaQuery } from "react-responsive";

export const WhyUs = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? components.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === components.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  return (
    <div className="whyUs" {...handlers}>
      <div className="section__wrapper">
        <div className="line"></div>
        <h3 className="section__title">Why Us</h3>
        <div className="line"></div>
      </div>

      <div className="wrapper__button">
        <button
          className="whyUs__Prev"
          onClick={handlePrev}
          // disabled={activeIndex === 0}
        >
          <img src={prevBt} alt="prev" className="prev" />
        </button>
        <button
          className="whyUs__Next"
          onClick={handleNext}
          // disabled={activeIndex === components.length - 1}
        >
          <img src={nextBt} alt="next" className="next" />
        </button>
      </div>

      <div
        className="whyUs__card"
        style={{
          transform: isDesktop ? "none" : `translateX(-${activeIndex * 70}%)`,
        }}
      >
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
