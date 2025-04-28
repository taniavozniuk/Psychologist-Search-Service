import { useEffect } from "react";
import { useModalLogicHook } from "../ModalWindow/useHookModal";
import "./PsychologistPI.scss";

export const PsychologistPageInfo = () => {
  const {
    selectedSex,
    selectedSpec,
    selectedCon,
    selectedAppr,
    setSelectedSex,
    setSelectedSpec,
    setSelectedCon,
    setSelectedAppr,
  } = useModalLogicHook();

  useEffect(() => {
    const storedSex = localStorage.getItem("selectedSex");
    const storedSpec = localStorage.getItem("selectedSpec");
    const storedConcerns = localStorage.getItem("selectedCon");
    const storedApproaches = localStorage.getItem("selectedAppr");

    if (storedSex) setSelectedSex(storedSex);
    if (storedSpec) setSelectedSpec(storedSpec);
    if (storedConcerns) setSelectedCon(JSON.parse(storedConcerns));
    if (storedApproaches) setSelectedAppr(JSON.parse(storedApproaches));
  }, []);

  return (
    <>
      <h2 className="about__title">PsychologistPage</h2>

      <div className="page__psychologists">
        <div className="psychologists__card">
          {/* Стать */}
          <div className="filter__info">
            <h3>Selected Sex:</h3>
            <p>{selectedSex ? selectedSex : "Not selected"}</p>
          </div>

          {/* Спеціалізація */}
          <div className="filter__info">
            <h3>Selected Specialization:</h3>
            <p>{selectedSpec ? selectedSpec : "Not selected"}</p>
          </div>

          {/* Занепокоєння */}
          <div className="filter__info">
            <h3>Selected Concerns:</h3>
            <ul>
              {selectedCon.length > 0 ? (
                selectedCon.map((concern, index) => (
                  <li key={index}>{concern}</li>
                ))
              ) : (
                <p>No concerns selected</p>
              )}
            </ul>
          </div>

          {/* Підходи */}
          <div className="filter__info">
            <h3>Selected Approaches:</h3>
            <ul>
              {selectedAppr.length > 0 ? (
                selectedAppr.map((approach, index) => (
                  <li key={index}>{approach}</li>
                ))
              ) : (
                <p>No approaches selected</p>
              )}
            </ul>
          </div>

          {/* Додаткові фільтри (ціна, тощо) */}
          {/* Якщо є потреба додавати додаткові фільтри (якщо ціни, регіони і так далі) */}
        </div>
      </div>
    </>
  );
};
