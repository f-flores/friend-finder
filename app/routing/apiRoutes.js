// =====================================================================
// File name: apiRoutes.js
// Date: April, 2018
// Description: 
//
// =====================================================================

const path = require("path");
const friends = require("../data/friends");

module.exports = function(app) {

  // Get ALL tables/reservations
  app.get("/api/friends", function(req, res) {
      return res.json(friends);
  });

}
