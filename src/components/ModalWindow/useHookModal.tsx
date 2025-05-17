
export const sexOptions = ["Male", "Female", "Other"];
export const specOptions = [
  { id: "1", label: "Individual" },
  { id: "2", label: "Non-binary" },
];

export const CONCERNS_LIST1 = [
  { id: "1", label: "Anxiety" },
  { id: "2", label: "Grief and loss" },
  { id: "3", label: "Panic attacks" },
  { id: "4", label: "Family issues" },
  { id: "5", label: "Burnout" },
];

export const CONCERNS_LIST2 = [
  { id: "6", label: "Depression" },
  { id: "7", label: "Loneliness" },
  { id: "8", label: "Mood swings" },
  { id: "9", label: "Social anxiety" },
  { id: "10", label: "Stress" },
];

export const APPROACHES_LIST = [
  { id: "1", label: "Psychodynamic Therapy" },
  { id: "2", label: "Cognitive Behavioral Therapy" },
  { id: "3", label: "Humanistic Therapy" },
  { id: "4", label: "Integrative Therapy" },
  { id: "5", label: "Narrative Therapy" },
];

import { useState } from "react";
// import { useNavigate } from "react-router-dom";

export const useModalLogicHook = () => {
  // const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false); // concerns dropdown
  const [isOpenApproaches, setIsOpenApproaches] = useState(false); // approaches dropdown

  const [selectedSex, setSelectedSex] = useState<string | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
  const [selectedCon, setSelectedCon] = useState<string[]>([]);
  const [selectedAppr, setSelectedAppr] = useState<string[]>([]);

  const handleConcernsList = () => setIsOpen((prev) => !prev);
  const handleApproachesList = () => setIsOpenApproaches((prev) => !prev);

  const handleSexSelection = (sex: string | null) => {
    setSelectedSex(sex);
  };

  const handleSpexSelection = (spec: string | null) => {
    setSelectedSpec(spec);
  };

  const handleConSelection = (con: string) => {
    setSelectedCon((prev) =>
      prev.includes(con) ? prev.filter((c) => c !== con) : [...prev, con]
    );
  };

  const handleAprrSelection = (appr: string) => {
    setSelectedAppr((prev) =>
      prev.includes(appr) ? prev.filter((a) => a !== appr) : [...prev, appr]
    );
  };

  const handleReset = () => {
    setSelectedSex(null);
    setSelectedSpec(null);
    setSelectedCon([]);
    setSelectedAppr([]);
  };


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
  };
};
