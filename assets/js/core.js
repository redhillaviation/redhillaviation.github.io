/* global DYN_WEB */
$(document).ready(function() {
  $("#mobile-menu").click(function() {
    $("#main-menu").toggleClass("mobile-show-menu");
  });

  if ( DYN_WEB.Scroll_Div.isSupported() && screen.width > 600) {

    DYN_WEB.Event.domReady( function() {
      // arguments: id of scroll area div, id of content div
      var wndo = new DYN_WEB.Scroll_Div('scroll-viewport', 'images-container');

      var options = {
        axis:'h', // scroll axis: 'h' or 'v' for horizontal or vertical
        bRepeat:true, // repeat scrolling in a continuous loop
        repeatId:'rpt', // id attached to repeated first element
        dur:800, // duration of glide-scroll
        bPauseResume:true, // pause/resume on mouseover/mouseout
        distance: $('#first-scrollable').width(), // distance of glide-scroll
        pauseDelay: 5000, // delay between glide-scrolls
        resumeDelay: 300, // delay before resume on mouseout
        startDelay: 2000 // delay before start onload
      };

      wndo.makePauseAuto( options );
    } );
  }
});
