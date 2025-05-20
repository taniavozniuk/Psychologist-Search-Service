import { useLocation, useSearchParams } from "react-router-dom";
// import { useModalLogicHook } from "../ModalWindow/useHookModal";
import { useEffect, useState } from "react";
import { allFilterPsychologist } from "../../types/allFilterPsychologist";
import { getFilterPsychologist } from "../../api/api";

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

  useEffect(() => {
    // setLoading(true);
    const fetchData = async () => {
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
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
        console.log("Loading finished");
      }
    };

    fetchData();
  }, [searchParams, currentPage]);

  //погінації
  // const totalPages = Math.ceil(psychologists.length / itemPrePage);
  // console.log({
  //   length: psychologists.length,
  //   totalPages,
  //   currentPage,
  //   itemPrePage,
  // });
  // const indexOfLastItem = currentPage * itemPrePage;
  // const indexOfFirstItem = (currentPage - 1) * itemPrePage;
  // const currentPsychologists = psychologists.slice(
  //   indexOfFirstItem,
  //   indexOfLastItem
  // );

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
  };
};
