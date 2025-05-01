import { useEffect, useState } from "react";
import "./Input.scss";
// import { addPsychologist, getPsychologist } from "../../api/api";
import { Psychologist } from "../../types/Psychologist";
import { useNavigate } from "react-router-dom";
import { getPsychologist } from "../../api/api";


export const Input = () => {
  const [searchText, setSearchText] = useState("");
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  // const [showSuggestion, setShowSuggestion] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPsychologist();
        const filtered = data.filter((psych: Psychologist) =>
          psych.firstName.toLowerCase().includes(searchText.toLowerCase())
        );

        setPsychologists(filtered);
      } catch (error) {
        console.log("Failed to fetch psychologists", error);
      }
    };

    if (searchText.trim().length > 0) {
      fetchData();
    } else {
      setPsychologists([]);
    }
  }, [searchText]);

  const handleClickPsycholog = (psychologistName: string) => {
    navigate(`/psychologist/${psychologistName}`);
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
      <div className="conteiner__input">
        <input
          name="name"
          type="text"
          className="input__find"
          placeholder="Find the specialist by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
      </div>
      {psychologists.length > 0 && (
        <ul className="search__result">
          {psychologists.map((phych: Psychologist) => (
            <li
              key={phych.id}
              className="search__item"
              onClick={() => {
                handleClickPsycholog(phych.firstName);
                setSearchText("");
              }}
            >
              {phych.firstName} {phych.lastName}
            </li>
          ))}
        </ul>
      )}
      {searchText && psychologists.length === 0 && (
        <ul className="search__result">
          <li className="search__item">Не знайдено результатів</li>
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
