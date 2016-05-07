// Ziggeo
(function($){
  function embedPlayer(token){
    return ZiggeoApi.Embed.embed("#ziggeo-player", {
      width: 560,
      video: token,
      height: 320
    });
  }

  function embedVidTags(url){
    var $vidTag = $('<video width="400" controls>'+
    '<source src="'+url+'" type="video/mp4">'+
    '</video>');

    $('.player').html($vidTag);
    return $vidTag;
  }

  ZiggeoApi.Events.on("submitted", function (data) {
    //var embed = embedPlayer(data.video.token);
    embedVidTags('http://'+data.video.embed_video_url+'.mp4');
  });


})(jQuery)


// Canvas

var video = document.getElementById('video-preview');
var initialized = 0;

video.oncanplay = function() {
  if ( initialized ) return;
  initialize();
}

var set_button = $('#set-style');
set_button.click(setCanvas)

var moments = {};

function initialize () {
  initialized = 1;

  var still_count = 4;
  var width       = 400;

  for ( var i = 0; i < still_count; i++ ) {
    var id = "still-" + (i + 1);
    var el = document.getElementById(id);

    var entry = new Still({
      index: i + 1,
      id:    id,
    })

    moments[id] = entry;
    entry.setStill();
  }
  $("#still-1").addClass('selected');
}

function Still (opts) {
  this.index = opts.index;
  this.id    = opts.id;
}

Still.prototype = {
  setStill: function() {
    var output = document.getElementById('output');

    var width  = 98;
    var height = 54.25;
    
    var el       = document.createElement('div');
    el.className = "still";
    el.id        = "still-" + this.index;
    
    var canvas       = document.createElement('canvas');
    canvas.className = "canvas";
    canvas.id        = "canvas-" + this.index;
    
    el.appendChild(canvas);
    output.appendChild(el);

    $(el).click(function(e){
      moments[this.id].updateSelected();
    });
  },
  updateSelected: function(){
    $(".still").removeClass('selected');
    $("#" + this.id).addClass('selected');
    var still = document.getElementById(this.id);
    var canvas = still.children[0];
    document.getElementById('preview-container').style.backgroundImage = "url(" + canvas.toDataURL("image/png")+ ")";

  }
}

function setCanvas(){
  var el = document.getElementsByClassName('selected')[0];

  var fc = el.firstChild;

  while( fc ) {
      el.removeChild( fc );
      fc = el.firstChild;
  }

  var width  = 98;
  var height = 54.25;

  var canvas = document.createElement('canvas');
  el.appendChild(canvas);

  var ctx       = canvas.getContext("2d");
  canvas.width  = width;
  canvas.height = height;
  ctx.drawImage(video, 0, 0, 400, 160);

  document.getElementById('preview-container').style.backgroundImage = "url(" + canvas.toDataURL("image/png")+ ")";
}