import React from "react";
import "./Filter.scss";

interface FilterProps {
  onOpen: () => void;
  isHomePage: boolean;
  isAbout: boolean;
}



export const Filetr: React.FC<FilterProps> = ({ onOpen, isHomePage, isAbout }) => {
  const isTransparentTopBar = isHomePage || isAbout;

  return (
    <div className="conteiner__filter">
      <div className={isTransparentTopBar ? 'filter__find' : 'filter__nothingChange'} onClick={onOpen}>
        Filters
      </div>
    </div>
  );
};
