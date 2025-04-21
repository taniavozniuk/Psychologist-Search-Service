import "./App.css";
import { Header } from "./components/Header/Header";
import { TopBar } from "./components/TopBar/TopBar";

function App() {
  return (
    <>
      <TopBar />

      <div className="hed">
        <Header />
      </div>
    </>
  );
}

export default App;
