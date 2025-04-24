import { Box, Slider, Typography } from "@mui/material";
import { useState } from "react";
import "./PriceSlider.scss";

export const PriceSlider = () => {
  const [value, setValue] = useState([200, 800]);

  const handleChangePrice = (_: unknown, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box>
      <Slider
        value={value}
        onChange={handleChangePrice}
        valueLabelDisplay="on" // <-- це тултіп над кнопками
        valueLabelFormat={(value: number) => `$${value}`}
        min={0}
        max={1000}
        step={10}
        sx={{
          // Стилізація треку
          fontFamily: "'Aileron', sans-serif",
          fontWeight: "400",
          "& .MuiSlider-track": {
            backgroundColor: "#9B6A00", // Змінюємо колір треку
            border: "1px solid transparent",
          },
          // Стилізація для лінії
          "& .MuiSlider-rail": {
            backgroundColor: "#4B463E", // Світліший колір для лінії позаду треку
          },
          // Стилізація для кружечків
          "& .MuiSlider-thumb": {
            borderRadius: "50%", // Круглі кнопки
            border: "3px solid #9B6A00", // Обрамлення кружечків
            backgroundColor: "#F9F0E2", // Колір кружечків
            width: 32, // Розмір кружечка
            height: 32, // Розмір кружечка
          },
          // Стилізація тултіпів
          "& .MuiSlider-valueLabel": {
            backgroundColor: "#4B463E", // Колір тултіпу
            color: "white", // Текст тултіпу
            fontSize: "18px",
          },
          "& .MuiSlider-valueLabelCircle": {
            backgroundColor: "#4B463E", // Колір кругу тултіпу
          },
        }}
      />

      <Box display="flex" justifyContent="space-between">
        <div className="box__title">
          <h2 className="title__maxMin">Min</h2>
          <button className="box__price">
            <Typography variant="body2">${value[0]}</Typography>
          </button>
        </div>

        <div className="box__title">
          <h2 className="title__maxMin">Max</h2>
          <button className="box__price">
            <Typography variant="body2">${value[1]}</Typography>
          </button>
        </div>
      </Box>
    </Box>
  );
};
