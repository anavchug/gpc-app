var express = require('express');

var router = express.Router();
const fs = require('fs');
const path = require("path");
const Data = require('./Data');
console.log(Data);

router.get('/', function(req, res, next) {
    res.sendFile(path.resolve('public/appTemplate.html') );
    console.log("App Template loaded");
});

router.get('/getPrices', async (req, res) => {
  const { gameName } = req.query;
  const url = 'https://www.cheapshark.com/api/1.0/games?title=' + gameName;
  const gameOnPage = await fetch(url);
  const gameInJson = await gameOnPage.json();
  console.log(gameInJson);

  const game = gameInJson.find((obj) => obj.external.toLowerCase() === gameName.toLowerCase());
  const gameId = game.gameID;

  const gameIdUrl = 'https://www.cheapshark.com/api/1.0/games?id=' + gameId;
  const gameObject = await fetch(gameIdUrl);
  const gameObjectInJson = await gameObject.json();
  console.log(gameObjectInJson);

  //Loop through the gameObjectInJson data and get all the store ids in deals for that game
  const storeIds = []
  const storePrices = []
  gameObjectInJson.deals.forEach(obj =>{
    if(obj.storeID != null){
      storeIds.push(obj.storeID);
      storePrices.push(obj.price);
    }
  });
  console.log(storeIds);
  console.log(storePrices);


  //getting the store json data
  const dataInstance = new Data();
  const jsonData = dataInstance.getData();

  // loop through the store data and get the names of the stores for the requested game 
  const storeNames = [];
  for (let i = 0; i < gameObjectInJson.deals.length; i++) {
    const deal = gameObjectInJson.deals[i];
    const storeID = deal.storeID;
  
    // Search for the corresponding store in the jsonData array
    const store = jsonData.find((store) => store.storeID === storeID);
  
    if (store) {
      storeNames.push(store.storeName);
    }
  }
  console.log(storeNames);

  // Construct an array of formatted strings (store name and price)
  const formattedData = storeNames.map((storeName, index) => `${storeName}: $${storePrices[index]}`);

  // Combine the formatted strings into a single string
  const formattedDataString = formattedData.join('\n');

  // Send the formatted data as a JSON response
  res.json({ formattedData: formattedDataString });
  console.log("Price fetched successfully");

  //To get the link of the website, you can use- www.cheapshark.com/redirect?dealID= -----

});

module.exports = router;