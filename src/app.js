import express from "express";

import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { demo } from "./utils/index.js";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const city = req.body.city_name;
  async function main(city) {
    try {
      const data = await demo(city);
      res.render("index.ejs", {
        cityName: data.city,
        currentDate: data.currentDate,
        weatherView: data.weatherView,
        currentTemp: data.currentTemp,
        windSpeed: data.windSpeed,
        humidity: data.humidity,
        visibilityDist: data.visibilityDist,
      });
    } catch (error) {
      res.send("city not found");
    }
  }
  main(city);
});

app.get("/about", (req, res) => {
  res.send("hello from about page");
});

app.get("/help", (req, res) => {
  res.send("<h1 style='color:red'>html text form help</h1>");
});

// app.get("/weather", (req, res) => {
//   if (!req.query.city) {
//     return res.send({
//       error: "pls provide city term",
//     });
//   }
//   let city = req.query.city;
//   async function main(city) {
//     const data = await demo(city);
//     res.send(data);
//   }
//   main(city);
// });

app.get("/help/*", (req, res) => {
  res.send("help is last end point.");
});

app.get("*", (req, res) => {
  res.send("404 Error page not found.");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
