import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPsychologist = async () => {
  try {
    const response = await apiClient.get('/psychologists');
    return response.data;
  } catch (error) {
    console.log('Erororerer', error)
    throw error;
  }
}

// export const getTest = async () => {
//   const response = await axios
//     .get("http://localhost:8080/api/psychologists")
//     .catch((error) => {
//       console.error("❌ Помилка запиту:", error.message);
//       throw new Error(error.message);
//     });

//   console.log("✅ Отримано відповідь:", response.data); // ← ось це виведе дані

//   return response;
// };
