import { useEffect, useState } from "react";
import { useModalLogicHook } from "../ModalWindow/useHookModal";
import "./PsychologistPI.scss";
import { useLocation } from "react-router-dom";
import { getFilterPsychologist } from "../../api/api";
import { allFilterPsychologist } from "../../types/allFilterPsychologist";
import spec from "../../image/AboutPsychologist/people.svg";

export const PsychologistPageAll = () => {
  const {
    selectedSex,
    selectedSpec,
    selectedCon,
    // selectedAppr,
    setSelectedSex,
    setSelectedSpec,
    setSelectedCon,
    setSelectedAppr,
  } = useModalLogicHook();

  const location = useLocation();
  const [psychologists, setPsychologists] = useState<allFilterPsychologist[]>(
    []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemPrePage = 3;

  //отримую психологів для фільтрації
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFilterPsychologist();
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

    const conMatch = selectedCon
      ? psych.concernIds.id === Number(selectedCon)
      : true;
    if (conMatch) score++;

    return { ...psych, score }; // Додаємо рахунок до психолога
  });

  // Сортуємо психологів за рахунком
  const sortedPsychologists = filteredPsychologists
    .filter((psych) => psych.score > 0) // Вибираємо лише тих, хто має рахунок > 0
    .sort((a, b) => b.score - a.score); // Сортуємо за рахунком у спадаючому порядку

  const totalPages = Math.ceil(sortedPsychologists.length / itemPrePage);
  const indexOfLastItem = currentPage * itemPrePage;
  const indexOfFirstItem = (currentPage - 1) * itemPrePage;
  const currentPsychologists = sortedPsychologists.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="Page">
      <div className="wrapper">
        <h2 className="psychologists__title">Psychologists just for you</h2>
        <p className="psychologists__description">
          Here are the psychologists that match your criteria. Browse their
          profiles and choose the one that suits you best.
        </p>
      </div>

      <div className="page__psychologists">
        {currentPsychologists.map((psych) => (
          <div key={psych.id} className="psychologist__card">
            <div className="psychologistWrapper__info">
              <div className="psychologistInfo__NamePrice">
                <h3 className="psychologistInfo__name">
                  {psych.firstName} {psych.lastName}
                </h3>
              </div>
              {/* пропускаю поки */}
              {/* <div className="psychologistInfo__ratingPrice"></div> */}
              <span className="psychologistInfo__line"></span>

              <div className="psychologistWrapper__about">
                <h2 className="psychologistAbout__title">
                  About the psychologist
                </h2>

                <div className="Specialization">
                  <div className="SpecializationWrraper">
                    <img src={spec} alt="spec" />
                    <h6 className="specTitle">Specialization </h6>
                  </div>
                  <p className="specName">{psych.speciality.name}</p>
                </div>
              </div>

              <p>{psych.concernIds.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="prev__buttons">
        <button
          className={`mobile__buttonsbuttonPrev ${
            currentPage === 1 ? "disabled" : ""
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            className={`mobile__pagination ${
              currentPage === number ? "active" : ""
            }`}
            onClick={() => handlePageChange(number)}
            disabled={currentPage === number}
          >
            {number}
          </button>
        ))}
        <button
          className={`mobile__buttonsbuttonNext ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
