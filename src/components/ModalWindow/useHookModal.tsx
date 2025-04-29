import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const sexOptions = ["Male", "Female", "Non-binary"];
export const specOptions = ["Individual", "Non-binary"];

export const CONCERNS_LIST1 = [
  "Anxiety",
  "Grief and loss",
  "Panic attacks",
  "Family issues",
  "Burnout",
];

export const CONCERNS_LIST2 = [
  "Depression",
  "Loneliness",
  "Mood swings",
  "Social anxiety",
  "Stress",
];

export const APPROACHES_LIST = [
  "Psychodynamic Therapy",
  "Cognitive Behavioral Therapy",
  "Humanistic Therapy",
  "Integrative Therapy",
  "Narrative Therapy",
];

export const useModalLogicHook = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false); //відкриття Concerns
  const [isOpenApproaches, setIsOpenApproaches] = useState(false); //відкриття Approaches
  const [selectedSex, setSelectedSex] = useState<string | null>(
    localStorage.getItem("selectedSex")
  ); //збереження Sex
  const [selectedSpec, setSelectedSpec] = useState<string | null>(
    localStorage.getItem("selectedSpec")
  ); //збереження спеціалізації
  const [selectedCon, setSelectedCon] = useState<string[]>(
    JSON.parse(localStorage.getItem("selectedCon") || "[]")
  ); //збереження чекбоксів Concerns
  const [selectedAppr, setSelectedAppr] = useState<string[]>(
    JSON.parse(localStorage.getItem("selectedAppr") || "[]")
  ); //збереження чекбоксів Approaches

  // відкриття concerns
  const handleConcernsList = () => {
    setIsOpen((prev) => !prev);
  };

  // відкриття approaches
  const handleApproachesList = () => {
    setIsOpenApproaches((prev) => !prev);
  };

  // збереження статі
  const handleSexSelection = (sex: string | null) => {
    setSelectedSex(sex);
    localStorage.setItem("selectedSex", sex || "");
  };

  //збереження стпеціалізації
  const handleSpexSelection = (spec: string | null) => {
    setSelectedSpec(spec);
    localStorage.setItem("selectedSpec", spec || "");
  };

  // збереження чекбоксів занепокоїнь(Concerns)
  const handleConSelection = (con: string) => {
    setSelectedCon((prevSelectedCon) => {
      const newSelectedCon = prevSelectedCon.includes(con)
        ? prevSelectedCon.filter((item) => item !== con) // Deselect
        : [...prevSelectedCon, con]; // Select

      localStorage.setItem("selectedCon", JSON.stringify(newSelectedCon));
      return newSelectedCon;
    });
  };

  // збереження чекбоксів Approaches
  const handleAprrSelection = (appr: string) => {
    setSelectedAppr((prevSelectedAppr) => {
      const newSelectedAprr = prevSelectedAppr.includes(appr)
        ? prevSelectedAppr.filter((item) => item !== appr)
        : [...prevSelectedAppr, appr];

      localStorage.setItem("selectedAppr", JSON.stringify(newSelectedAprr));
      return newSelectedAprr;
    });
  };

  const handleReset = () => {
    setSelectedSex(null);
    setSelectedSpec(null);
    setSelectedCon([]);
    setSelectedAppr([]);

    //очищую localstoreg
    localStorage.removeItem("selectedCon");
    localStorage.removeItem("selectedAppr");
    localStorage.removeItem("selectedSex");
    localStorage.removeItem("selectedSpec");
  };

  const handleApply = () => {
    navigate("/psychologist", {
      state: { formApplyButton: true },
    });

    localStorage.setItem("selectedCon", JSON.stringify(selectedCon));
    localStorage.setItem("selectedAppr", JSON.stringify(selectedAppr));
    localStorage.setItem("selectedSex", selectedSex || "");
    localStorage.setItem("selectedSpec", selectedSpec || "");
  };

  useEffect(() => {
    const storedSex = localStorage.getItem("selectedSex");

    if (storedSex) {
      setSelectedSex(storedSex);
    }

    const storedSpec = localStorage.getItem("selectedSpec");

    if (storedSpec) {
      setSelectedSpec(storedSpec);
    }

    const storedConcerns = localStorage.getItem("selectedCon");
    if (storedConcerns) {
      setSelectedCon(JSON.parse(storedConcerns));
    }

    const storedApproaches = localStorage.getItem("selectedAppr");
    if (storedApproaches) {
      setSelectedAppr(JSON.parse(storedApproaches));
    }
  }, []);

  return {
    isOpen,
    isOpenApproaches,
    selectedSex,
    selectedSpec,
    selectedCon,
    selectedAppr,
    setSelectedSex,
    setSelectedSpec,
    setSelectedCon,
    setSelectedAppr,
    handleConcernsList,
    handleApproachesList,
    handleSexSelection,
    handleSpexSelection,
    handleConSelection,
    handleAprrSelection,
    handleReset,
    handleApply,
  };
};
