const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const fetch = require("node-fetch");
app.use(cors());
app.options("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"), res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Length, X-Requested-With");
  res.send(200);
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("Welcome to NodeJS server for Angular! 😁");
});

app.get("/api", (req, res) => {
  const url = "https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals";

  try {
    fetch(url)
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType === "json") {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((data) => {
        res.send(data);
      });
  } catch (error) {
    console.log("Error", error);
  }
});
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
