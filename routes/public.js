var express = require('express');

var router = express.Router();
const fs = require('fs');
const path = require("path");

router.get('/', function(req, res, next) {
    res.sendFile(path.resolve('public/appTemplate.html') );
    console.log("App Template loaded");
});

router.get('/getGamePrice', async (req, res) => {
    try {
      const { gameName } = req.query;
  
      // Construct the URL for the API call to get the App ID
      const apiUrl = 'https://api.steampowered.com/ISteamApps/GetAppList/v2/';
  
      // Make the API call to get the App ID
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      // Find the game by its name in the data
      const game = data.applist.apps.find((app) => app.name.toLowerCase() === gameName.toLowerCase());
  
      if (game) {
        // Now you have the App ID of the game
        const appId = game.appid;
  
        // Construct the URL for the API call to get the game price
        const priceApiUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}`;
  
        // Make the API call to get the game price
        const priceResponse = await fetch(priceApiUrl);
        const priceData = await priceResponse.json();
  
        // Check if the game data is available and the request was successful
        if (priceData[appId].success) {
          const gameData = priceData[appId].data;
          if (gameData && gameData.price_overview) {
            const price = gameData.price_overview.final_formatted;
  
            // Send the price as JSON response
            res.json({ gamePrice: price });
            console.log("Price fetched successfully");
          } else {
            res.json({ message: 'Price information not available for this game.' });
          }
        } else {
          res.json({ error: priceData[appId].error });
        }
      } else {
        res.json({ message: 'Game not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router;