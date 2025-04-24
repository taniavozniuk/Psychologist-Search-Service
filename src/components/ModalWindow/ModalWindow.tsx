import React, { useState } from "react";
import "./ModalWindow.scss";
import ModalCloce from "../../image/modalClose.svg";
import ConcernsBtClose from "../../image/ConcernsBtClose.svg";
import ConcernsBtOpen from "../../image/ConcernsBtOpen.svg";
import { PriceSlider } from "./PriceSlider/PriceSlider";
import { Checkbox, FormControlLabel } from "@mui/material";

interface ModalProps {
  onClose: () => void;
}

const CONCERNS_LIST1 = [
  "Anxiety",
  "Grief and loss",
  "Panic attacks",
  "Family issues",
  "Burnout",
];

const CONCERNS_LIST2 = [
  "Depression",
  "Loneliness",
  "Mood swings",
  "Social anxiety",
  "Stress",
];

const APPROACHES_LIST = [
  "Psychodynamic Therapy",
  "Cognitive Behavioral Therapy",
  "Humanistic Therapy",
  "Integrative Therapy",
  "Narrative Therapy",
];

export const ModalWindow: React.FC<ModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenApproaches, setIsOpenApproaches] = useState(false);

  const handleConcernsList = () => {
    setIsOpen((prev) => !prev);
  };

  const handleApproachesList = () => {
    setIsOpenApproaches((prev) => !prev);
  };

  return (
    <div className="modal__content">
      <div className="modal__WrappeTitleBt">
        <div className="title__conteiner">
          <h2 className="title__modal">Filter</h2>
        </div>

        <button onClick={onClose} className="close__btn">
          <img src={ModalCloce} alt="close" className="close" />
        </button>
      </div>
      <span className="modal__lineTtle"></span>

      <div className="modal__scrollableContent">
        <div className="modal__Wrapper">
          <div className="modal__WrapperSex">
            <h2 className="modal__TitleName">Sex</h2>

            <div className="modal__button">
              <button className="button__name">Male</button>
              <button className="button__name">Female</button>
              <button className="button__name">Non-binary</button>
            </div>
          </div>
          <span className="modal__line"></span>

          <div className="modal__WrapperSpecialization">
            <h2 className="modal__TitleName">Specialization</h2>

            <div className="modal__button">
              <button className="button__SpecName">Individual</button>
              <button className="button__SpecName">Couple therapy</button>
            </div>
          </div>
          <span className="modal__line"></span>

          <div className="modal__WrapperPrice">
            <h2 className="modal__TitlePrice">Price range</h2>
            <PriceSlider />
            <span className="modal__line"></span>
          </div>

          <div className="modal__WrapperConcerns">
            <div className="modal__WrapperTitle">
              <h2 className="modal__TitleName">Concerns</h2>

              <button
                className="model__concernsBt"
                onClick={handleConcernsList}
              >
                <img
                  src={isOpen ? ConcernsBtOpen : ConcernsBtClose}
                  alt="Toggle concerns"
                />
              </button>
            </div>

            {isOpen && (
              <div className="modal__checkbox">
                <div className="model__concernsDropWrapper1">
                  <ul className="model__concernsDrop">
                    {CONCERNS_LIST1.map((label, index) => (
                      <li key={index} className="model__concernsItem">
                        <FormControlLabel
                          control={
                            <Checkbox
                              className="model__concernsList"
                              sx={{
                                color: "#0C0B09",
                                "&.Mui-checked": {
                                  color: "#9B6A00",
                                },
                                "&:hover": {
                                  color: "#7C746A",
                                },
                              }}
                            />
                          }
                          label={label}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="model__concernsDropWrapper2">
                  <ul className="model__concernsDrop">
                    {CONCERNS_LIST2.map((label, index) => (
                      <li key={index} className="model__concernsItem">
                        <FormControlLabel
                          control={<Checkbox className="model__concernsList" sx={{
                            color: "#0C0B09",
                            "&.Mui-checked": {
                              color: "#9B6A00",
                            },
                            "&:hover": {
                              color: "#7C746A",
                            },
                          }}/>}
                          label={label}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <span className="modal__line"></span>

          <div className="modal__WrapperApproaches">
            <div className="modal__WrapperTitle">
              <h2 className="modal__TitleName">Approaches</h2>

              <button
                className="model__concernsBt"
                onClick={handleApproachesList}
              >
                <img
                  src={isOpen ? ConcernsBtOpen : ConcernsBtClose}
                  alt="Toggle concerns"
                />
              </button>
            </div>

            {isOpenApproaches && (
              <div className="modal__checkbox">
                <div className="model__concernsDropWrapper1">
                  <ul className="model__concernsDrop">
                    {APPROACHES_LIST.map((label, index) => (
                      <li key={index} className="model__concernsItem">
                        <FormControlLabel
                          control={<Checkbox className="model__concernsList" sx={{
                            color: "#0C0B09",
                            "&.Mui-checked": {
                              color: "#9B6A00",
                            },
                            "&:hover": {
                              color: "#7C746A",
                            },
                          }}/>}
                          label={label}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="Wrapper__Bt">
        <span className="modal__lineBt"></span>

        <div className="Wrapper__button">
          <button className="Bt__Reset">Reset</button>
          <button className="Bt__Apply">Apply</button>
        </div>
      </div>
    </div>
  );
};
