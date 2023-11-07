
async function browseDeals(pageNumber) {
    const url = "https://www.cheapshark.com/api/1.0/deals?upperPrice=100&pageNumber=" + pageNumber;
    const randomTitles = await fetch(url);
    const randomTitlesJson = await randomTitles.json();
    return randomTitlesJson;
  }
  
  let pageNumber = 1;
  const dealTableBody = document.getElementById("dealTableBody");
  const loading = document.getElementById("loading");

  async function loadMoreDeals() {
    loading.style.display = "block";
    const deals = await browseDeals(pageNumber);
    loading.style.display = "none";
  
    if (deals.length === 0) {
      // No more deals to load
      loading.textContent = "No more deals available.";
      return;
    }
    
    //getting the store data
    const storeData = await fetch(`/stores`);
    const storeDataJson = await storeData.json();

    deals.forEach(async deal => {
      const row = document.createElement("tr");
  
      //Store cell
      const storeCell = document.createElement("td");
      const store = storeDataJson.find((store) => store.storeID === deal.storeID);
      // Create an image element
      const storeImage = document.createElement("img");
      storeImage.src = "https://www.cheapshark.com/"+store.images.icon; 
      storeImage.alt = store.storeName; 
      storeImage.title = store.storeName; 
      storeImage.style.width = "20px"; 
      storeImage.style.height = "20px"; 

// Append the image to the store cell
    storeCell.appendChild(storeImage);
      // storeCell.textContent = store.storeName;
      row.appendChild(storeCell);
  
      // Title cell with image
      const titleCell = document.createElement("td");
      const titleContainer = document.createElement("div");
      titleContainer.style.display = "flex";
  
      const gameImage = document.createElement("img");
      gameImage.src = deal.thumb;
      gameImage.style.width = "100px";
      gameImage.style.height = "60px";
  
      titleContainer.appendChild(gameImage);
      const storeLink = document.createElement('a');
      storeLink.textContent = deal.title;;
      storeLink.href = `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`;
      storeLink.target = '_blank'; 
  
      titleContainer.appendChild(storeLink);
      titleCell.appendChild(titleContainer);
      row.appendChild(titleCell);
  
      // Price cell
      const priceCell = document.createElement("td");
      priceCell.textContent = `$${deal.normalPrice}`;
      row.appendChild(priceCell);
  
      // Deal Rating cell
      const dealRatingCell = document.createElement("td");
      dealRatingCell.textContent = deal.dealRating;
      row.appendChild(dealRatingCell);
  
      // Release cell
      const releaseCell = document.createElement("td");
      const releaseDate = new Date(deal.releaseDate * 1000);
      releaseCell.textContent = releaseDate.toLocaleDateString();
      row.appendChild(releaseCell);
  
      dealTableBody.appendChild(row);
    });
  
    pageNumber++;
  }
  
  // Initial load
  loadMoreDeals();
  
  // Infinite scrolling
  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadMoreDeals();
    }
  });