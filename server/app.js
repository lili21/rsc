import express from "express";
import { getBandList } from "./db/band-api.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static("public", { index: false }));
app.use("/dist", express.static("dist"));

app.get("/api/band-list", async (req, res) => {
  const bandList = await getBandList();
  return res.json(bandList);
});

app.get("/", async (req, res) => {
  res.set("Content-type", "text/html");
  return res.sendFile("index.html", { root: "public" });
});

const server = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
