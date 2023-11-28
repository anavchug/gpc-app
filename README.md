# Galaxy Game Savers


Galaxy Game Savers is a web-based application designed to help users make informed decisions and save money on game purchases by providing a centralized platform to compare game prices from various online sellers.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

Galaxy Game Savers is built using Node.js and Express.js, providing a fast and efficient server-side environment. The application communicates with the CheapShark API to fetch information about popular game deals, supported stores, game details, and pricing information.

The user interface is designed with HTML, CSS, and JavaScript, offering a user-friendly experience. The design focuses on simplicity and clarity, utilizing tables, cards, and sliders to present information in an organized and visually appealing manner.

## Features

### 1. Popular Deals

Real-time display of curated game deals under $15, presenting information in a table format with game title, price, thumbnail, store, and redirect links for an organized user experience.

![popular deals](https://github.com/anavchug/gpc-app/assets/72577896/bed54918-5985-4a52-8795-a822a253340e)

### 2. Search Bar

User-friendly search bar using Express routes and JavaScript to fetch and filter game data. Results are displayed as visually appealing game cards, allowing users to click on cards to view game prices.

![Search bar](https://github.com/anavchug/gpc-app/assets/72577896/d02015a1-312c-47f0-bf52-bd31167a69b4)

### 3. Currency Conversion

Dynamic dropdown for currency selection triggers real-time API calls to fetch exchange rates, updating prices from USD to the chosen currency in the tables.

![Currency Dropdown](https://github.com/anavchug/gpc-app/assets/72577896/4fc00589-f9b2-4ceb-a2ed-0ccc4383a83d)

### 4. Price Range Slider

Utilizing the noUiSlider library for a user-friendly interface, dynamically updating displayed deals based on the selected price range, enhancing user control and facilitating quick filtering of search results.

![price filter](https://github.com/anavchug/gpc-app/assets/72577896/8d87ab1e-0ac8-4080-be9f-83a3e5bce554)

### 5. Infinite Scroll

Implemented on the Browse page using event handling, fetching additional deals as users scroll down, creating a seamless and user-friendly experience without the need for a "Next Page" button.

## Installation

1. Make sure to have Node.js and Node Package Manager (npm) installed on your machine.
2. Clone this repository to your local machine: `git clone https://github.com/anavchug/gpc-app.git`
3. Navigate to the project directory: `cd gpc-app`
4. Install project dependencies: `npm install`

## Running the Application

1. Run the project using: `node app.js`, which will start a server on port 3000.
2. Visit [http://localhost:3000](http://localhost:3000) in your web browser to access the application.

## Usage

1. On the Home Page, use the Search Bar to search for any game by title.

![sampleGameSearch](https://github.com/anavchug/gpc-app/assets/72577896/6ba648e4-1d99-4beb-838d-4f1b616fcade)

2. The system will show you a list of games that match the keywords you entered.

![searchResultsEldenRing](https://github.com/anavchug/gpc-app/assets/72577896/9e7c7764-9474-4f55-be73-8efd22062262)

3. Click on the game you want to see the prices for, and the system will show you a table with pricing information for that game.
   
![priceTableElden](https://github.com/anavchug/gpc-app/assets/72577896/927cc2dd-8976-43cf-a3e6-a8dd5c23fe65)

5. To buy the game, simply click on the store, and it will redirect you to the store website.

## Contributing

If you would like to contribute to Galaxy Game Savers, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

&copy; 2023 Galaxy Game Savers. All rights reserved.
