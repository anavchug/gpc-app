class DealTableManager {
  constructor() {
    this.dealTableBody = document.getElementById("dealTableBody");
    this.loading = document.getElementById("loading");
    this.slider = document.getElementById('slider');
    this.demo1 = document.getElementById('demo');
    this.demo2 = document.getElementById('demo2');
    this.latestDealsData = null;
    this.pageNumber = 1;

    noUiSlider.create(this.slider, {
      start: [50, 150],
      connect: true,
      range: {
        'min': 1,
        'max': 200
      }
    });

    this.slider.noUiSlider.on('update', (values, handle) => {
      if (handle === 0) {
        this.demo1.innerHTML = Math.round(values[handle]);
      } else {
        this.demo2.innerHTML = Math.round(values[handle]);
      }
    });

    this.slider.noUiSlider.on('change', () => {
      this.dealTableBody.innerHTML = '';
      const minValue = Math.round(this.slider.noUiSlider.get()[0]);
      const maxValue = Math.round(this.slider.noUiSlider.get()[1]);
      this.pageNumber = 1;
      this.loadMoreDeals(minValue, maxValue);
    });

    this.initialize();
  }

  async initialize() {
    await this.loadStoreData();
    const initialMinValue = Math.round(this.slider.noUiSlider.get()[0]);
    const initialMaxValue = Math.round(this.slider.noUiSlider.get()[1]);
    this.loadMoreDeals(initialMinValue, initialMaxValue);

    window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const currentMinValue = Math.round(this.slider.noUiSlider.get()[0]);
        const currentMaxValue = Math.round(this.slider.noUiSlider.get()[1]);
        this.loadMoreDeals(currentMinValue, currentMaxValue);
      }
    });
  }

  async loadStoreData() {
    const response = await fetch(`/stores`);
    const storeDataJson = await response.json();
    this.storeData = storeDataJson;
    return this.storeData;
  }

  async browseDeals(lowerPrice, upperPrice, pageNumber) {
    const url = `https://www.cheapshark.com/api/1.0/deals?lowerPrice=${lowerPrice}&upperPrice=${upperPrice}&pageNumber=${pageNumber}`;
    const response = await fetch(url);
    const dealsData = await response.json();
    this.latestDealsData = dealsData;
    return dealsData;
  }

  async loadMoreDeals(lowerPrice, upperPrice) {
    this.loading.style.display = "block";
    const deals = await this.browseDeals(lowerPrice, upperPrice, this.pageNumber);
    this.loading.style.display = "none";

    if (deals.length === 0) {
      this.loading.textContent = "No more deals available.";
      return;
    }

    deals.forEach(deal => {
      const row = document.createElement("tr");
      row.style.borderBottom = '1px solid #ccc';
  
      //Store cell
      const storeCell = document.createElement("td");
      const store = this.storeData.find((store) => store.storeID === deal.storeID);
      // Create an image element
      const storeImage = document.createElement("img");
      storeImage.src = "https://www.cheapshark.com/"+store.images.icon; 
      storeImage.alt = store.storeName; 
      storeImage.title = store.storeName; 
      storeImage.style.width = "20px"; 
      storeImage.style.height = "20px"; 

    // Append the image to the store cell
      storeCell.appendChild(storeImage);
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
      storeLink.style.textDecoration = 'none';
      storeLink.style.color = 'white';
      storeLink.style.transition = 'color 0.2s'; 
      storeLink.style.cursor = 'pointer'; 

      storeLink.href = `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`;
      storeLink.target = '_blank'; 

      storeLink.addEventListener('mouseenter', () => {
        storeLink.style.color = 'lightgray'; 
      });
      
      storeLink.addEventListener('mouseleave', () => {
        storeLink.style.color = 'white'; 
      });
  
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
  
      this.dealTableBody.appendChild(row);
    });
  
    this.pageNumber++;
    
  }
  getLatestDealsData() {
    return this.latestDealsData;
  }
}
const dealTableManager = new DealTableManager();

