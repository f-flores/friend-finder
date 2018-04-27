// =====================================================================
// File name: server.js
// Date: April, 2018
// Description: 
//
// =====================================================================
 

// ---------------------------------------------------------------------
// Dependencies
//
var express = require("express");
var expresshbs = require("express-handlebars");

var bodyParser = require("body-parser");
var path = require("path");

// ---------------------------------------------------------------------
// setup port
//
var PORT = process.env.PORT || 3000;

// Create an instance of the express app.
var app = express();

// set Handlebars as the default templating engine.
app.engine("handlebars", expresshbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// for style.css
app.use(express.static(path.join(__dirname, '/app/public')));

// setup routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});

/* app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "home.html"));
}); */

/* app.get("/survey", function(req, res) {
	res.sendFile(path.join(__dirname, "add.html"));
}); */

// Displays all characters
/* app.get("/api/characters", function(req, res) {
	return res.json(characters);
}); */

// Displays a single character, or returns false
/* app.get("/api/characters/:character", function(req, res) {
	var chosen = req.params.character;

	console.log(chosen);

	for (var i = 0; i < characters.length; i++) {
		if (chosen === characters[i].routeName) {
			return res.json(characters[i]);
		}
	}

	return res.json(false);
}); */

// Create New Characters - takes in JSON input
/* app.post("/api/characters", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newcharacter = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcharacter);

  characters.push(newcharacter);

  res.json(newcharacter);
}); */
