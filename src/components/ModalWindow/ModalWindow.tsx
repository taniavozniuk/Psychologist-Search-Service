import React, { useEffect, useState } from "react";
import "./ModalWindow.scss";
import ModalCloce from "../../image/modalClose.svg";
import ConcernsBtClose from "../../image/ConcernsBtClose.svg";
import ConcernsBtOpen from "../../image/ConcernsBtOpen.svg";
import { PriceSlider } from "./PriceSlider/PriceSlider";
import {
  APPROACHES_LIST,
  CheckboxList,
  CONCERNS_LIST1,
  CONCERNS_LIST2,
  sexOptions,
  specOptions,
} from "./useHookModal";

interface ModalProps {
  onClose: () => void;
}

export const ModalWindow: React.FC<ModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenApproaches, setIsOpenApproaches] = useState(false);
  const [selectedSex, setSelectedSex] = useState<string | null>(
    localStorage.getItem("selectedSex")
  );
  const [selectedSpec, setSelectedSpec] = useState<string | null>(
    localStorage.getItem("selectedSpec")
  );

  const handleConcernsList = () => {
    setIsOpen((prev) => !prev);
  };

  const handleApproachesList = () => {
    setIsOpenApproaches((prev) => !prev);
  };

  const handleSexSelection = (sex: string) => {
    setSelectedSex(sex);
    localStorage.setItem("selectedSex", sex);
  };

  const handleSpexSelection = (spec: string) => {
    setSelectedSpec(spec);
    localStorage.setItem("selectedSex", spec);
  };

  useEffect(() => {
    const storedSex = localStorage.getItem("selectedSex");

    if (storedSex) {
      setSelectedSex(storedSex);
    }

    const storedSpec = localStorage.getItem("selectedSpec");

    if (storedSpec) {
      setSelectedSpec(storedSpec);
    }
  });

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
              {sexOptions.map((sex) => (
                <button
                  key={sex}
                  className={`button__name ${
                    selectedSex === sex ? "selected" : ""
                  }`}
                  onClick={() => handleSexSelection(sex)}
                  style={{
                    backgroundColor: selectedSex === sex ? "#9B6A00" : "",
                  }}
                >
                  {sex}
                </button>
              ))}
            </div>
          </div>
          <span className="modal__line"></span>

          <div className="modal__WrapperSpecialization">
            <h2 className="modal__TitleName">Specialization</h2>

            <div className="modal__button">
              {specOptions.map((spec) => (
                <button
                  key={spec}
                  className={`button__SpecName ${
                    selectedSpec === spec ? "selected" : ""
                  }`}
                  onClick={() => handleSpexSelection(spec)}
                  style={{
                    backgroundColor: selectedSpec === spec ? "#9B6A00" : "",
                  }}
                >
                  {spec}
                </button>
              ))}
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
                <div className="model__concernsDropWrapper">
                  <CheckboxList items={CONCERNS_LIST1} />
                </div>
                <div className="model__concernsDropWrapper">
                  <CheckboxList items={CONCERNS_LIST2} />
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
                  src={isOpenApproaches ? ConcernsBtOpen : ConcernsBtClose}
                  alt="Toggle concerns"
                />
              </button>
            </div>

            {isOpenApproaches && (
              <div className="modal__checkbox">
                <CheckboxList items={APPROACHES_LIST} />
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
