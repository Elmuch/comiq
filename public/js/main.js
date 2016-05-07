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
