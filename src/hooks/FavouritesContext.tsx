import React, { createContext, useState, ReactNode, useEffect } from "react";
// import { PsychologId } from "../types/psychologId";
import { getLikedPsychologist, patchLikedPsychologist } from "../api/api";
import { allFilterPsychologist } from "../types/allFilterPsychologist";
import { useSearchParams } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";
import { NavigateOptions } from "react-router-dom";

interface FavouritesProps {
  // favorites: allFilterPsychologist[];
  toggleFavorite: (product: allFilterPsychologist, refetch: () => Promise<void>) => void;
  // setFavorites: React.Dispatch<React.SetStateAction<allFilterPsychologist[]>>;
  totalPages: number;
  setSearchParams: (
    nextInit: URLSearchParams | string,
    navigateOptions?: NavigateOptions
  ) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  searchParams: URLSearchParams;
}

const FavoritesContext = createContext<FavouritesProps | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [favorites, setFavorites] = useState<allFilterPsychologist[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemPrePage = 3;
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromParams = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromParams);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        searchParams.set("page", currentPage.toString());
        searchParams.set("size", itemPrePage.toString());
        const data = await getLikedPsychologist(searchParams);
        // setFavorites(data.psychologists); //!!!!!!
        setTotalPages(data.totalPages);
      } catch (error) {
        console.log("Failed to load liked psychologists:", error);
      }
    };

    fetchFavorites();
  }, [searchParams, currentPage]);

  const toggleFavorite = async (product: allFilterPsychologist, refetch: () => Promise<void>) => {
    try {
      const response = await patchLikedPsychologist(product.id);
      await refetch();
      console.log('toggleFavorite response', response)
      console.log("Sending PATCH request to like psychologist:", product.id);

      // setFavorites((prev) => {
      //   const Favotire = prev.some((p) => p.id === product.id);
      //   if (Favotire) {
      //     return prev.filter((p) => p.id !== product.id);
      //   } else {
      //     return [...prev, product];
      //   }
      // });
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        searchParams,
        // favorites,
        toggleFavorite,
        // setFavorites,
        totalPages,
        setSearchParams,
        setCurrentPage,
        currentPage,
      }}
    >
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
