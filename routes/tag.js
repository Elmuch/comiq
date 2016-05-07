var express = require('express');
var fs = require('fs');

var Clarifai = require('../lib/clarifai_node.js');
var router = express.Router();

var clientID = "onIkE5vme3HSsW_Mh1GwLpmHmRdO2go_19fxucYT";
var secret = "6vEWYHsbqkP88S3CFyTVcJSPnrif0M-mu_muaOlM";

router.post('/', function(req, res) {
  Clarifai.initAPI(clientID, secret);
  var img_data = req.body.img;
    img_data = img_data.replace(/^data:image\/\w+;base64,/, '');
    img_dir = req.app.locals.baseDir + '/public/img/';

  fs.writeFile(img_dir + 'tester.gif', img_data, {encoding: 'base64'}, function(err){
    console.log("Done writing");
  });

  img_url = img_dir + 'test.jpg';
  console.log(img_url);

  var tags = Clarifai.tagURL(img_url, null, function(err, tagRes){
  if(tagRes){
    res.json({tags: tagRes.results});
  }else{
    res.json("no tags");
  }
});

});

module.exports = router;
