import { readFile } from "fs/promises";
import { open, readdir } from "fs/promises";
import http from "http";

const server = http.createServer(async (req, res) => {
  if(req.url === "/favicon.ico") return res.end("No Favicon!!")
  if (req.url === "/") {
    serveDirectory(req, res);
  } else {
    try {
      const handleFile = await open(`./storage${decodeURIComponent(req.url)}`);
      const stats = await handleFile.stat();
      if (stats.isDirectory()) {
        serveDirectory(req, res);
      } else {
        const readStream = handleFile.createReadStream();
        readStream.pipe(res);
      }
    } catch (err) {
      console.log(err.message);
      res.end("Not found!!");
    }
  }
});

async function serveDirectory(req, res) {
  const itemsList = await readdir(`./storage${req.url}`);
    let dynamicHtml = " ";
    itemsList.forEach((item) => {
      dynamicHtml += `<a href=".${
        req.url === "/" ? "" : req.url
      }/${item}">${item}</a><br>`;
    });
    const htmlBoilerPlate = await readFile("./boilerplate.html", "utf-8");
    res.end(htmlBoilerPlate.replace("${dynamicHtml}", dynamicHtml));
}

server.listen(8080, "0.0.0.0", () => {
  console.log(`Server is listening on http://localhost:8080`);
});
