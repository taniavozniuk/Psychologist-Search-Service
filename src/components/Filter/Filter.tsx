import React from "react";
import "./Filter.scss";

interface FilterProps {
  onOpen: () => void;
}

export const Filetr: React.FC<FilterProps> = ({ onOpen }) => {
  // const [isModalFilterOpen, setIsModalFilteOpen] = useState(false);

  // const handleFilter = () => {
  //   setIsModalFilteOpen(true);
  // };

  return (
    <div className="conteiner__filter">
      <div className="filter__find" onClick={onOpen}>
        Filters
      </div>

      {/* {isModalFilterOpen && (
        <div className="filter__modal">
          <p>тут модальне вікно</p>
        </div>
      )} */}
    </div>
  );
};
