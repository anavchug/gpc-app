// const fs = require('fs');
// const path = require("path");

// class application {

//     constructor(req) {
//         // this.appData =  JSON.parse(fs.readFileSync(path.resolve('./application/data/applicationData.json')));
//         this.req = req;
//     };
//     renderApplicationPage() {
//         this.template = fs.readFileSync(path.resolve('./application/template/appTemplate.html')).toString();  // read in the /template/applicationTemplate.html file.
        
//         //loop through the data and generate links for each object and add them to items
//         let items = "";
//         this.appData.forEach(obj =>{
//             items += `<div> <a href="/jujutsukaisen${obj.url}">${obj.name}</a> </div>`;
//         });
//         this.template = this.template.replace("{content}", items);
//     }

//     renderContentPage() { //Render Content Page Here
//         this.template = fs.readFileSync(path.resolve('./application/templates/listOfGames.html')).toString(); // read in the /template/contentTemplate.html file.
        
//         //Find the object from the JSON data by comparing it to the passed in url
//         let url = this.req.url;

//         let contentObject = this.appData.find(obj => obj.url === url);

//         //if object is found, get its properties and put in the template
//         this.template = this.template.replace("{name}", contentObject.name);
//         this.template = this.template.replace("{desc}", contentObject.desc);
//         this.template = this.template.replace("{image}", contentObject.image);

//     }


//     getApplicationPage() {
//         this.renderApplicationPage();
//         return this.template;
//     }

//     getContentPage() {
//         this.renderContentPage();
//         return this.template;
//     }


// }


// module.exports = application;