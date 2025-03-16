import dotenv from "dotenv";
import Log from "../Models/Log.js";

dotenv.config();

const { API } = process.env;

export async function getPlaces(req, res) {
  try {
    const response = await fetch(`${API}places`);

    if (!response.ok) {
      throw new Error(`Failed to fetch places: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching places:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function getPlace(req, res) {
  try {
    const { code } = req.params;
    const response = await fetch(`${API}places/${code}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch place: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching place:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function getWeather(req, res) {
  try {
    const { code, type } = req.params;
    const response = await fetch(`${API}places/${code}/forecasts/${type}`);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Failed to fetch weather: ${response.statusText}` });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function logUserAction(req, res) {
  console.log("Full request received:", req.body);

  const { code, timestamp } = req.body;

  if (!code || !timestamp) {
    console.error("Missing required fields:", { code, timestamp });
    return res
      .status(400)
      .json({
        error: "Invalid request data. 'code' and 'timestamp' are required.",
      });
  }

  try {
    console.log(`User selected city: ${code} at ${timestamp}`);
    const newLog = new Log({ code, timestamp });
    await newLog.save();
    res
      .status(201)
      .json({ message: "City selection logged successfully", log: newLog });
  } catch (error) {
    console.error("Error logging user action:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}
