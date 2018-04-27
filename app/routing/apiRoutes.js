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
  // req.body hosts is equal to JSON post sent from clien
  var newfriend = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  // newfriend.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newfriend);

  friends.push(newfriend);

  res.json(newfriend);
  });

}
