import "./Input.scss";

export const Input = () => {
  return (
    <div className="conteiner__input">
      <input
        name="name"
        type="text"
        className="input__find"
        placeholder="Find the specialist by name"
      ></input>
    </div>
  );
};
