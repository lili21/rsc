import React, { startTransition } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";

startTransition(() => {
  const root = createRoot(document.getElementById("root"));
  root.render(
    <div>
      <App />
    </div>,
  );
});
