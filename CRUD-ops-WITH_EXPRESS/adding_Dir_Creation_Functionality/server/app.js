import express from "express";
import { createWriteStream, mkdirSync } from "fs";
import { mkdir, readdir, rename, rm, stat } from "fs/promises";
import cors from "cors";

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

// Read
app.get("/directory/?*", async (req, res) => {
  const { "0" : dirname } = req.params;
  const fullDirPath = `./storage/${dirname ? dirname : ""}`;
  const filesList = await readdir(fullDirPath);
  const resData = [];
  for (const item of filesList) {
    const stats = await stat(`${fullDirPath}/${item}`);
    resData.push({ name: item, isDirectory: stats.isDirectory() });
  }
  res.json(resData);
});

app.post("/directory/*", async(req, res) => {
  const {0: dirname} = req.params;
  try {
    await mkdir(`./storage/${dirname}`)
  res.json({
    message: "Dir Created"
  })
  } catch(err) {
    res.json({err: err.message})
  }
})

// Create
app.post("/files/*", (req, res) => {
  const writeStream = createWriteStream(`./storage/${req.params[0]}`);
  req.pipe(writeStream);
  req.on("end", () => {
    res.json({ message: "File Uploaded" });
  });
});

app.get("/files/*", (req, res) => {
  const { 0 : filePath } = req.params;
  console.log(req.params)
  if (req.query.action === "download") {
    res.set("Content-Disposition", "attachment");
  }
  res.sendFile(`${import.meta.dirname}/storage/${filePath}`);
});

// Update
app.patch("/files/*", async (req, res) => {
  const { 0 : filePath } = req.params;
  await rename(`./storage/${filePath}`, `./storage/${req.body.newFilename}`);
  res.json({ message: "Renamed" });
});

// Delete
app.delete("/files/*", async (req, res) => {
  const { 0: filePath } = req.params;


  try {
    await rm(`./storage/${filePath}`, {recursive : true});
    res.json({ message: "File Deleted Successfully" });
  } catch (err) {
    res.status(404).json({ message: "File Not Found!" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
