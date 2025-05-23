import axios from "axios";
import { postPsychologist } from "../types/post";
import { SingUp } from "../types/singUp";
import { LogInType } from "../types/LogIn";
import { BookingCalendar } from "../types/bookingsCalendar";
import { Payment } from "../types/Payment";
import { Review } from "../types/Postreview";
import { BookingUnauth } from "../types/BookingUnauth";

//затримка
const delay = () => new Promise((resolve) => setTimeout(resolve, 500));

const BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiClientUnauth = axios.create({
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

// export const getFilterPsychologist = async (searchParams?: string) => {
//   await delay();
//   try {
//     const URL = searchParams
//       ? `psychologists/filter?${searchParams.toString()}`
//       : `psychologists/filter`;
//     const response = await apiClient.get(URL);
//     return response.data;
//   } catch (error) {
//     console.log("GetFilter Error ", error);
//     throw error;
//   }
// };

//отримую психологів з філтрами розпарений
export const getFilterPsychologist = async (
  searchParams?: URLSearchParams | string
) => {
  await delay();
  try {
    const params =
      typeof searchParams === "string"
        ? new URLSearchParams(searchParams)
        : searchParams || new URLSearchParams();

    console.log("Params:", params.toString());

    const page = Number(params.get("page")) - 1;
    const size = params.get("size");
    const gender = params.get("gender");
    const speciality = params.get("specialityId");
    const minPrice = params.get("minPrice");
    const maxPrice = params.get("maxPrice");
    const concerns = params.get("concernIds");
    const approaches = params.get("approachIds");

    const queryParams = new URLSearchParams();
    if (!isNaN(page) && page >= 0) queryParams.append("page", page.toString());
    if (size) queryParams.append("size", size);
    if (gender) queryParams.append("gender", gender);
    if (speciality) queryParams.append("specialityId", speciality);
    if (minPrice) queryParams.append("minPrice", minPrice);
    if (maxPrice) queryParams.append("maxPrice", maxPrice);
    if (concerns) queryParams.append("concernIds", concerns);
    if (approaches) queryParams.append("approachIds", approaches);

    console.log("Query Params:", queryParams.toString());

    const url = queryParams.toString()
      ? `psychologists/filter?${queryParams.toString()}`
      : "psychologists/filter";

    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.log("GetFilter Error ", error);
    throw error;
  }
};

//отримую психолога за id
export const getPsychologistId = async (id: string) => {
  await delay();
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
export const addBooking = async (book: BookingCalendar) => {
  try {
    const response = await apiClient.post("/bookings", book);
    return response.data;
  } catch (error) {
    console.log("Bookings Error: ", error);
    throw error;
  }
};

export const addBookingUnauth = async (book: BookingUnauth) => {
  try {
    const response = await apiClientUnauth.post("/bookings/unauthorized", book);
    return response.data;
  } catch (error) {
    console.log("addBookingUnauth Error: ", error);
    throw error;
  }
};

//payment
export const addPayment = async (pay: Payment) => {
  try {
    const response = await apiClient.post("/payments", pay);
    return response.data;
  } catch (error) {
    console.log("Payment Error: ", error);
    throw error;
  }
};

//отримання скасування оплати
// export const getCancelPayment = async (sessionId: string) => {
//   try {
//     const response = await apiClient.get(`/payments/cancel`, {
//       params: { sessionId },
//     });
//     console.log("Payment cancelled successfully", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error cancelling payment:", error);
//     console.log("Деталі помилки:", error.response?.data);
//     throw error;
//   }
// };

//скасування оплати/броні
export const canceledPaymnt = async (bookingId: number) => {
  try {
    const response = await apiClient.delete(`/bookings/${bookingId}`, {
      data: { status: "CANCELLED" },
    });
    console.log("Відповідь від сервера після скасування:", response.data);
    return response.data;
  } catch (error) {
    console.error("Помилка при скасуванні бронювання:", error);
    throw error;
  }
};

//отримую всі бронювання які робив користувач
export const getBookingUser = async () => {
  try {
    const response = await apiClient.get("/bookings/my");
    console.log("Запит до API успішний:", response.data);
    return response.data;
  } catch (error) {
    console.log("getBookingUser Error: ", error);
    throw error;
  }
};

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

export const deleteUser = async () => {
  try {
    const response = await apiClient.delete("/users/remove-user");
    return response.data;
  } catch (error) {
    console.log("deleteUser Error: ", error);
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

//відгук
export const postReview = async (review: Review, psychologistId: number) => {
  try {
    const response = await apiClient.post(
      `/reviews?psychologistId=${psychologistId}`,
      review
    );
    return response.data;
  } catch (error) {
    console.log("postReview error", error);
    throw error;
  }
};

// ортимую відкгуки
export const getReview = async (psychologistId: number) => {
  try {
    const response = await apiClient.get(
      `/reviews/review-page/${psychologistId}`
    );
    return response.data;
  } catch (error) {
    console.log("getReview error", error);
    throw error;
  }
};

export const patchLikedPsychologist = async (id: number) => {
  try {
    const response = await apiClient.patch(`/psychologists/like/${id}`);
    return response.data;
  } catch (error) {
    console.log("patchLikedPsychologist error", error);
    throw error;
  }
};

export const getLikedPsychologist = async (
  searchParams?: URLSearchParams | string
) => {
  await delay();
  try {
    const params =
      typeof searchParams === "string"
        ? new URLSearchParams(searchParams)
        : searchParams || new URLSearchParams();
    const page = Number(params.get("page")) - 1;
    const size = params.get("size");
    const like = params.get('like');

    const queryParams = new URLSearchParams();
    if (!isNaN(page) && page >= 0) queryParams.append("page", page.toString());
    if (size) queryParams.append("size", size);
    if (like) queryParams.append('like', like)

        const url = queryParams.toString()
      ? `/psychologists/like?${queryParams.toString()}`
      : "/psychologists/like";

    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.log("getLikedPsychologist error", error);
    throw error;
  }
};
