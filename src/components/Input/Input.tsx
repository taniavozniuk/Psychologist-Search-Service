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

  // useEffect(() => {
  //   if (searchText.trim() !== "" && psychologists.length === 0) {
  //     setShowSuggestion(true);

  //     const timer = setTimeout(() => {
  //       setShowSuggestion(false);
  //     }, 2000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [searchText, psychologists.length]);

  // const filtereredPsychologist = psychologists.filter((psych: Psychologist) =>
  //   psych.firstName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
  // );

  // const handleSuggestionClick = () => {
  //   navigate("/find"); // Перехід на сторінку з усіма психологами
  // };

  // const handleAddPsychologist = async () => {
  //   const newPsychologist: postPsychologist = {
  //     firstName: "Ben",
  //     lastName: "Penter",
  //     fatherName: "Jo",
  //     phoneNumber: "41245566",
  //     email: "ben.sge@gmail.com",
  //     sessionPrice: "150.00",
  //     introduction: "Some intro data",
  //     specialityId: 1,
  //     gender: "MALE",
  //   };

  //   try {
  //     const result = await addPsychologist(newPsychologist);
  //     console.log("Психолог успішно доданий:", result);
  //   } catch (error) {
  //     console.error("Помилка при додаванні психолога:", error);
  //   }
  // };

  return (
    <>
      {/* {isLoading && (
        <div className="loader-container">
          <SmallLoader />
        </div>
      )} */}
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
      {psychologists.length > 0 && (
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
      {searchText && psychologists.length === 0 && !isLoading && (
        <ul className="search__result">
          <li className="search__item">No results found</li>
        </ul>
      )}

      {isLoading && (
        <ul className="search__result">
          <li className="search__item">Loading...</li>
        </ul>
      )}
      {/* 
      {showSuggestion && (
        <div className="suggestion-box" onClick={handleSuggestionClick}>
          <p>Go to the psychologists page</p>
        </div>
      )} */}
      {/* <button onClick={handleAddPsychologist}>Add New Psychologist</button> */}
    </>
  );
};
