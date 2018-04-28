// =====================================================================
// File name: apiRoutes.js
// Date: April, 2018
// Description: 
//
// =====================================================================

const path = require("path");
const friends = require("../data/friends");

module.exports = function(app) {
  // api/friends
  app.get("/api/friends", function(req, res) {
      return res.json(friends);
  });

  // Create new friend, takes in json input
  app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to JSON post sent from client
    var newfriend = req.body;
    var userChoices = req.body.scores;
    var i;

    for (i = 0; i < userChoices.length; i++){
      userChoices[i] = parseInt(userChoices[i]);
    }
    console.log(userChoices);

    console.log(newfriend);
    friends.push(newfriend);
    res.json(newfriend);
  });

}
