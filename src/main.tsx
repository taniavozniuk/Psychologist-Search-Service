// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Root } from "./Root.tsx";

// createRoot(document.getElementById("root")!).render(
//     <StrictMode>
//       <Root />
//     </StrictMode>
// );

// import { createRoot } from "react-dom/client";
// import { Root } from "./Root";

createRoot(document.getElementById("root") as HTMLElement).render(<Root />);
