// Code for fetching and displaying popular game deals
document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('/popularDeals'); 
        const data = await response.json();
  
        if (data.titles && data.titles.length > 0) {
            const titlesList = document.getElementById('titles-list');
  
            data.titles.forEach(title => {
                const li = document.createElement('li');
                li.textContent = title;
                titlesList.appendChild(li);
            });
        }
    } catch (error) {
        console.error(error);
    }
  });
  