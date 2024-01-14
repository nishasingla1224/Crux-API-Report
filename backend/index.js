// server/server.js
const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 5000;
const apiKey = "AIzaSyAVultAS19H7BhgIt8j-puqTNXmi0NgQzs";
const cruxApiUrl =
  "https://chromeuxreport.googleapis.com/v1/records:queryRecord";

// Function to make a POST request to the CrUX API
async function postCruxData(origin) {
  try {
    const response = await axios.post(`${cruxApiUrl}?key=${apiKey}`, {
      origin: origin,
      formFactor: "PHONE",
    });
    return response;
  } catch (error) {
    console.error("POST Error:", error.message);
  }
}

// Serve static files from the Vite React app
app.use(express.static(path.join(__dirname, "../frontend")));

// The "catchall" handler: for any request that doesn't match the above
// send back Vite React's index.html file.

app.get("/api/data", async (req, res, next) => {
  try {
    const response = await postCruxData(req.query.url);
    const metrics = response?.data?.record?.metrics ?? {};
    const metricNamesList = Object.keys(metrics).sort();

    const newMetrics = {};
    metricNamesList.forEach((name) => {
      newMetrics[name] = metrics[name];
    });
    const wrappedData = Object.assign(response?.data);
    wrappedData.record.metrics = newMetrics;
    res.end(JSON.stringify(wrappedData));
    next();
  } catch (e) {
    res.status(400).send({ error: "Bad Request" });
    next();
  }
});

// Make sure this is the last request
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
