var express = require('express');

var router = express.Router();
const fs = require('fs');
const path = require("path");
const gameService = require('../public/js/gameService');
var searchResults = [];

router.get('/', function(req, res, next) {
  res.sendFile(path.resolve('./public/appTemplate.html') );
});

router.get('/about', function(req, res, next) {
  res.sendFile(path.resolve('./public/about.html') );
});

router.get('/browse', function(req, res, next) {
  res.sendFile(path.resolve('./public/browse.html') );
});

router.get('/stores', async (req, res, next) => {
  try {
    const stores = await gameService.getStores();
    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/popularDeals', async (req, res, next) => {
  try {
    const titles = await gameService.popularDeals();
    res.json({ titles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
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
module.exports = router;