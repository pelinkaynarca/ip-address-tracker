const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const path = require("path");

app.use(express.static('public'));

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'script.js'));
});

app.get('/api/', async (req, res) => {
    try {
        const ipAddress = req.query.ipAddress;
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.GEO_API_KEY}&ipAddress=${ipAddress}`);
        const data = await response.json();

        if (response.ok) {
            res.json(data);
        } else {
            res.status(response.status).json({ error: "Invalid IP address or domain" });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Error fetching data. Please try again." });
    }
});

app.get('/api/location', async (req, res) => {
    try {
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.GEO_API_KEY}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Error fetching data. Please try again." });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
