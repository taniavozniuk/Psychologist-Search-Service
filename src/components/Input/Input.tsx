import { useEffect, useState } from "react";
import "./Input.scss";
// import { addPsychologist, getPsychologist } from "../../api/api";
import { Psychologist } from "../../types/Psychologist";
import { useNavigate } from "react-router-dom";
import { getPsychologist } from "../../api/api";

export const Input = () => {
  const [searchText, setSearchText] = useState("");
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
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

  useEffect(() => {
    if (searchText.trim() !== "" && psychologists.length === 0) {
      setShowSuggestion(true);

      const timer = setTimeout(() => {
        setShowSuggestion(false);
      }, 3000); // Затримка в 1 секунду

      return () => clearTimeout(timer);
    }
  }, [searchText, psychologists.length]);

  // const filtereredPsychologist = psychologists.filter((psych: Psychologist) =>
  //   psych.firstName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
  // );

  const handleSuggestionClick = () => {
    navigate("/find"); // Перехід на сторінку з усіма психологами
  };

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
              onClick={() => handleClickPsycholog(phych.firstName)}
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

      {showSuggestion && (
        <div className="suggestion-box" onClick={handleSuggestionClick}>
          <p>Go to the psychologists page</p>
        </div>
      )}
      {/* <button onClick={handleAddPsychologist}>Add New Psychologist</button> */}
    </>
  );
};
