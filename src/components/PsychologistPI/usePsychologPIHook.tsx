import { useLocation, useSearchParams } from "react-router-dom";
// import { useModalLogicHook } from "../ModalWindow/useHookModal";
import { useCallback, useEffect, useState } from "react";
import { allFilterPsychologist } from "../../types/allFilterPsychologist";
import { getFilterPsychologist } from "../../api/api";
import { useModalContext } from "../../utils/ModalContext";
import { handleError } from "../../utils/Error";

interface ApiResponse {
  count: number;
  pageNumber: number;
  pageSize: number;
  psychologists: allFilterPsychologist[];
  totalPages: number;
}

export const usePsychologPIHook = () => {
  const [psychologists, setPsychologists] = useState<allFilterPsychologist[]>(
    []
  );
  const [totalPages, setTotalPages] = useState(1);

  // const [totalCount, setTotalCount] = useState(0);
  const itemPrePage = 3;
  const [searchParams, setSearchParams] = useSearchParams(); // url сторінки
  const pageFromParams = Number(searchParams.get("page")) || 1; // стосується url сторінки
  const [currentPage, setCurrentPage] = useState(pageFromParams); // url сторінки
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  console.log("location", location);
  const { isModalOpen } = useModalContext();
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      searchParams.set("page", currentPage.toString());
      searchParams.set("size", itemPrePage.toString());

      const data: ApiResponse = await getFilterPsychologist(
        searchParams.toString()
      );
      console.log("searchParams", searchParams.toString());
      console.log("Fetched data:", data);
      setPsychologists(data.psychologists);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (error) {
      console.log("error", error);
      setError(handleError(error));
    } finally {
      setLoading(false);
      console.log("Loading finished");
    }
  }, [searchParams, currentPage]);

  useEffect(() => {
    setLoading(true);
    if (isModalOpen) return;

    fetchData();
  }, [isModalOpen, fetchData]);

  //url сторінки
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  return {
    totalPages,
    currentPsychologists: psychologists,
    handlePageChange,
    psychologists,
    currentPage,
    loading,
    error,
    fetchData,
  };
};
