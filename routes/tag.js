var express = require('express');

var Clarifai = require('../lib/clarifai_node.js');
var router = express.Router();

var clientID = "onIkE5vme3HSsW_Mh1GwLpmHmRdO2go_19fxucYT";
var secret = "6vEWYHsbqkP88S3CFyTVcJSPnrif0M-mu_muaOlM";

router.post('/', function(req, res) {
  Clarifai.initAPI(clientID, secret);
  var img_url = req.body.img;
  console.log(img_url)
  var tags = Clarifai.tagURL("http://static1.gamespot.com/uploads/scale_large/104/1049837/2891179-batman-arkham_knight-review_nologo_20150618.jpg", null, function(err, tagRes){
  if(tagRes){
    res.json({tags: tagRes.results});
  }else{
    res.json("no tags");
  }
});

});

module.exports = router;
