const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname,
    "pages",
    req.url === "/" ? "index.html" : req.url
  );
  console.log(filePath);

  const pathExt = path.extname(filePath);

  let contentType = "text/html";
  switch (pathExt) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/js";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
  }

  // Read file async

  fs.readFile(filePath, (err, content) => {
    // Handle Errors
    if (err) {
      if (err.code == "ENOENT") {
        fs.readFile(
          path.join(__dirname, "pages", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf-8");
          }
        );
      } else {
        console.log(err);
        throw err;
      }
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
});

const PORT = process.env.port || 5000;

server.listen(PORT);
