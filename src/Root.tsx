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
import { PsychologistPageInfo } from "./components/PsychologistPI/PsychologistPI";

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="test" element={<StartTest />} />
          <Route path="find" element={<FindTherapist />} />
          <Route path="/psychologist/:id" element={<PsychologistPageInfo />} />
        </Route>
      </Routes>
    </Router>
  );
};