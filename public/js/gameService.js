const Data = require('../../application/data/Data');

async function popularDeals(){
  const url = 'https://www.cheapshark.com/api/1.0/deals?&upperPrice=15';
  const popularDeals = await fetch(url);
  const popularDealsJson = await popularDeals.json();
  return popularDealsJson;
}

async function getStores(){
  const url = "https://www.cheapshark.com/api/1.0/stores";
  const stores = await fetch(url);
  const storesJson = await stores.json();
  return storesJson;

}

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
    console.log(gameObjectInJson);
  
    const storeIds = [];
    const storePrices = [];
    const retailPrices = [];
    const dealIds = [];

    let imageSource = "";
    imageSource = gameObjectInJson.info.thumb;

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
    return {storePrices, storeNames, retailPrices, dealIds, imageSource};
  }
  module.exports = { getListOfGames, getPrices, popularDeals, getStores };