// =====================================================================
// File name: htmlRoutes.js
// Date: April, 2018
// Description: 
//
// =====================================================================

const path = require("path");
const friends = require("../data/friends");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("friends-layout", {
      friends: friends
    });
  });


  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

}