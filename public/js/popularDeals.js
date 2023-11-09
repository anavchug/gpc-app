document.addEventListener("DOMContentLoaded", async function() {
    try {
      const response = await fetch('/popularDeals');
      const data = await response.json();
      const titlesList = document.getElementById('titles-list');
      
      //getting the store data
      const storeData = await fetch(`/stores`);
      const storeDataJson = await storeData.json();
        
      // Add some styles to titlesList
      titlesList.style.width = '100%';
      titlesList.style.borderCollapse = 'collapse'; 
      titlesList.style.marginTop = '20px'; 
  
      // Create table header
      const tableHeader = document.createElement('thead');
      const headerRow = document.createElement('tr');
      headerRow.style.background = '#333'; 
      headerRow.style.color = 'white'; 
      headerRow.style.fontWeight = 'bold'; 
  
      const headerTitles = ['Store', 'Title', 'Price'];
  
      headerTitles.forEach(title => {
        const th = document.createElement('th');
        th.textContent = title;
        th.style.padding = '10px'; // Add padding to header cells
        headerRow.appendChild(th);
      });
  
      tableHeader.appendChild(headerRow);
      titlesList.appendChild(tableHeader);
  
      // Create table body
      const tableBody = document.createElement('tbody');
      data.forEach(deal => {
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid #ccc'; // Add a border between rows
  
        // Store Column
        const storeCell = document.createElement('td');
        const store = storeDataJson.find((store) => store.storeID === deal.storeID);
        const storeImage = document.createElement('img');
        storeImage.src = "https://www.cheapshark.com/" + store.images.icon; 
        storeImage.alt = store.storeName;
        storeImage.title = store.storeName;
        storeImage.style.width = '20px';
        storeImage.style.height = '20px';
        storeCell.style.verticalAlign = 'middle'; // Center the content vertically
  
        // Append the image to the store cell
        storeCell.appendChild(storeImage);
        row.appendChild(storeCell);
  
        // Title Column with Image
        const titleCell = document.createElement('td');
        const image = document.createElement('img');
        image.src = deal.thumb;
        image.width = 100;
        image.height = 60;
        const titleLink = document.createElement('a');
        titleLink.href = `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`;
        titleLink.textContent = deal.title;
        titleLink.target = '_blank';
        titleLink.style.textDecoration = 'none';
        titleLink.style.color = 'white';
        titleLink.style.transition = 'color 0.2s';
        titleLink.style.cursor = 'pointer';
        titleLink.style.display = 'block'; 
        titleLink.style.marginBottom = '5px'; 

        titleLink.addEventListener('mouseenter', () => {
            titleLink.style.color = 'lightgray'; // Change color on hover
          });
          
          titleLink.addEventListener('mouseleave', () => {
            titleLink.style.color = 'white'; // Restore the original color on mouseout
          });
  
        // Price Column
        const priceCell = document.createElement('td');
        priceCell.textContent = `$${deal.salePrice}`;
        priceCell.style.fontWeight = 'bold'; // Make the price text bold
  
        // Apply padding to table cells for better spacing
        storeCell.style.padding = '10px';
        titleCell.style.padding = '10px';
        priceCell.style.padding = '10px';
  
        titleCell.appendChild(image);
        titleCell.appendChild(titleLink);
  
        row.appendChild(storeCell);
        row.appendChild(titleCell);
        row.appendChild(priceCell);
  
        tableBody.appendChild(row);
      });
  
      titlesList.appendChild(tableBody);
    } catch (error) {
      console.error(error);
    }
  });
  