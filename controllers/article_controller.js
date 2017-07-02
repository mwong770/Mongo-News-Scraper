
// dependencies
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");

// models
var Articles = require("../models/articles.js");
var Comments = require("../models/comments.js");

var router = express.Router();

// grabs an article by it's ObjectId
router.get("/articles/:id", function(req, res) {
  // queries the db to find the matching one in our db...
  Articles.findOne({ "_id": req.params.id })
  // populates all of the notes associated with it
  .populate("comments")
  // executes the query
  .exec(function(error, doc) {
    // logs any errors
    if (error) {
      console.log(error);
    }
    // sends doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

// creates a new note or replaces an existing note
router.post("/articles/:id", function(req, res) {
  // creates a new note and passes the req.body to the entry
  var newComment = new Comments(req.body);
  console.log(req.body);
  // saves the new note the db
  newComment.save(function(error, doc) {
    // logs any errors
    if (error) {
      console.log(error);
    }
    else {
      // uses the article id to find and update it's note
      Articles.findOneAndUpdate({ "_id": req.params.id }, { "comments": doc._id })
      .populate("comments")
      // executes the above query
      .exec(function(err, doc) {
        // logs any errors
        if (err) {
          console.log(err);
        }
        else {
          // or sends the document to the browser
          console.log(doc);
          res.send(doc);
        }
      });
    }
  });
});

// scrapes and displays news articles 
router.get("/", function(req, res) {
	// gets html body
    request("http://www.npr.org/sections/news/", function(error, response, html) {
    	// loads html into cheerio and saves it to $
        var $ = cheerio.load(html);
        // holds entry objects
        var entry = [];
        // grabs requested items from sections with classes .item.has-image
        $(".item.has-image").each(function(i, element) {
        	// limits the results to be saved
            if (i >= 4) {
               return false;
            }
        	// empties result object
        	var result = {};
            // places selected element properties into result object
            result.title = $(this).children(".item-info").find("h2.title").text();
            result.source = $(this).children(".item-info").find("h3.slug").find("a").text();
            result.teaser = $(this).children(".item-info").find("p.teaser").text();
            result.img = $(this).children(".item-image").find("a").find("img").attr("src");
            result.link = $(this).children(".item-info").find("h2.title").find("a").attr("href");
            // creates an entry object of the Articles model  
            entry.push(new Articles(result)); 
        });
        for (var i = 0; i < entry.length; i++){
            entry[i].save(function(err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(data);
                }
            });
            // retrieves articles from db only after all entries have been made
            if (i === (entry.length - 1)){
                res.redirect("/articles");
            }
        }

    });// ends request to NPR
});// ends router

// gets articles from db and displays them
router.get("/articles", function(req, res) {
    Articles.find({}, function(err, data){
        if (err){ 
            console.log(err);
        } else {
            res.render("index", {articles: data});
        }
    });
});

// deletes a note from note model and it's article reference
router.post("/delete", function(req, res) {
        // Get articles with reference to that note and pop from array
        Articles.findOneAndUpdate({"_id": req.body.articleId}, {$pull : {"articles": req.body.articleId}})
        .exec(function(err, data) {
            if(err) {
                console.log(err);
            }else {
                // Delete note with that id
                Articles.findByIdAndRemove(req.body.articleId).exec(function(err, data) {
                    if(err) {
                        console.log(err);
                    }else {
                        res.send(data);
                    }
                });
            }
        });
    });

// exports routes
module.exports = router;