import { useEffect, useState } from "react";
import "./Input.scss";
import { getPsychologist } from "../../api";
import { Psychologist } from "../../types/Psychologist";
import { useNavigate } from "react-router-dom";

export const Input = () => {
  const [searchText, setSearchText] = useState("");
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
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
    </>
  );
};
