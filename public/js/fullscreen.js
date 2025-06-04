$(function(){
    $('#yt-video').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' });
  
    // If you want to keep full screen on window resize
    $(window).resize(function(){
      $('#yt-video').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' });
    });
  });