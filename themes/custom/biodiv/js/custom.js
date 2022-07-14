/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

  'use strict';

  Drupal.behaviors.biodiv = {
    attach: function(context, settings) {

      // Custom code here

    }
  };

  $(document).ready(function() {
    $('.slider .field--name-field-video-card-slide.field__items').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      accessibility: true,
      prevArrow: $('.video-cards-prev'),
      nextArrow: $('.video-cards-next'),
    });

    $('.slider-cards .field--name-field-card-slide.field__items').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      accessibility: true,
      prevArrow: $('.slider-cards-prev'),
      nextArrow: $('.slider-cards-next'),
    });

    $('.gallery-items').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      accessibility: true,
      prevArrow: $('.gallery-prev'),
      nextArrow: $('.gallery-next'),
    });

    $('.slider-quotes .field--name-field-quote-slide').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: 0,
      accessibility: true,
      arrows: false,
      dots: true
    });
  });

  function isInViewport(node) {
    var rect = node.getBoundingClientRect()
    return (
        (rect.height > 0 || rect.width > 0) &&
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  $(window).scroll(function() {
    var scrolled = $(window).scrollTop()
    $('.show-parallax').each(function(index, element) {
      var initY = $(this).offset().top
      var height = $(this).height()
      var endY  = initY + $(this).height()

      // Check if the element is in the viewport.
      var visible = isInViewport(this)
      if(visible) {
        var diff = scrolled - initY
        var ratio = Math.round((diff / height) * 100)
        $(this).css('background-position','center ' + parseInt(-(ratio * 1.5)) + 'px')
      }
    })
  })

  // Iframe reformat youtube link to embed link
  $('.c-iframe').each(function(){
    var ytUrl = $(this).attr('src',);
    var ytEmbedUrl = ytUrl.replace('/watch?v=', '/embed/');
    $(this).attr('src', ytEmbedUrl);
  });

  var iframeSrc = '';
  var vidUrl = '';
  var vidoEmbedUrl = '';

  if( $('.paragraph--type--slider-video-cards').length ) {
    $('.paragraph--type--slider-video-cards .modal .modal-body').append("<iframe src=''></iframe>");
  }

  $('.paragraph--type--slider-video-card-item button').click(function() {
    iframeSrc = $(this).find('.iframe-src').attr('data-iframe');

    vidUrl = iframeSrc;
    vidoEmbedUrl = vidUrl.replace('/watch?v=', '/embed/');

    //console.log(vidoEmbedUrl);
    $('.paragraph--type--slider-video-cards .modal .modal-body iframe').attr('src', vidoEmbedUrl);
  });


  $('#modal-slider-iframe').on('hidden.bs.modal', function (e) {
    //console.log('Modal closed');
    $('.paragraph--type--slider-video-cards .modal .modal-body iframe').attr('src', '');
  })

})(jQuery, Drupal);
