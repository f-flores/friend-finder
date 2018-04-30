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
// var helpers = require("handlebars-helpers")(["math", "string"]);

var path = require("path");

// ---------------------------------------------------------------------
// setup port
//
var PORT = process.env.PORT || 3000;

// Create an instance of the express app.
var app = express();

// set Handlebars as the default templating engine.
app.engine("handlebars", expresshbs({ defaultLayout: "main",
	helpers: { 
		addOne: function(value, options) {
			return parseInt(value) + 1;
		},
		makeId: function(value, options) {
			return "qtn" + (parseInt(value) + 1).toString();
		},
		selErrorId: function(value, options) {
			return "select-error-" + (parseInt(value) + 1).toString();
		}
	}
	}));
app.set("view engine", "handlebars");

// body parser to handle midway data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// for style.css and survey.js
app.use(express.static(path.join(__dirname, '/app/public')));

// setup routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});
