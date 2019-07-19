$(document).ready(function(){

    var nav = $(".jumbotron").position();

  window.addEventListener('scroll', function () {
      var pos = $(window).scrollTop();
      if(pos<nav){
          $(".jumbotron").css('visibility','hidden');
      } else{
        $(".jumbotron").css('visibility','visible');
      }
  });


});