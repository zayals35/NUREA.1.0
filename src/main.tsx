import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initSoundSystem } from "./lib/soundSystem";
import "./lib/hoverEffect";

createRoot(document.getElementById("root")!).render(<App />);

initSoundSystem();
