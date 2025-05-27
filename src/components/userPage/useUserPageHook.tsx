import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { handleError } from "../../utils/Error";
import { UpdateUsers } from "../../types/UpdateUsers";
import { UpdateUser, UpdateUserPhoto } from "../../api/api";

export const useUserPageHook = () => {
  const { user, logout } = useAuth();

  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);

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
  const [loading, setLoading] = useState(true);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    setHasFirstNameError(false);
    setErrorFirstName("");
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    setHasLastNameError(false);
    setErrorLastName("");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setHasEmailError(false);
    setErrorEmail("");
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDay(value);
    setHasDayError(false);
    setErrorDay("");
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMonth(value);
    setHasMonthError(false);
    setErrorMonth("");
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setYear(value);
    setHasYearError(false);
    setErrorYear("");
  };

  // const refetchUser = useCallback(async () => {
  //   try {
  //     const updatedUser = await getUser();
  //     setProfilePhotoUrl(updatedUser.imageUrl || null);
  //   } catch (e) {
  //     console.error("Failed to refetch user", e);
  //   }
  // }, []);

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

  const handleSave = async () => {
    if (!validateDate()) {
      return;
    }

    const updateUser: UpdateUsers = {
      email,
      firstName,
      lastName,
      fatherName: "",
      birthDate: `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
    };
    console.log("Sending user update", updateUser);
    try {
      setLoading(true);
      await UpdateUser(updateUser);
      await handleUpadatePhoto(); // викликаю оновлення фото
      console.log("User updated successfully");
    } catch (e) {
      console.error("Update error", e);
      setError(handleError(e));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const createPreviewUrl = (file: File) => URL.createObjectURL(file);

  // Фото профілю
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfilePhotoFile(file);

      // Створюємо прев'ю перед відправкою на сервер
      const previewUrl = createPreviewUrl(file);
      setProfilePhotoUrl(previewUrl); // Відразу показуємо нове фото
    }
  };

  const handleUpadatePhoto = async () => {
    if (!profilePhotoFile) return;

    try {
      setLoading(true);

      await UpdateUserPhoto(profilePhotoFile);
      // await refetchUser();
      console.log("Photo updated successfully");

      if (profilePhotoUrl && profilePhotoUrl.startsWith("blob:")) {
        URL.revokeObjectURL(profilePhotoUrl);
      }
    } catch (e) {
      console.error("Photo update error", e);
      setError(handleError(e));
      setLoading(false);

      if (user?.profileImage) {
        setProfilePhotoUrl(user.profileImage); // Повертаємо старе фото
      }
    } finally {
      setLoading(false);
    }
  };

  const converBase64ToImageUrl = (base64String: string) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");

      if (user.birthDate) {
        const [year, month, day] = user.birthDate.split("-");
        setDay(day || "");
        setMonth(month || "");
        setYear(year || "");
      }

      // Оновлена частина для обробки Base64 зображення
      if (user.profileImage) {
        console.log("Image from backend:", user.profileImage);
        // Якщо це вже URL (наприклад, з AWS S3)
        if (user.profileImage.startsWith("http")) {
          setProfilePhotoUrl(user.profileImage);
        }
        // Якщо це Base64 без префіксу (наприклад, "/9j/...")
        else if (user.profileImage.startsWith("/9j/")) {
          const imageUrl = converBase64ToImageUrl(user.profileImage);
          setProfilePhotoUrl(imageUrl);
        }
        // Інші варіанти
        else {
          setProfilePhotoUrl(null);
          console.warn("Невідомий формат зображення профілю");
        }
      } else {
        setProfilePhotoUrl(null);
      }

      // setLoading(false);
    }
  }, [user]);
  console.log("User on load:", user);
  return {
    user,
    logout,
    profilePhoto: profilePhotoUrl,
    firstName,
    hasFirstNameError,
    errorFirstName,
    lastName,
    hasLastNameError,
    errorLastName,
    handleFirstNameChange,
    handleLastNameChange,
    handlePhotoUpload,
    handleUpadatePhoto,
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
    loading
  };
};
