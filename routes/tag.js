var express = require('express');
var fs = require('fs');
var request = require('request');

var Clarifai = require('../lib/clarifai_node.js');
var router = express.Router();

var clientID = "onIkE5vme3HSsW_Mh1GwLpmHmRdO2go_19fxucYT";
var secret = "6vEWYHsbqkP88S3CFyTVcJSPnrif0M-mu_muaOlM";
var token = "fPPwpATEnF8i75cERJ0mJm4xp1XKDy";

router.post('/', function(req, res) {
  Clarifai.initAPI(clientID, secret);
  var img_data = req.body.img;
    img_data = img_data.replace(/^data:image\/\w+;base64,/, '');
    img_dir = req.app.locals.baseDir + '/public/img/';

    var remote_url = "https://cdn3.vox-cdn.com/thumbor/GXSrBFbRwjbxEvGeE_C86iSoCL4=/0x62:1920x1142/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/46541150/batman-begins.0.0.jpg";

  fs.writeFile(img_dir + 'tester.gif', img_data, {encoding: 'base64'}, function(err){
    console.log("Done writing");
  });

  img_url = img_dir + 'test.jpg';
  console.log(img_url);
var api_url =  'https://api.clarifai.com/v1/tag/?access_token='+ token +'&url="https://samples.clarifai.com/metro-north.jpg"';


  request.get(api_url, function(err, res, body){
    console.log("Clarifai ==>", err)
    console.log(body);
  })

  var tags = Clarifai.tagURL(remote_url, null, function(err, tagRes){
  if(tagRes){
    res.json({tags: tagRes.results});
  }else{
    res.json("no tags");
  }
});

});

module.exports = router;
