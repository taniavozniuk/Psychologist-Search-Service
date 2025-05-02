import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { About } from "./components/About/About";
import { Blog } from "./components/Blog/Blog";
import { HomePage } from "./components/HomePage/HomePage";
import App from "./App";
import { StartTest } from "./components/StartTest/StartTest";
import { FindTherapist } from "./components/FindTherapist/FindTherapist";
import { PsychologistPageAll } from "./components/PsychologistPI/PsychologistPI";
import { PsychologistProfile } from "./components/PsychologistsProfile/PsychologistsProfile";
import { useEffect, useState } from "react";
import { allFilterPsychologist } from "./types/allFilterPsychologist";
import { getFilterPsychologist } from "./api/api";
// import { Registration } from "./components/Registration/Registration";

export const Root = () => {
  const [psychologists, setPsychologists] = useState<allFilterPsychologist[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFilterPsychologist();
        console.log("Fetched data:", data); // лог усієї відповіді
        setPsychologists(data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="test" element={<StartTest />} />
          {/* <Route path="registration" element={<Registration />} /> */}
          <Route
            path="find"
            element={<FindTherapist psychologists={psychologists} />}
          />
          <Route path="/psychologist" element={<PsychologistPageAll />} />
          <Route path="/psychologist/:id" element={<PsychologistProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};
