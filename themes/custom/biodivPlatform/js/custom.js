/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

  'use strict';

  Drupal.behaviors.biodivPlatform = {
    attach: function(context, settings) {

      // Custom code here

    }
  };

  $(document).ready(function() {

    $(".toggle-dashboard-menu").click(function(e) {
      e.preventDefault();
      $(".menu-dashboard").toggleClass("active");
      $("body").toggleClass("menu-active");
    });

    // Dashboard page
    if($('.page-node-16').length) {
      // Show modal on dashboard page with use of cookies
      var modalDashboard = new bootstrap.Modal(document.getElementById("exampleModal"));
      /* modalDashboard.show();*/

      // ajax call to check if tutorial modal has to show
      // get id of logged in user
      const id = $("#page-wrapper").data("user-id");
      var hasLogged = 0;
      $.ajax({
        type: "GET",
        async: false,
        url: '/api/newlogin?_format=json&id=' + id,
        contentType: 'application/json',
        success: function (response) {
          if (response == 1 || response == 0) {
            hasLogged = response;
          } else {
            console.log(response);
          }
        },
      });

      $('.modal-slider').hide();

      if (!hasLogged) {
        modalDashboard.show();
      }

      $('#exampleModal .btn-close, #exampleModal .close').click(function () {
        modalDashboard.hide();
      });

      document.getElementById("exampleModal").addEventListener('shown.bs.modal', function (event) {
        /*console.log('let it slide');*/
        $('.modal-slider .field--name-field-modal-slide.field__items').slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          accessibility: true,
          /*prevArrow: $('.modal-slider-prev'),*/
          nextArrow: $('.modal-slider-next'),
          dots: true
        });

        // Show close button when last slide is active
        var slideAmount = $(".modal-slider .field--name-field-modal-slide.field__items").slick("getSlick").slideCount-1;

        $('.modal-slider .field--name-field-modal-slide.field__items').on('afterChange', function(event, slick, currentSlide){
          if(currentSlide === slideAmount ) {
            $('.modal-slider-next').hide();
            $('.modal-slider-final').show();
          } else {
            $('.modal-slider-final').hide();
            $('.modal-slider-next').show();
          }
        });

        $('.modal-slider').show();
      });
    }

    // My profile page
    if($('.page-node-19').length) {

      // Fill in all school fields for the chosen school in the modal school edit
      $('.btn-profile-school-edit').click(function () {
        var schoolName = $(this).attr("data-name");
        var schoolStreet = $(this).attr("data-street");
        var schoolPostal = $(this).attr("data-postal");
        var schoolCity = $(this).attr("data-city");
        $('#modal-my-profile-school-edit #school-name').val(schoolName);
        $('#modal-my-profile-school-edit #school-street').val(schoolStreet);
        $('#modal-my-profile-school-edit #school-postal').val(schoolPostal);
        $('#modal-my-profile-school-edit #school-city').val(schoolCity);
      });
    }

    // Set cookie for course module with the id of the course as it's content
    var arrCourses = [];
    var courseId = '';
    if($('.node--type-course-module').length) {

      courseId = $('.node--type-course-module').find('#page-wrapper').attr("date-node-id");
      arrCourses.push(courseId);
      console.log(arrCourses);

      if (Cookies.get('coursesVisited') === undefined || Cookies.get('coursesVisited') === '') {
        Cookies.set('coursesVisited', arrCourses);
      }
    }

    // Trigger toasts
    function showToast(bntEl, toastEl) {
      const toastTrigger = document.getElementById(bntEl);
      const toastMessage = document.getElementById(toastEl);
      const toastTriggerText = document.getElementById(bntEl).getAttribute('data-toast-message');
      console.log(toastTriggerText);
      if (toastTrigger) {
        toastTrigger.addEventListener('click', () => {
          const toast = new bootstrap.Toast(toastMessage);
          toast.show();
          $(toastMessage).find('.toast-body').text(toastTriggerText);
        })
      }
    }

    showToast('user-save', 'toast-settings');
    showToast('school-save', 'toast-settings');
    showToast('school-delete', 'toast-settings');


  });

})(jQuery, Drupal);
