   //JavaScript to handle the response and display the game names and thumbnails
   document.addEventListener("DOMContentLoaded", async function() {
    const form = document.querySelector('form');
    const gameCards = document.querySelector('.game-cards');
    const gamePrices = document.getElementById('gamePrices');
    const priceTable = document.getElementById('priceTable');
    const backButton = document.getElementById('backButton');
    const gameNameInput = document.getElementById('gameName');
    const aboutContent = document.querySelector(".about-content");
    const browseContent = document.querySelector(".browsePage");
    var browseLink = document.getElementById('browseLink');
    var aboutLink = document.getElementById("aboutLink");
    const currencyDropdown = document.getElementById('currencyDropdown');
    const popularDeals = document.querySelector(".popularDeals");

    
    let pricesData;
    
    browseLink.addEventListener('click', function(e) {
      e.preventDefault(); 

      currencyDropdown.selectedIndex = 0;
      popularDeals.style.display = 'none';
      gameCards.style.display = 'none'; 
      browseContent.style.display = 'block';
      aboutContent.style.display = 'none';
  });
  aboutLink.addEventListener('click', function(e) {
    e.preventDefault(); 
    currencyDropdown.selectedIndex = 0;
    popularDeals.style.display = 'none';
    gameCards.style.display = 'none';  
    browseContent.style.display = 'none';
    gamePrices.style.display = 'none';
    aboutContent.style.display = "block";
});

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const gameName = gameNameInput.value;
      const titlesList = document.getElementById('titles-list');
      const titlesDiv = document.querySelector(".popularDeals");
      titlesList.style.display = 'none';
      titlesDiv.style.display = 'none';
      currencyDropdown.selectedIndex = 0;
      

      // Make a request to the route to get the list of games
      const response = await fetch(`/getListOfGames?gameName=${gameName}`);
      const { searchResults, thumbnails } = await response.json();

      // Clear the previously displayed game cards
      gameCards.innerHTML = '';

      if (searchResults.length > 0) {
        // Loop through the games and create game cards with links and thumbnails
        searchResults.forEach((game, index) => {
          const gameCard = document.createElement('div');
          gameCard.className = 'game-card';

          const gameLink = document.createElement('a');
          const gameThumbnail = document.createElement('img'); // Create an image element for the thumbnail

          gameLink.textContent = game.external;
          gameLink.href = `javascript:void(0);`; // Make it a non-navigating link
          gameLink.addEventListener('click', async () => {
          // When a game link is clicked, store the current game
            currentGame = game;
            // const currencyHeadergameSearch = document.querySelector('#priceTable th:nth-child(2)');
            // currencyHeadergameSearch.textContent = 'Price';

            displayGamePrices(game.external); // Call a function to display game prices
          });

          gameThumbnail.src = thumbnails[index]; // Set the thumbnail source

          gameCard.appendChild(gameThumbnail);
          gameCard.appendChild(gameLink);
          gameCards.appendChild(gameCard);
        });

        // Display the game cards and hide other things on the page
        gameCards.style.display = 'block';
        gamePrices.style.display = 'none';
        browseContent.style.display = 'none';
        aboutContent.style.display = 'none';

      } else {
        gameCards.innerHTML = 'Sorry, we were unable to find that game. Try searching a different title!';
        gameCards.style.display = 'block';
        gameCards.style.color = 'white';
      }
    });
    // Add an event listener to the back button
    backButton.addEventListener('click', () => {
      if (currentGame) {
        displayGameList();
      }
    });
  
    function displayGameList() {
        gamePrices.style.display = 'none';
        gameCards.style.display = 'block';
        aboutContent.style.display = 'none';
      }
  });
    
    //Function to display game prices
    async function displayGamePrices(gameName) {
      const gameNameRow = document.getElementById("gameNameRow");
      const gameCards = document.querySelector('.game-cards');
      gameNameRow.textContent = `${gameName}`;

      // Make a request to the route to get game prices
      const pricesResponse = await fetch(`/getPrices?gameLinkName=${gameName}`);
      pricesData = await pricesResponse.json();

      const currencyHeaderPrices = document.querySelector('#gamePrices th:nth-child(2)');
      const currencyHeaderRetailPrices = document.querySelector('#gamePrices th:nth-child(3)');
      currencyHeaderPrices.textContent = 'Price';
      currencyHeaderRetailPrices.textContent = 'Retail Price';

      if (pricesData.storePrices) {
        // Clear the previous list of prices
        priceTable.innerHTML = '';

        const oldGameImage = gamePrices.querySelector("img");
        if (oldGameImage) {
            oldGameImage.remove();
        }
        let gameImage = document.createElement("img");
        gameImage.className = "game-image"; // Add a class to the image
        gameImage.src = pricesData.imageSource;
        gamePrices.prepend(gameImage);
        
        // Loop through the storePrices, storeNames, and retailPrices arrays
        for (let i = 0; i < pricesData.storePrices.length; i++) {
          const storeName = pricesData.storeNames[i];
          const storePrice = pricesData.storePrices[i];
          const retailPrice = pricesData.retailPrices[i];
          const dealId = pricesData.dealIds[i];

          // Create a new row for each store in the table
          const row = document.createElement('tr');
          const storeCell = document.createElement('td');
          const priceCell = document.createElement('td');
          const retailPriceCell = document.createElement('td');
          const storeLink = document.createElement('a');

          row.style.borderBottom = '1px solid #ccc';

          storeLink.textContent = storeName;
          storeLink.href = `https://www.cheapshark.com/redirect?dealID=${dealId}`;
          storeLink.target = '_blank'; // Open link in a new tab
          storeLink.style.color = "white";

          storeCell.appendChild(storeLink);
          priceCell.textContent = `$${storePrice}`;
          retailPriceCell.textContent = `$${retailPrice}`;

          row.appendChild(storeCell);
          row.appendChild(priceCell);
          row.appendChild(retailPriceCell);

          priceTable.appendChild(row);
        }
        
        // Display the prices and hide the game cards
        gamePrices.style.display = 'block';
        gameCards.style.display = 'none';
        aboutContent.style.display = 'none';
      } else {
        gamePrices.innerHTML = 'Prices not found for this game';
        gamePrices.style.display = 'block';
        gameCards.style.display = 'none';
      }
    }

// Add an event listener for currency dropdown change
currencyDropdown.addEventListener('change', async () => {
  const selectedCurrency = currencyDropdown.value;

    try {
      // Fetch exchange rates based on the selected currency
      const currencyResponse = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
      const currencyData = await currencyResponse.json();
      const conversionRate = currencyData.rates[selectedCurrency];

      // Getting price columns in the different tables
      const priceCells = document.querySelectorAll('#priceTable td:nth-child(2)');
      const retailPriceCells = document.querySelectorAll('#priceTable td:nth-child(3)');
      const priceCellsForPopularDeals = document.querySelectorAll('#titles-list td:nth-child(3)');

      //getting the prices for popular deals
      var popularDealData = [];
      const response = await fetch('/popularDeals');
      const data = await response.json();
      data.forEach(deal =>{
        popularDealData.push(deal.salePrice);
      });

      const currentPath = window.location.pathname;
      if(currentPath == '/'){
        const currencyHeader = document.querySelector('#titles-list th:nth-child(3)');

        for(i = 0; i< priceCellsForPopularDeals.length; i++){
          let originalPopularDealPrice = popularDealData[i];
          const convertedPopularDealPrice = (originalPopularDealPrice * conversionRate).toFixed(2);
          
          if(conversionRate == '1'){
            priceCellsForPopularDeals[i].textContent = `$${convertedPopularDealPrice}`;
            currencyHeader.textContent = 'Price';
          }
          else{
            priceCellsForPopularDeals[i].textContent = `${convertedPopularDealPrice}`;
            currencyHeader.textContent = 'Price (' + selectedCurrency + ')';
          }
      }
    }
      priceCells.forEach((priceCell, index) => {
        
        let originalPrice = pricesData.storePrices[index];
        const convertedPrice = (originalPrice * conversionRate).toFixed(2);

        let originalRetailPrice = pricesData.retailPrices[index];
        const convertedRetailPrice = (originalRetailPrice * conversionRate).toFixed(2);

        if(conversionRate == '1'){
          priceCell.textContent = `$${convertedPrice}`;
          retailPriceCells[index].textContent = `$${convertedRetailPrice}`;
        }
        else{
          priceCell.textContent = `${convertedPrice}`;
          retailPriceCells[index].textContent = `${convertedRetailPrice}`;
        }
      });

      // Update currency header
      const currencyHeader = document.querySelector('#gamePrices th:nth-child(2)');
      const currencyHeaderRetailPrices = document.querySelector('#gamePrices th:nth-child(3)');

      if(conversionRate == '1'){
        currencyHeader.textContent = 'Price';
        currencyHeaderRetailPrices.textContent = 'Retail Price';
       
      }
      else{
        currencyHeader.textContent = 'Price (' + selectedCurrency + ')';
        currencyHeaderRetailPrices.textContent = 'Retail Price (' + selectedCurrency + ')';
      }
    } catch (error) {
      console.error('Error updating prices:', error);
    }
});
window.addEventListener('load', adjustFooterPosition);
window.addEventListener('resize', adjustFooterPosition);

      
