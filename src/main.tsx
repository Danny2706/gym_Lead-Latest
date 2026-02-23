import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router";
import "./styles/index.css";

import { Provider } from "react-redux";
import { store } from "./app/store"; // Make sure you have store.ts

const root = createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
