import express from "express";
import { createElement } from "react";
import {
  renderToPipeableStream,
  decodeReplyFromBusboy,
} from "react-server-dom-esm/server";
import busboy from "busboy";
import { getBandList } from "./db/band-api.js";
import App from "../dist/App.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use("/dist", express.static("dist"));

app.get("/api/band-list", async (req, res) => {
  const bandList = await getBandList();
  return res.json(bandList);
});

const moduleBasePath = new URL("../dist", import.meta.url);

console.log("--moduleBasePath--", moduleBasePath);

function renderApp(res, returnValue) {
  const root = createElement(App);
  const payload = { root, returnValue };
  const { pipe } = renderToPipeableStream(payload);
  pipe(res);
}

app.post("/action", async (req, res) => {
  const serverReference = req.get("rsc-action");
  const [filepath, name] = serverReference.split("#");
  const action = (await import(filepath))[name];
  const bb = busboy({ headers: req.headers });
  const reply = decodeReplyFromBusboy(bb);
  req.pipe(bb);
  const args = await reply;
  const returnValue = await action(...args);
  // return res.json(returnValue);
  renderApp(res, returnValue);
});

app.get("/rsc", async (req, res) => {
  renderApp(res);
});

app.get("/", async (req, res) => {
  res.set("Content-type", "text/html");
  return res.sendFile("index.html", { root: "public" });
});

const server = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
