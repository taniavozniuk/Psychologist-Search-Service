import axios from "axios";
import { postPsychologist } from "../types/post";
import { SingUp } from "../types/singUp";
import { LogInType } from "../types/LogIn";
import { Booking } from "../types/bookings";
import { Payment } from "../types/Payment";

//затримка
const delay = () => new Promise((resolve) => setTimeout(resolve, 500));

const BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//додаю токен до кожного запиту
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (!token) {
    localStorage.removeItem("accessToken");
  }

  return config;
});

//отримую психологів
export const getPsychologist = async () => {
  await delay();
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
  await delay();
  try {
    const response = await apiClient.get("psychologists/filter");
    return response.data;
  } catch (error) {
    console.log("GetFilter Error ", error);
    throw error;
  }
};
//отримую психолога за id
export const getPsychologistId = async (id: string) => {
  try {
    const response = await apiClient.get(`/psychologists/${id}`);
    return response.data;
  } catch (error) {
    console.log("GetId Error ", error);
    throw error;
  }
};

//отримую всі доступні дати для психолога за ідентифікатором на вказану дату
export const getDateBokkingId = async (id: string, selectedDate: string) => {
  try {
    const response = await apiClient.get(`/bookings/free_spots/${id}`, {
      params: { selectedDate },
    });
    return response.data;
  } catch (error) {
    console.log("GetDateBokkingId Error ", error);
    throw error;
  }
};

//отримую недоступні дні
export const getLokedDates = async (id: string, selectedDate: string) => {
  try {
    const response = await apiClient.get(`/bookings/lockedDates/${id}`, {
      params: { selectedDate },
    });
    return response.data;
  } catch (error) {
    console.log("getLokedDates Error ", error);
    throw error;
  }
};

//booking
export const addBooking = async (book: Booking) => {
  try {
    const response = await apiClient.post("/bookings", book);
    return response.data;
  } catch (error) {
    console.log("Bookings Error: ", error);
    throw error;
  }
};

//payment
export const addPayment = async (pay: Payment) => {
  try {
    const response = await apiClient.post('/payments', pay);
    return response.data
  }catch (error) {
    console.log("Payment Error: ", error);
    throw error;
  }
}

//user
export const getUser = async () => {
  try {
    const response = await apiClient.get("/users/me");
    return response.data;
  } catch (error) {
    console.log("getUser Error: ", error);
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
export const logInUser = async (formData: LogInType) => {
  try {
    const response = await apiClient.post("/auth/login", formData);
    return response.data;
  } catch (error) {
    console.log("LogIn error", error);
    throw error;
  }
};
