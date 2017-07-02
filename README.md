# Mongo-News-Scraper

A Node.js and MongoDB application that stores scraped news from the NY Times and lets users leave comments on the articles

[Check Out Mongo News Scraper](https://mongo-news-scraper-1.herokuapp.com/)


## Table of Contents

[:computer:  Technologies Used](#technologies-used)

[:dvd:  Installation and Usage](#installation)

[:boom:  Features](#features)

[:bust_in_silhouette:  Developer](#developer)

[:email:  Questions or Comments](#questions-or-comments)


## <a name="technologies-used"></a> :computer: Technologies Used 
 
* MongoDB 
* Node.js
* Express.js
* Cheerio
* Heroku
* JavaScript
* jQuery
* Handlebars.js
* Materialize
* HTML5
* CSS3
* Node Modules
	* [mongoose](https://www.npmjs.com/package/mongoose)
	* [cheerio](https://www.npmjs.com/package/cheerio)
	* [bluebird](https://www.npmjs.com/package/bluebird)
	* [express](https://www.npmjs.com/package/express)
	* [express-handlebars](https://www.npmjs.com/package/express-handlebars) 
	* [body-parser](https://www.npmjs.com/package/body-parser)
	* [request](https://www.npmjs.com/package/request)
	* [morgan](https://www.npmjs.com/package/morgan) 
	* [dotenv](https://www.npmjs.com/package/dotenv) 


## <a name="installation"></a> :dvd: Installation and Usage 

* Install [Node.js](https://nodejs.org/en/download/) and [MongoDB](https://www.mongodb.com/download-center?jmp=tutorials&_ga=2.176027621.697407620.1498408984-208158305.1498000237#community), if you don't have it.
* Clone the Mongo-News-Scraper repository to your local computer.
* On your terminal, run the command 'mongod --dbpath ~/DATA/DB' (modify based on the path you set)
* On a separate terminal window, navigate to the folder where the repository is located.
* Run the command `npm install` to download all required dependencies.
* Run the command `npm server.js` to start the server.
* Type 'localhost: 3000' on a browser to view the app.


## <a name="features"></a> :boom: Features

* Read the latest scraped articles from npr when first entering the site
* Click a button to rescrape articles from npr's site
* Read the headline, summary and byline of newly scraped articles
* Click a button to read the full article on npr's website
* Leave and read comments on articles
* Delete any comments


## <a name="developer"></a> :bust_in_silhouette: Developer

* Maria Wong 


## <a name="questions-or-comments"></a> :email: Questions or Comments 

If you have any questions or comments, feel free to message me on [LinkedIn](https://www.linkedin.com/in/maria-wong/).

 ### Thanks for checking out Mongo News Scraper!