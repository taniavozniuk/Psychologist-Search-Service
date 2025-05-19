import { useLocation, useSearchParams } from "react-router-dom";
// import { useModalLogicHook } from "../ModalWindow/useHookModal";
import { useEffect, useState } from "react";
import { allFilterPsychologist } from "../../types/allFilterPsychologist";
import { getFilterPsychologist } from "../../api/api";

export const usePsychologPIHook = () => {
  const [psychologists, setPsychologists] = useState<allFilterPsychologist[]>(
    []
  );
  const itemPrePage = 3;
  const [searchParams, setSearchParams] = useSearchParams(); // url сторінки
  const pageFromParams = Number(searchParams.get("page")) || 1; // стосується url сторінки
  const [currentPage, setCurrentPage] = useState(pageFromParams); // url сторінки
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  console.log("location", location);

  useEffect(() => {
    // setLoading(true);
    const fetchData = async () => {
      try {
        // searchParams.set("size", itemPrePage.toString());
        const data = await getFilterPsychologist(searchParams.toString());
        console.log("searchParams", searchParams.toString());
        console.log("Fetched data:", data);
        setPsychologists(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
        console.log("Loading finished");
      }
    };

    fetchData();
  }, [searchParams]);

  //погінації
  const totalPages = Math.ceil(psychologists.length / itemPrePage);
  const indexOfLastItem = currentPage * itemPrePage;
  const indexOfFirstItem = (currentPage - 1) * itemPrePage;
  const currentPsychologists = psychologists.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  //url сторінки
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    searchParams.set("page", page.toString(),);
    setSearchParams(searchParams);
  };

  return {
    totalPages,
    currentPsychologists,
    handlePageChange,
    psychologists,
    currentPage,
    loading,
  };
};
