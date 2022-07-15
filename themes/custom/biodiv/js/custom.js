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

  // Iframe reformat youtube url
  var ytUrl = '';
  var ytEmbedUrl = '';

  $('.iframe-container').each(function(){
    ytUrl = $(this).find('.iframe-src').attr('data-iframe');
    ytEmbedUrl = ytUrl.replace('/watch?v=', '/embed/');
    $(this).find('.iframe-src').attr('data-iframe', ytEmbedUrl);
    $(this).find('.c-iframe').attr('src', ytEmbedUrl);
  });

  // Modal paragraph video and text
  $('.paragraph--type--video-and-text button.toggle-modal').click(function() {
    $(this).parent().parent().parent().parent().addClass('active');
    var currentYtUrl = $(this).parent().parent().parent().parent().find('.modal-video-text .iframe-src').attr('data-iframe');
    console.log(currentYtUrl);
    $('.paragraph--type--video-and-text .modal .modal-body iframe').attr('src', currentYtUrl);
  });

  $('.modal-video-text').on('hidden.bs.modal', function (e) {
    $('.paragraph--type--slider-video-cards .slick-slide.bg-white-ice').removeClass('bg-white-ice');
    $('.modal-video-text .modal-body iframe').attr('src', '');
  })


  // Modal paragraph slider video cards
  var iframeSrc = '';
  var vidUrl = '';
  var vidoEmbedUrl = '';

  if( $('.paragraph--type--slider-video-cards').length ) {
    $('.paragraph--type--slider-video-cards .modal .modal-body').append("<div class='iframe-container'><iframe class='c-iframe' width='200' height='113' src=''></iframe></div>");
  }

  // Get iframe src from clicked card
  $('.paragraph--type--slider-video-card-item button').click(function() {
    // Add active class to current slick slide
    $(this).parent().parent().parent().parent().addClass('bg-white-ice');
    iframeSrc = $(this).find('.iframe-src').attr('data-iframe');
    // reformat youtube url
    vidUrl = iframeSrc;
    vidoEmbedUrl = vidUrl.replace('/watch?v=', '/embed/');
    $('.paragraph--type--slider-video-cards .modal .modal-body iframe').attr('src', vidoEmbedUrl);
  });

  // On modal close make iframe src empty so you don't see iframe src switching
  $('#modal-slider-iframe').on('hidden.bs.modal', function (e) {
    $('.paragraph--type--slider-video-cards .slick-slide.bg-white-ice').removeClass('bg-white-ice');
    $('.paragraph--type--slider-video-cards .modal .modal-body iframe').attr('src', '');
  })

})(jQuery, Drupal);
