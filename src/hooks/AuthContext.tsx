import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/user";
import { getUser } from "../api/api";
interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  user: User | null;
  fetchUser: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    () => !!localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    } catch (err) {
      console.log("failed to fetch user", err);
      logout(); // якщо помилка токен не валідний(виходим з логінації)
    }
  };

  const login = async (token: string) => {
    localStorage.setItem("accessToken", token);
    setIsLoggedIn(true);
    await fetchUser();
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    console.log("logged out!");
    setIsLoggedIn(false);
  };

  //завантажую користувача при першому запуску якщо токен є
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetchUser();
    }
  }, []);

  // це якщо потрібна синхронизація між табами браузера (нагадаю, слухач storage не працює у тій самій вкладці браузера, де відбулась подія!
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, user, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// Custom hook (ось це можеш не писати, наприклад - за бажанням)
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
