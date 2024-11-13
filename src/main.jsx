import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { DataProvider } from "./Components/DataProvider/DataProvider";
import { initialState, reducer } from "./utils/reducer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </StrictMode>
);
