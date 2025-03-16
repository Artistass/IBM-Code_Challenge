import express from "express";
import {
  getPlaces,
  getPlace,
  getWeather,
  logUserAction,
} from "../Controllers/userActionController.js";

const router = express.Router();

router.get("/places", getPlaces);
router.get("/places/:code", getPlace);
router.get("/places/:code/forecasts/:type", getWeather);

router.post("/log-city-selection", logUserAction);

export default router;
