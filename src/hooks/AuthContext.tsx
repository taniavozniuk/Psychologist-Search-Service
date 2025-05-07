import { createContext, useContext, useEffect, useState } from "react";
interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    () => !!localStorage.getItem("accessToken")
  );
  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    window.alert("logged out!");
    setIsLoggedIn(false);
  };
  // це якщо потрібна синхронизація між табами браузера (нагадаю, слухач storage не працює у тій самій вкладці браузера, де відбулась подія!
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
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
