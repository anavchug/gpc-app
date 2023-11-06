   //JavaScript to handle the response and display the game names and thumbnails
   document.addEventListener("DOMContentLoaded", async function() {
    const form = document.querySelector('form');
    const gameCards = document.querySelector('.game-cards');
    const gamePrices = document.getElementById('gamePrices');
    const priceTable = document.getElementById('priceTable');
    const backButton = document.getElementById('backButton');
    const gameNameInput = document.getElementById('gameName');
    const aboutContent = document.querySelector(".about-content");
    

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const gameName = gameNameInput.value;
      const titlesList = document.getElementById('titles-list');
      const titlesDiv = document.querySelector(".popularDeals");
      titlesList.style.display = 'none';
      titlesDiv.style.display = 'none'

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
            displayGamePrices(game.external); // Call a function to display game prices
          });

          gameThumbnail.src = thumbnails[index]; // Set the thumbnail source

          gameCard.appendChild(gameThumbnail);
          gameCard.appendChild(gameLink);
          gameCards.appendChild(gameCard);
        });

        // Display the game cards and hide others
        gameCards.style.display = 'block';
        gamePrices.style.display = 'none';
        aboutContent.style.display = 'none';

      } else {
        gameCards.innerHTML = 'No games found with that name';
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
      }
  });
    
    //Function to display game prices
    async function displayGamePrices(gameName) {
      const gameNameRow = document.getElementById("gameNameRow");
      const gameCards = document.querySelector('.game-cards');
      gameNameRow.textContent = `${gameName}`;
      // Make a request to the route to get game prices
      const pricesResponse = await fetch(`/getPrices?gameLinkName=${gameName}`);
      const pricesData = await pricesResponse.json();
      console.log("Prices Data");
      console.log(pricesData);

      if (pricesData.storePrices) {
        // Clear the previous list of prices
        priceTable.innerHTML = '';
        
        const oldGameImage = gamePrices.querySelector("img");
        if (oldGameImage) {
            oldGameImage.remove();
        }
        let gameImage = document.createElement("img");
        gameImage.src = pricesData.imageSource;
        gamePrices.append(gameImage);

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

          storeLink.textContent = storeName;
          storeLink.href = `https://www.cheapshark.com/redirect?dealID=${dealId}`;
          storeLink.target = '_blank'; // Open link in a new tab

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
