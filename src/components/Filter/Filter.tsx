import './Filter.scss'

export const Filetr = () => {
  return (
    <div className="conteiner__filter">
      <input
        name="name"
        type="text"
        className="filter__find"
        placeholder="Filters"
      ></input>
    </div>
  );
};
