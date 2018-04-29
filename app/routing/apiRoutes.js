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
    var newfriend = req.body,
        userChoices = req.body.scores,
        bestMatch = {},
        i;
    
    /* shuffles array of objects */
    function shuffle(arr) {
      // make copy of array of objects
      var reArr = JSON.parse(JSON.stringify(arr));
      var ind, tmp, randNum;
      // console.log("beginning arr like copy: " + JSON.stringify(arr));
      // console.log("beginning reArr like copy: " + JSON.stringify(reArr));

      for (ind = reArr.length - 1; ind > 0; ind--){
        randNum = Math.floor(Math.random() * (ind + 1));
        tmp = reArr[ind];
        reArr[ind] = reArr[randNum];
        reArr[randNum] = tmp;
      }
      console.log("beginning reArr like copy: " + JSON.stringify(reArr));
      return reArr;
    }

    /* compares new member to friends list and returns best match */
    function friendCompare(nArr) {
      var bm = {}, rearrFriends = [], totDiffArr = [], ind, minScore, bestInd;
      console.log("in friendCompare()");
      
      // In order to handle cases in which there are "ties", or two or more existing users
      // who match the minimum score, the friends array is first shuffled. This ensures that
      // the lowest indexed friend's object is not always chosen in case of a tie. 
      rearrFriends = shuffle(friends);

      for (ind = 0; ind < rearrFriends.length; ind++ ) {
        // console.log(rest[ind].scores);
        var diff = 0, totalDiff = 0;
        for (var j = 0; j < rearrFriends[ind].scores.length; j++) {
          diff = Math.abs(nArr[j] - rearrFriends[ind].scores[j]);
          totalDiff += diff;
        }
        totDiffArr.push(totalDiff);
      }

      minScore = Math.min( ...totDiffArr );
      bestInd = totDiffArr.indexOf(minScore);
      console.log("Total Diff Array: " + totDiffArr);
      console.log("min score: " + minScore);
      console.log("best friend index: " + bestInd);
      console.log("best match info: " + JSON.stringify(rearrFriends[bestInd]));
      return rearrFriends[bestInd];
    }

    for (i = 0; i < userChoices.length; i++){
      userChoices[i] = parseInt(userChoices[i]);
    }
    console.log(userChoices);

    // compare newfriend with rest of friends
    bestMatch = friendCompare(newfriend.scores);

    console.log(newfriend);
    friends.push(newfriend);

    res.json(bestMatch);
  });

}
