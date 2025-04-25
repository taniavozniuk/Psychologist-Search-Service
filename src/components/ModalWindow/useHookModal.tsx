import { Checkbox, FormControlLabel } from "@mui/material";

export const sexOptions = ["Male", "Female", "Non-binary"];
export const specOptions = ["Individual", "Couple therapy"];

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

export const CheckboxList = ({ items }: { items: string[] }) => (
  <ul className="model__concernsDrop">
    {items.map((label, index) => (
      <li key={index} className="model__concernsItem">
        <FormControlLabel
          control={
            <Checkbox
              className="model__concernsList"
              sx={{
                color: "#0C0B09",
                "&.Mui-checked": {
                  color: "#9B6A00",
                },
                "&:hover": {
                  color: "#7C746A",
                },
              }}
            />
          }
          label={label}
        />
      </li>
    ))}
  </ul>
);