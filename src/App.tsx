import "./App.css";
import { Header } from "./components/Header/Header";
import { TopBar } from "./components/TopBar/TopBar";
import {OurServices} from './components/OurServices/OurServices'
import { WhyUs } from "./components/WhyUs/WhyUs";

function App() {
  return (
    <>
      <TopBar />

      <div className="conteiner__header">
        <Header />
      </div>

      <div className="main">
        <div className="conteiner__section">
          <OurServices />
        </div>

        <div className="conteiner__section">
          <WhyUs />
        </div>

        <div className="conteiner__section">

        </div>
      </div>
    </>
  );
}

export default App;
