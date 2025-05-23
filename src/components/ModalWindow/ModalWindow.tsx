import React, { useRef, useState } from "react";
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
} from "./useHookModal";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useOutsideClick } from "../../hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchLink } from "../../utils/SearchLink";
import ToggleSelectedIdLink from "../../utils/ToggleSelectedIdLink";

interface ModalProps {
  onClose: () => void;
}

export const ModalWindow: React.FC<ModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useOutsideClick(modalRef, onClose);
  const [searchParams, setSearchParams] = useSearchParams(); // url сторінки

  console.log("searchParams", searchParams.toString());
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenApproaches, setIsOpenApproaches] = useState(false); //відкриття Approaches

  const minPriceFromUrl = searchParams.get("minPrice");
  const maxPriceFromUrl = searchParams.get("maxPrice");

  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPriceFromUrl ? Number(minPriceFromUrl) : 100,
    maxPriceFromUrl ? Number(maxPriceFromUrl) : 9000,
  ]);

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);

    const current = new URLSearchParams(searchParams);

    current.set("minPrice", newRange[0].toFixed(2).toString());
    current.set("maxPrice", newRange[1].toFixed(2).toString());

    setSearchParams(current);
  };
  const handleConcernsList = () => {
    setIsOpen((prev) => !prev);
  };

  // відкриття approaches
  const handleApproachesList = () => {
    setIsOpenApproaches((prev) => !prev);
  };

  const selectedSex = searchParams.get("gender")?.toLowerCase();
  const selectedSpec = searchParams.get("specialityId");
  const selectedCons = searchParams.getAll("concernIds");
  const selectedApprs = searchParams.getAll("approachIds");
  console.log("selectedCons", selectedCons);

  const handleApply = () => {
    const currentSearchParams = searchParams.toString();

    navigate(
      currentSearchParams
        ? `/psychologist?${currentSearchParams}`
        : `/psychologist`,
      { state: { shouldFetch: false } }
    );
  };

  const handleResetFilters = () => {

    setSearchParams({});
  };

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
              {sexOptions.map((sex) => {
                console.log({ selectedSex, sex });

                return (
                  <SearchLink params={{ gender: sex.toUpperCase() }}>
                    <button
                      key={sex}
                      className={`button__name ${
                        selectedSex === sex.toLowerCase() ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor:
                          selectedSex === sex.toLowerCase() ? "#9B6A00" : "",
                        color:
                          selectedSex === sex.toLowerCase() ? "#f1efe9" : "",
                      }}
                      // onClick={() => handleSexSelection(sex)}
                    >
                      {sex}
                    </button>
                  </SearchLink>
                );
              })}
            </div>
          </div>
          <span className="modal__line"></span>

          <div className="modal__WrapperSpecialization">
            <h2 className="modal__TitleName">Specialization</h2>
            <div className="modal__button">
              {specOptions.map(({ id, label }) => (
                <SearchLink params={{ specialityId: id }}>
                  <button
                    className={`button__SpecName ${
                      selectedSpec === id ? "selected" : ""
                    }`}
                    style={{
                      backgroundColor: selectedSpec === id ? "#9B6A00" : "",
                      color: selectedSpec === id ? "#f1efe9" : "",
                    }}
                    // onClick={() => handleSpexSelection(id)}
                  >
                    {label}
                  </button>
                </SearchLink>
              ))}
            </div>
          </div>
          <span className="modal__line"></span>

          <div className="modal__WrapperPrice">
            <h2 className="modal__TitlePrice">Price range</h2>
            <PriceSlider
              priceRange={priceRange}
              setPriceRange={handlePriceChange}
            />
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
                    {CONCERNS_LIST1.map(({ id, label }) => (
                      <li key={id} className="model__concernsItem">
                        <ToggleSelectedIdLink
                          idToToggle={id}
                          paramName="concernIds"
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                className="model__concernsList"
                                sx={{
                                  color: "#0C0B09",
                                  "&.Mui-checked": { color: "#9B6A00" },
                                  "&:hover": { color: "#7C746A" },
                                }}
                                checked={selectedCons.includes(id)}
                                onChange={() => {}}
                              />
                            }
                            label={label}
                          />
                        </ToggleSelectedIdLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="model__concernsDropWrapper2">
                  <ul className="model__concernsDrop">
                    {CONCERNS_LIST2.map(({ id, label }) => (
                      <li key={id} className="model__concernsItem">
                        <ToggleSelectedIdLink
                          idToToggle={id}
                          paramName="concernIds"
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                className="model__concernsList"
                                sx={{
                                  color: "#0C0B09",
                                  "&.Mui-checked": { color: "#9B6A00" },
                                  "&:hover": { color: "#7C746A" },
                                }}
                                checked={selectedCons.includes(id)}
                                // onChange={() => handleConSelection(id)}
                              />
                            }
                            label={label}
                          />
                        </ToggleSelectedIdLink>
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
                    {APPROACHES_LIST.map(({ id, label }) => (
                      <li key={id} className="model__concernsItem">
                        <ToggleSelectedIdLink
                          idToToggle={id}
                          paramName="approachIds"
                        >
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
                                checked={selectedApprs.includes(id)}
                                // onChange={() => handleAprrSelection(id)}
                              />
                            }
                            label={label}
                          />
                        </ToggleSelectedIdLink>
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
          <button className="Bt__Reset" onClick={handleResetFilters}>
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
