import { useLocation, useSearchParams } from "react-router-dom";
// import { useModalLogicHook } from "../ModalWindow/useHookModal";
import { useEffect, useMemo, useState } from "react";
import { allFilterPsychologist } from "../../types/allFilterPsychologist";
import { getFilterPsychologist } from "../../api/api";

export const usePsychologPIHook = () => {
  // const {
  //   selectedSex,
  //   selectedSpec,
  //   selectedCon,
  //   selectedAppr,
  //   setSelectedSex,
  //   setSelectedSpec,
  //   setSelectedCon,
  //   setSelectedAppr,
  // } = useModalLogicHook();
  const location = useLocation();
  const [psychologists, setPsychologists] = useState<allFilterPsychologist[]>(
    []
  );
  const itemPrePage = 3;
  const [searchParams, setSearchParams] = useSearchParams(); // url сторінки
  const pageFromParams = Number(searchParams.get("page")) || 1; // стосується url сторінки
  const [currentPage, setCurrentPage] = useState(pageFromParams); // url сторінки
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getFilterPsychologist();
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

    // const timeout = setTimeout(fetchData, 1000);

    // return () => clearTimeout(timeout);
  }, []);

  // useEffect(() => {
  //   const storedSex = localStorage.getItem("selectedSex");
  //   const storedSpec = localStorage.getItem("selectedSpec");
  //   const storedConcerns = localStorage.getItem("selectedCon");
  //   const storedApproaches = localStorage.getItem("selectedAppr");
    
  //   if (storedSex) setSelectedSex(storedSex);
  //   else setSelectedSex(null);

  //   if (storedSpec) setSelectedSpec(storedSpec);
  //   else setSelectedSpec(null);

  //   if (storedConcerns) setSelectedCon(JSON.parse(storedConcerns));
  //   else setSelectedCon([]);

  //   if (storedApproaches) setSelectedAppr(JSON.parse(storedApproaches));
  //   else setSelectedAppr([]);
  // }, [location.state?.formApplyButton, location.state?.forceRefresh]);

  //   if (storedSex) setSelectedSex(storedSex);
  //   if (storedSpec) setSelectedSpec(storedSpec);
  //   if (storedConcerns) setSelectedCon(JSON.parse(storedConcerns));
  //   if (storedApproaches) setSelectedAppr(JSON.parse(storedApproaches));
  // }, [location.state]);

  // const filteredPsychologists = useMemo(() => {
  //   return psychologists
  //     .map((psych) => {
  //       let score = 0;
  //       console.log("Gender:", psych.gender);
  //       console.log("Selected sex:", selectedSex);
  //       // перевірка на відповідність статі
  //       const sexMatch = selectedSex
  //         ? psych.gender?.toLowerCase() === selectedSex.toLowerCase()
  //         : true;
  //       if (sexMatch) score++;

  //       // перевірка на відповідність спеціалізації
  //       const specMatch = selectedSpec
  //         ? psych.speciality?.name?.toLowerCase() === selectedSpec.toLowerCase()
  //         : true;
  //       if (specMatch) score++;

  //       // перевірка на відповідність concerns по id
  //       const conMatch = selectedCon.length
  //         ? psych.concerns?.some((con) => selectedCon.includes(con.name))
  //         : true;
  //       if (conMatch) score++;

  //       // перевірка на відповідність approaches по id
  //       const approMatch = selectedAppr.length
  //         ? psych.approaches?.some((appro) => selectedAppr.includes(appro.name))
  //         : true;
  //       if (approMatch) score++;

  //       return { ...psych, score, conMatch, approMatch };
  //     })
  //     .filter((psych) => {
  //       // якщо фільтри не обрані повертаю всіх
  //       const noFilters =
  //         !selectedSex &&
  //         !selectedSpec &&
  //         selectedCon.length === 0 &&
  //         selectedAppr.length === 0;

  //       if (noFilters) return true;

  //       //якщо обраний один Concerns але його не підходить під фільтр повертати фолс
  //       if (selectedCon.length && !psych.conMatch) return false;
  //       if (selectedAppr.length && !psych.approMatch) return false;
  //       if (
  //         selectedSex &&
  //         psych.gender?.toLowerCase() !== selectedSex.toLowerCase()
  //       )
  //         return false;
  //       if (
  //         selectedSpec &&
  //         psych.speciality.name?.toLowerCase() !== selectedSpec.toLowerCase()
  //       )
  //         return false;

  //       return true;
  //     })
  //     .sort((a, b) => b.score - a.score);
  // }, [psychologists, selectedSex, selectedSpec, selectedCon, selectedAppr]);

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
    setSearchParams({ page: String(page) });
  };

  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ page: String(currentPage) });
    }
  }, []);

  return {
    totalPages,
    currentPsychologists,
    handlePageChange,
    psychologists,
    currentPage,
    loading,
  };
};
