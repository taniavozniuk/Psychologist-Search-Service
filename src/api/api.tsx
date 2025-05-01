import axios from "axios";
import { postPsychologist } from "../types/post";
import { SingUp } from "../types/singUp";
import { LogInType } from "../types/LogIn";

const BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//додаю токен до кожного запиту
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (!token) {
    localStorage.removeItem('accessToken');
  }

  return config;
})

//отримую психологів
export const getPsychologist = async () => {
  try {
    const response = await apiClient.get("/psychologists");
    return response.data;
  } catch (error) {
    console.log("Get Error ", error);
    throw error;
  }
};

//отримую психологів з філтрами
export const getFilterPsychologist = async () => {
  try {
    const response = await apiClient.get("psychologists/filter");
    return response.data;
  } catch (error) {
    console.log("GetFilter Error ", error);
    throw error;
  }
};

//дадаю додаткового психолога до бази якщо треба
export const addPsychologist = async (newPsychologist: postPsychologist) => {
  try {
    const response = await apiClient.post("/psychologists", newPsychologist);
    return response.data;
  } catch (error) {
    console.log("Post Error: ", error);
    throw error;
  }
};

//реєстрацію(sing Up)
export const singUp = async (formData: SingUp) => {
  try {
    console.log("Submitting to backend:", formData);
    const response = await apiClient.post("/auth/register", formData);
    return response.data;
  } catch (error) {
    console.log("SingUp error", error);
    throw error;
  }
};

//логінація(LogIn)
export const logInUser  = async (formData: LogInType) => {
  try {
    const response = await apiClient.post("/auth/login", formData);
    return response.data;
  } catch (error) {
    console.log("LogIn error", error);
    throw error;
  }
};
