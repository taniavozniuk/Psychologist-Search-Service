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

interface ModalProps {
  onClose: () => void;
}

export const ModalWindow: React.FC<ModalProps> = ({ onClose }) => {
  const [selectedSex, setSelectedSex] = useState<string | null>(null); //збереження Sex
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null); //збереження спеціалізації
  const [selectedCon, setSelectedCon] = useState<string[]>([]); //збереження чекбоксів Concerns
  const [selectedAppr, setSelectedAppr] = useState<string[]>([]); //збереження чекбоксів Approaches
  // const [psychologists, setPsychologists] = useState<allFilterPsychologist[]>(
  //   []
  // );
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useOutsideClick(modalRef, onClose);
  const [searchParams, setSearchParams] = useSearchParams(); // url сторінки

  console.log("searchParams", searchParams.toString());
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenApproaches, setIsOpenApproaches] = useState(false); //відкриття Approaches

  const handleConcernsList = () => {
    setIsOpen((prev) => !prev);
  };

  // відкриття approaches
  const handleApproachesList = () => {
    setIsOpenApproaches((prev) => !prev);
  };

  // збереження статі
  const handleSexSelection = (sex: string | null) => {
    setSelectedSex((prevSex) => (prevSex === sex ? null : sex));
  };

  //збереження стпеціалізації
  const handleSpexSelection = (spec: string | null) => {
    setSelectedSpec((prevSpec) => (prevSpec === spec ? null : spec));
  };

  // збереження чекбоксів занепокоїнь(Concerns)
  const handleConSelection = (con: string) => {
    const newSelectedCon = selectedCon.includes(con)
      ? selectedCon.filter((item) => item !== con)
      : [...selectedCon, con];

    setSelectedCon(newSelectedCon);
  };

  const selectedCons = searchParams.getAll('concerns');
  console.log('selectedCons',selectedCons)

  // useEffect(() => {
  //   // Синхронізую selectedCon з URL параметром concerns
  //   const concernsParam = searchParams.get("concerns");
  //   if (concernsParam) {
  //     const concernsFromUrl = concernsParam.split(",").map((item) =>
  //       CONCERNS_LIST1.concat(CONCERNS_LIST2).find((label) =>
  //         label.replace(/\s/g, "") === item
  //       ) || item
  //     );
  //     setSelectedCon(concernsFromUrl);
  //   } else {
  //     setSelectedCon([]);
  //   }

  //   // Синхронізую selectedAppr з URL параметром approaches
  //   const approachesParam = searchParams.get("approaches");
  //   if (approachesParam) {
  //     const approachesFromUrl = approachesParam.split(",").map((item) =>
  //       APPROACHES_LIST.find((label) => label.replace(/\s/g, "") === item) || item
  //     );
  //     setSelectedAppr(approachesFromUrl);
  //   } else {
  //     setSelectedAppr([]);
  //   }

  // }, [searchParams]);


  // збереження чекбоксів Approaches
  const handleAprrSelection = (appr: string) => {
    const newSelectedAppr = selectedAppr.includes(appr)
      ? selectedAppr.filter((item) => item !== appr)
      : [...selectedAppr, appr];

    setSelectedAppr(newSelectedAppr);
  };

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
    setSelectedSex(null);
    setSelectedSpec(null);
    setSelectedCon([]);
    setSelectedAppr([]);

    setSearchParams({})
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
              {sexOptions.map((sex) => (
                <SearchLink
                  params={(prev) => {
                    const current = new URLSearchParams(prev);
                    const isSelected = selectedSex === sex;

                    if (isSelected) {
                      current.delete("gender"); // прибираю якщо вже вибраний
                    } else {
                      current.set("gender", sex.toUpperCase()); // додаю новий
                    }

                    return Object.fromEntries(current.entries());
                  }}
                >
                  <button
                    key={sex}
                    className={`button__name ${
                      selectedSex === sex ? "selected" : ""
                    }`}
                    style={{
                      backgroundColor: selectedSex === sex ? "#9B6A00" : "",
                      color: selectedSex === sex ? "#f1efe9" : "",
                    }}
                    onClick={() => handleSexSelection(sex)}
                  >
                    {sex}
                  </button>
                </SearchLink>
              ))}
            </div>
          </div>
          <span className="modal__line"></span>

          <div className="modal__WrapperSpecialization">
            <h2 className="modal__TitleName">Specialization</h2>

            <div className="modal__button">
              {specOptions.map((spec) => (
                <SearchLink
                  params={(prev) => {
                    const current = new URLSearchParams(prev);
                    const isSelected = selectedSpec === spec;

                    if (isSelected) {
                      current.delete("speciality"); // прибираю якщо вже вибраний
                    } else {
                      current.set("speciality", spec); // додаю новий
                    }

                    return Object.fromEntries(current.entries());
                  }}
                >
                  <button
                    key={spec}
                    className={`button__SpecName ${
                      selectedSpec === spec ? "selected" : ""
                    }`}
                    style={{
                      backgroundColor: selectedSpec === spec ? "#9B6A00" : "",
                      color: selectedSpec === spec ? "#f1efe9" : "",
                    }}
                    onClick={() => handleSpexSelection(spec)}
                  >
                    {spec}
                  </button>
                </SearchLink>
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
                        <SearchLink
                          params={(prev) => {
                            const current = new URLSearchParams(prev);

                            const normalize = (str: string) =>
                              str.replace(/\s/g, "");

                            const existing =
                              current
                                .get("concerns")
                                ?.split(",")
                                .map(normalize) || [];

                            const normalizedLabel = normalize(label);

                            const updated = existing.includes(normalizedLabel)
                              ? existing.filter(
                                  (item) => item !== normalizedLabel
                                )
                              : [...existing, normalizedLabel];

                            if (updated.length === 0) {
                              current.delete("concerns");
                            } else {
                              current.set("concerns", updated.join(","));
                            }

                            return Object.fromEntries(current.entries());
                          }}
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
                                checked={selectedCon.includes(label)}
                                onChange={() => handleConSelection(label)}
                              />
                            }
                            label={label}
                          />
                        </SearchLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="model__concernsDropWrapper2">
                  <ul className="model__concernsDrop">
                    {CONCERNS_LIST2.map((label, index) => (
                      <li key={index} className="model__concernsItem">
                        <SearchLink
                          params={(prev) => {
                            const current = new URLSearchParams(prev);

                            const normalize = (str: string) =>
                              str.replace(/\s/g, "");

                            const existing =
                              current
                                .get("concerns")
                                ?.split(",")
                                .map(normalize) || [];

                            const normalizedLabel = normalize(label);

                            const updated = existing.includes(normalizedLabel)
                              ? existing.filter(
                                  (item) => item !== normalizedLabel
                                )
                              : [...existing, normalizedLabel];

                            if (updated.length === 0) {
                              current.delete("concerns");
                            } else {
                              current.set("concerns", updated.join(","));
                            }

                            return Object.fromEntries(current.entries());
                          }}
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
                                checked={selectedCons.includes(label)}
                                onChange={() => handleConSelection(label)}
                              />
                            }
                            label={label}
                          />
                        </SearchLink>
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
                        <SearchLink
                          params={(prev) => {
                            const current = new URLSearchParams(prev);

                            const normalize = (str: string) =>
                              str.replace(/\s/g, ""); // прибираю всі пробіли

                            const existing =
                              current
                                .get("approaches")
                                ?.split(",")
                                .map(normalize) || [];

                            const normalizedLabel = normalize(label);

                            const updated = existing.includes(normalizedLabel)
                              ? existing.filter(
                                  (item) => item !== normalizedLabel
                                )
                              : [...existing, normalizedLabel];

                            if (updated.length === 0) {
                              current.delete("approaches");
                            } else {
                              current.set("approaches", updated.join(","));
                            }

                            return Object.fromEntries(current.entries());
                          }}
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
                                checked={selectedAppr.includes(label)}
                                onChange={() => handleAprrSelection(label)}
                              />
                            }
                            label={label}
                          />
                        </SearchLink>
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
