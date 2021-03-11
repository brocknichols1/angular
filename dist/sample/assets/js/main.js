jQuery(document).ready(function($) {
  'use strict';
  var top_header = $('.parallax-content');
  top_header.css({'background-position':'center center'}); // better use CSS

  $(window).scroll(function () {
    var st = $(this).scrollTop();
    top_header.css({'background-position':'center calc(50% + '+(st*.5)+'px)'});
  });

  $('.counter').each(function() {
    var $this = $(this),
      countTo = $this.attr('data-count');

    $({ countNum: $this.text()}).animate({
        countNum: countTo
      },
      {
        duration: 8000,
        easing:'linear',
        step: function() {
          $this.text(Math.floor(this.countNum));
        },
        complete: function() {
          $this.text(this.countNum);
        }
      });
  });

  $(window).on("scroll", function() {
    if($(window).scrollTop() > 100) {
      $(".header").addClass("active");
    } else {
      //remove the background property so it comes transparent again (defined in your css)
      $(".header").removeClass("active");
    }
  });

});
