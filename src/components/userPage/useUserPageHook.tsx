import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { handleError } from "../../utils/Error";

export const useUserPageHook = () => {
  const { user, logout } = useAuth();

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  // Ім’я
  const [firstName, setFirstName] = useState("");
  const [hasFirstNameError, setHasFirstNameError] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState("");

  // Прізвище
  const [lastName, setLastName] = useState("");
  const [hasLastNameError, setHasLastNameError] = useState(false);
  const [errorLastName, setErrorLastName] = useState("");

  // Email
  const [email, setEmail] = useState("");
  const [hasEmailError, setHasEmailError] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");

  // День народження
  const [day, setDay] = useState("");
  const [hasDayError, setHasDayError] = useState(false);
  const [errorDay, setErrorDay] = useState("");

  const [month, setMonth] = useState("");
  const [hasMonthError, setHasMonthError] = useState(false);
  const [errorMonth, setErrorMonth] = useState("");

  const [year, setYear] = useState("");
  const [hasYearError, setHasYearError] = useState(false);
  const [errorYear, setErrorYear] = useState("");

  const [error, setError] = useState<string | null>(null);

  // ✅ Ключ для зберігання даних користувача (по email)
  const userKey = user?.email ? `userData-${user.email}` : null;
  const photoKey = user?.email ? `profilePhoto-${user.email}` : null;

  // ✅ Збереження всіх полів в localStorage
  const saveUserData = () => {
    if (!userKey) return;
    const data = {
      day,
      month,
      year,
    };
    localStorage.setItem(userKey, JSON.stringify(data));
  };

  // 🔁 Оновлені handle-функції з викликом saveUserData
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    setHasFirstNameError(false);
    setErrorFirstName("");
    setTimeout(saveUserData, 0);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    setHasLastNameError(false);
    setErrorLastName("");
    setTimeout(saveUserData, 0);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setHasEmailError(false);
    setErrorEmail("");
    setTimeout(saveUserData, 0);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDay(value);
    setHasDayError(false);
    setErrorDay("");
    setTimeout(saveUserData, 0);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMonth(value);
    setHasMonthError(false);
    setErrorMonth("");
    setTimeout(saveUserData, 0);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setYear(value);
    setHasYearError(false);
    setErrorYear("");
    setTimeout(saveUserData, 0);
  };

  const validateDate = () => {
    let valid = true;

    if (!day || isNaN(Number(day)) || Number(day) < 1 || Number(day) > 31) {
      setHasDayError(true);
      setErrorDay("Please enter a valid day between 1 and 31.");
      valid = false;
    }

    if (
      !month ||
      isNaN(Number(month)) ||
      Number(month) < 1 ||
      Number(month) > 12
    ) {
      setHasMonthError(true);
      setErrorMonth("Please enter a valid month between 1 and 12.");
      valid = false;
    }

    const currentYear = new Date().getFullYear();
    if (!year || isNaN(Number(year)) || Number(year) > currentYear) {
      setHasYearError(true);
      setErrorYear("Please enter a valid year.");
      valid = false;
    }

    return valid;
  };

  // 🔁 handleSave тепер також зберігає дані користувача
  const handleSave = () => {
    if (validateDate()) {
      saveUserData();
      console.log("Дані збережено успішно");
    }
  };

  // ✅ Завантаження збережених даних користувача
  useEffect(() => {
    if (userKey) {
      const stored = localStorage.getItem(userKey);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setFirstName(parsed.firstName || "");
          setLastName(parsed.lastName || "");
          setEmail(parsed.email || "");
          setDay(parsed.day || "");
          setMonth(parsed.month || "");
          setYear(parsed.year || "");
          setError(null);
        } catch (e) {
          console.error("Помилка при завантаженні userData", e);
          setError(handleError(error));
        }
      }
    }

    if (photoKey) {
      const savedPhoto = localStorage.getItem(photoKey);
      setProfilePhoto(savedPhoto);
    }
  }, [userKey, photoKey]);

  // Фото профілю
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setProfilePhoto(base64);
        // if (photoKey) {
        //   localStorage.setItem(photoKey, base64);
        // }
      };
      reader.readAsDataURL(file);
    }
  };

  // Після логіну підставляємо дані з юзера, якщо вони ще не були збережені
  useEffect(() => {
    if (user) {
      setFirstName((prev) => prev || user.firstName || "");
      setLastName((prev) => prev || user.lastName || "");
      setEmail((prev) => prev || user.email || "");
    }
  }, [user]);

  return {
    user,
    logout,
    profilePhoto,
    firstName,
    hasFirstNameError,
    errorFirstName,
    lastName,
    hasLastNameError,
    errorLastName,
    handleFirstNameChange,
    handleLastNameChange,
    handlePhotoUpload,
    email,
    hasEmailError,
    handleEmailChange,
    errorEmail,
    day,
    hasDayError,
    errorDay,
    handleDayChange,
    month,
    hasMonthError,
    errorMonth,
    handleMonthChange,
    year,
    hasYearError,
    errorYear,
    handleYearChange,
    handleSave,
    error,
  };
};
