import React, { useEffect, useState } from "react";
import "./Input.scss";
// import { addPsychologist, getPsychologist } from "../../api/api";
import { Psychologist } from "../../types/Psychologist";
import { useNavigate } from "react-router-dom";
import { getPsychologist } from "../../api/api";

interface InputProps {
  isHomePage: boolean;
  isAbout: boolean;
}

export const Input: React.FC<InputProps> = ({ isHomePage, isAbout }) => {
  const [searchText, setSearchText] = useState("");
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [showSuggestion, setShowSuggestion] = useState(false);
  const navigate = useNavigate();
  // const modalRef = useRef<HTMLDivElement>(null);
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-expect-error
  // useOutsideClick(modalRef, onClose);

  const isTransparentTopBar = isHomePage || isAbout;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getPsychologist();
        const filtered = data.filter(
          (psych: Psychologist) =>
            psych.firstName
              .toLowerCase()
              .startsWith(searchText.toLowerCase()) ||
            psych.lastName.toLowerCase().startsWith(searchText.toLowerCase())
        );

        setPsychologists(filtered);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500); // 1.5 секунди
      } catch (error) {
        console.log("Failed to fetch psychologists", error);
        setPsychologists([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchText.trim().length > 0) {
      fetchData();
    } else {
      setPsychologists([]);
    }
  }, [searchText]);

  const handleClickPsycholog = (psychologistId: number) => {
    navigate(`/psychologist/${psychologistId}`);
  };

  const shouldShowDropdown = searchText.trim().length > 0;

  return (
    <>
      <div className="conteiner__input">
        <input
          name="name"
          type="text"
          className={`input__find ${
            isTransparentTopBar ? "input--glass" : "input--plain"
          }`}
          placeholder="Find the specialist by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {shouldShowDropdown && psychologists.length > 0 && (
        <ul className="search__result">
          {psychologists.map((phych: Psychologist) => (
            <li
              key={phych.id}
              className="search__item"
              onClick={() => {
                handleClickPsycholog(phych.id);
                setSearchText("");
              }}
            >
              {phych.firstName} {phych.lastName}
            </li>
          ))}
        </ul>
      )}
      {shouldShowDropdown &&
        searchText &&
        psychologists.length === 0 &&
        !isLoading && (
          <ul className="search__result">
            <li className="search__item">No results found</li>
          </ul>
        )}

      {shouldShowDropdown && isLoading && (
        <ul className="search__result">
          <li className="search__item">Loading...</li>
        </ul>
      )}
    </>
  );
};
