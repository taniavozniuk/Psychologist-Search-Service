import axios from "axios";
import { postPsychologist } from "../types/post";
import { SingUp } from "../types/singUp";


const BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
    const response = await apiClient.post('/auth/register', formData);
    return response.data;
  } catch (error) {
    console.log("SingUp error", error)
    throw error;
  }
}