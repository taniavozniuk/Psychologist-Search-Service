import { useEffect, useState } from "react";
import { useModalLogicHook } from "../ModalWindow/useHookModal";
import "./PsychologistPI.scss";
import { useLocation } from "react-router-dom";
import { Psychologist } from "../../types/Psychologist";
import { getPsychologist } from "../../api/api";

export const PsychologistPageAll = () => {
  const {
    selectedSex,
    selectedSpec,
    // selectedCon,
    // selectedAppr,
    setSelectedSex,
    setSelectedSpec,
    setSelectedCon,
    setSelectedAppr,
  } = useModalLogicHook();

  const location = useLocation();
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);

  //отримую психологів для фільтрації
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPsychologist();
        setPsychologists(data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedSex = localStorage.getItem("selectedSex");
    const storedSpec = localStorage.getItem("selectedSpec");
    const storedConcerns = localStorage.getItem("selectedCon");
    const storedApproaches = localStorage.getItem("selectedAppr");

    if (storedSex) setSelectedSex(storedSex);
    if (storedSpec) setSelectedSpec(storedSpec);
    if (storedConcerns) setSelectedCon(JSON.parse(storedConcerns));
    if (storedApproaches) setSelectedAppr(JSON.parse(storedApproaches));

    // if (location.state?.formApplyButton) {
    //   console.log("Apply button was clicked, updating data...");
    // }
  }, [location.state]);

  const filteredPsychologists = psychologists.map((psych) => {
    let score = 0;

    // Перевірка на відповідність статі
    const sexMatch = selectedSex
      ? psych.gender.toLowerCase() === selectedSex.toLowerCase()
      : true;
    if (sexMatch) score++;

    // Перевірка на відповідність спеціалізації
    const specMatch = selectedSpec
      ? psych.speciality.name.toLowerCase() === selectedSpec.toLowerCase()
      : true;
    if (specMatch) score++;

    return { ...psych, score }; // Додаємо рахунок до психолога
  });

  // Сортуємо психологів за рахунком
  const sortedPsychologists = filteredPsychologists
    .filter((psych) => psych.score > 0) // Вибираємо лише тих, хто має рахунок > 0
    .sort((a, b) => b.score - a.score); // Сортуємо за рахунком у спадаючому порядку

  return (
    <>
      <div className="wrapper">
        <h2 className="psychologists__title">Psychologists just for you</h2>
        <p className="psychologists__description">
          Here are the psychologists that match your criteria. Browse their
          profiles and choose the one that suits you best.
        </p>
      </div>

      <div className="page__psychologists">
        {sortedPsychologists.map((psych) => (
          <div key={psych.id} className="psychologist__card">
            <div className="psychologistWrapper__info">
              <div className="info__NamePrice">
                <h3>
                  {psych.firstName} {psych.lastName}
                </h3>
              </div>

              <p>Gender: {psych.gender}</p>
              <p>Specialization: {psych.speciality.name}</p>
              <p>Price: {psych.sessionPrice} UAH</p>
              <p>{psych.introduction}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
