import { readFile } from "fs/promises";
import { open, readdir } from "fs/promises";
import http from "http";
import mime from "mime-types";

const server = http.createServer(async (req, res) => {
  if (req.url === "/favicon.ico") return res.end("No Favicon!!");
  if (req.url === "/") {
    serveDirectory("/", res);
  } else {
    try {
      const [url, queryString] = req.url.split("?");

      const queryParam = {};
      if (queryString) {
        queryString.split("&").forEach((pair) => {
          const [key, value] = pair.split("=");
          queryParam[key] = value;
        });
      }
      console.log(queryParam);

      const handleFile = await open(`./storage${decodeURIComponent(url)}`);
      const stats = await handleFile.stat();
      
      if (stats.isDirectory()) {
        serveDirectory(url, res);
      } else {
        const readStream = handleFile.createReadStream();
        res.setHeader("Content-Type", mime.contentType(url.slice(1)));
        res.setHeader("Content-Length", stats.size);
        
        if (queryParam.action === "download") {
          res.setHeader("Content-Disposition", `attachment; filename="${url.slice(1)}"`);
        }
        
        readStream.pipe(res);
      }
    } catch (err) {
      console.log(err.message);
      res.end("Not found!!");
    }
  }
});

async function serveDirectory(url, res) {
  const itemsList = await readdir(`./storage${url}`);
  let dynamicHtml = "";
  itemsList.forEach((item) => {
    dynamicHtml += `${item} <a href=".${
      url === "/" ? "" : url
    }/${item}?action=open">Open</a> <a href=".${
      url === "/" ? "" : url
    }/${item}?action=download">Download</a><br>`;
  });
  const htmlBoilerPlate = await readFile("./boilerplate.html", "utf-8");
  res.end(htmlBoilerPlate.replace("${dynamicHtml}", dynamicHtml));
}

server.listen(8080, "0.0.0.0", () => {
  console.log(`Server is listening on http://localhost:8080`);
});