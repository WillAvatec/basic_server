const express = require("express");
const path = require("path");

// Start an Express application
const app = express();

// Define port to listen
const PORT = 3000;

// Define what to return on get requests

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "pages", "index.html");

  res.sendFile(filePath);
});

app.get("/about.html", (req, res) => {
  const filePath = path.join(__dirname, "pages", "about.html");

  res.sendFile(filePath);
});

app.get("/contact-me.html", (req, res) => {
  const filePath = path.join(__dirname, "pages", "contact-me.html");

  res.sendFile(filePath);
});

app.get("/404", (req, res) => {
  const filePath = path.join(__dirname, "pages", "index.html");

  res.sendFile(filePath);
});

/* This route will handle all the requests that are 
   not handled by any other route handler. In 
   this handler we will redirect the user to 
   an error page with NOT FOUND message and status
   code as 404 (HTTP status code for NOT found) 
*/

app.all("*", (req, res) => {
  const filePath = path.join(__dirname, "pages", "404.html");
  res.sendFile(filePath);
});

// Listen to established port

app.listen(PORT, () => {
  console.log("Basic server listening to " + PORT);
});
