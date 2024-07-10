import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

let api_key = process.env.API_KEY;

export async function demo(city) {
  try {
    const url_city = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    );

    let urlData = url_city.data;

    let today = new Date().toLocaleDateString();
    return {
      city: city,
      currentDate: today,
      weatherView: urlData.weather[0].description,
      windSpeed: urlData.wind.speed,
      humidity: urlData.main.humidity,
      visibilityDist: urlData.visibility,
      currentTemp: urlData.main.temp,
      feels: urlData.main.feels_like,
    };
  } catch (error) {
    // return "city not found", error.data;
    return {
      error: "city not found",
    };
  }
}
