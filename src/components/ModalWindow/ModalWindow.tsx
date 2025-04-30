import React, { useRef } from "react";
import "./ModalWindow.scss";
import ModalCloce from "../../image/modalClose.svg";
import ConcernsBtClose from "../../image/ConcernsBtClose.svg";
import ConcernsBtOpen from "../../image/ConcernsBtOpen.svg";
import { PriceSlider } from "./PriceSlider/PriceSlider";
import {
  APPROACHES_LIST,
  CONCERNS_LIST1,
  CONCERNS_LIST2,
  sexOptions,
  specOptions,
  useModalLogicHook,
} from "./useHookModal";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useOutsideClick } from "../../hooks";

interface ModalProps {
  onClose: () => void;
}

export const ModalWindow: React.FC<ModalProps> = ({ onClose }) => {
  const {
    isOpen,
    isOpenApproaches,
    selectedSex,
    selectedSpec,
    selectedCon,
    selectedAppr,
    handleConcernsList,
    handleApproachesList,
    handleSexSelection,
    handleSpexSelection,
    handleConSelection,
    handleAprrSelection,
    handleReset,
    handleApply,
  } = useModalLogicHook();

  const modalRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useOutsideClick(modalRef, onClose);

  return (
    <div
      ref={modalRef}
      className="modal__content"
      onClick={(e) => e.stopPropagation()}
    >
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
                  onClick={() => {
                    if (selectedSex === sex) {
                      handleSexSelection(null);
                    } else {
                      handleSexSelection(sex);
                    }
                  }}
                  style={{
                    backgroundColor: selectedSex === sex ? "#9B6A00" : "",
                    color: selectedSex === sex ? "#f1efe9" : "",
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
                  onClick={() => {
                    if (selectedSpec === spec) {
                      handleSpexSelection(null);
                    } else {
                      handleSpexSelection(spec);
                    }
                  }}
                  style={{
                    backgroundColor: selectedSpec === spec ? "#9B6A00" : "",
                    color: selectedSpec === spec ? "#f1efe9" : "",
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
              <h2 className="modal__TitleName" onClick={handleConcernsList}>
                Concerns
              </h2>

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
                              checked={selectedCon.includes(label)}
                              onChange={() => handleConSelection(label)}
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
                              checked={selectedCon.includes(label)}
                              onChange={() => handleConSelection(label)}
                            />
                          }
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
              <h2 className="modal__TitleName" onClick={handleApproachesList}>
                Approaches
              </h2>

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
                <div className="model__concernsDropWrapper1">
                  <ul className="model__concernsDrop">
                    {APPROACHES_LIST.map((label, index) => (
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
                              checked={selectedAppr.includes(label)}
                              onChange={() => handleAprrSelection(label)}
                            />
                          }
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
          <button className="Bt__Reset" onClick={handleReset}>
            Reset
          </button>
          <button
            className="Bt__Apply"
            onClick={() => {
              handleApply();
              onClose();
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
