const Data = require('../application/data/Data');

async function getListOfGames(gameName) {
    const url = 'https://www.cheapshark.com/api/1.0/games?title=' + gameName;
    const gameOnPage = await fetch(url);
    const gameInJson = await gameOnPage.json();
    const lowercaseGameName = gameName.toLowerCase();
    const results = gameInJson.filter(item => {
        return item.external.toLowerCase().includes(lowercaseGameName);
    });
    return results;
  }
  
  async function getPrices(game) {
    const gameId = game.gameID;
    const gameIdUrl = 'https://www.cheapshark.com/api/1.0/games?id=' + gameId;
    const gameObject = await fetch(gameIdUrl);
    const gameObjectInJson = await gameObject.json();
    console.log("Game Object");
    console.log(gameObjectInJson);
  
    const storeIds = [];
    const storePrices = [];
    const retailPrices = [];
    const dealIds = [];
    gameObjectInJson.deals.forEach((obj) => {
      if (obj.storeID != null) {
        storeIds.push(obj.storeID);
        storePrices.push(obj.price);
        retailPrices.push(obj.retailPrice);
        dealIds.push(obj.dealID);
      }
    });
  
    const dataInstance = new Data();
    const jsonData = dataInstance.getData();
  
    const storeNames = [];
    for (let i = 0; i < gameObjectInJson.deals.length; i++) {
      const deal = gameObjectInJson.deals[i];
      const storeID = deal.storeID;
  
      const store = jsonData.find((store) => store.storeID === storeID);
  
      if (store) {
        storeNames.push(store.storeName);
      }
    }
    return {storePrices, storeNames, retailPrices, dealIds};
  }
  module.exports = { getListOfGames, getPrices };