import React from "react";
import "./Filter.scss";

interface FilterProps {
  onOpen: () => void;
}

export const Filetr: React.FC<FilterProps> = ({ onOpen }) => {
  return (
    <div className="conteiner__filter">
      <div className="filter__find" onClick={onOpen}>
        Filters
      </div>
    </div>
  );
};
