var express = require('express');

var router = express.Router();
const fs = require('fs');
const path = require("path");
const gameService = require('../application/gameService');
var searchResults = [];

router.get('/', function(req, res, next) {
  res.sendFile(path.resolve('./application/templates/appTemplate.html') );
});

router.get('/getListOfGames', async (req, res) => {
  const { gameName } = req.query;
  try {
    searchResults = await gameService.getListOfGames(gameName);
    console.log(searchResults);
    const thumbnails = searchResults.map(obj => obj.thumb);
    res.json({ searchResults, thumbnails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/getPrices', async (req, res) => {
  const { gameLinkName } = req.query;
  const results = searchResults;
  const game = results.find((obj) => obj.external.toLowerCase() === gameLinkName.toLowerCase());
  console.log(game);
  if (!game) {
    return { error: 'Game not found' };
  }
  try {
    const pricesData = await gameService.getPrices(game); //getting the price, store data
    if (pricesData.error) {
      res.status(404).json(pricesData);
    } else {
      res.json(pricesData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

  // For the suggested titles for good deals, we can display the ones that are less than atleast $10 from the retail price
  // or use this- https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15 this is better
  // https://www.cheapshark.com/api/1.0/deals?upperPrice=15 , there is also an isOnSale parameter, look into that as well 

module.exports = router;