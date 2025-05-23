import React, { createContext,  useState, ReactNode } from "react";
// import { PsychologId } from "../types/psychologId";
import {  patchLikedPsychologist } from "../api/api";
import { allFilterPsychologist } from "../types/allFilterPsychologist";
// import { useSearchParams } from "react-router-dom";

interface FavouritesProps {
  favorites: allFilterPsychologist[];
  toggleFavorite: (product: allFilterPsychologist) => void;
  setFavorites: React.Dispatch<React.SetStateAction<allFilterPsychologist[]>>;
}

const FavoritesContext = createContext<FavouritesProps | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<allFilterPsychologist[]>([]);

  // useEffect(() => {
  //   const fetchFavorites = async () => {
  //     searchParams.set("page", currentPage.toString());
  //     searchParams.set("size", itemPrePage.toString());
  //     try {
  //       const data = await getLikedPsychologist();
  //       setFavorites(data);
  //     } catch (error) {
  //       console.log("Failed to load liked psychologists:", error);
  //     }
  //   };

  //   fetchFavorites();
  // }, []);

  const toggleFavorite = async (product: allFilterPsychologist) => {
    try {
      await patchLikedPsychologist(product.id);

      setFavorites((prev) => {
        const Favotire = prev.some((p) => p.id === product.id);
        if (Favotire) {
          return prev.filter((p) => p.id !== product.id);
        } else {
          return [...prev, product];
        }
      });
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = React.useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavourites must be used within a FavoritesProvider");
  }

  return context;
};
