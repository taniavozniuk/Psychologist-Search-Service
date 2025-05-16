
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useModalLogicHook = () => {
  const navigate = useNavigate();

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

  const handleApply = () => {
    navigate("/psychologist", {
      state: { formApplyButton: true, forceRefresh: Date.now() },
    });
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
    handleApply,
  };
};
