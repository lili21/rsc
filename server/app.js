import express from "express";
// import { createElement } from "react";
// import { renderToPipeableStream } from "react-server-dom-esm/server";
import { getBandList } from "./db/band-api.js";
// import App from "../dist/App.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use("/dist", express.static("dist"));

app.get("/api/band-list", async (req, res) => {
  const bandList = await getBandList();
  return res.json(bandList);
});

// app.get("/rsc", async (req, res) => {
//   const { pipe } = renderToPipeableStream(createElement(App));
//   pipe(res);
// });

app.get("/", async (req, res) => {
  res.set("Content-type", "text/html");
  return res.sendFile("index.html", { root: "public" });
});

const server = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
