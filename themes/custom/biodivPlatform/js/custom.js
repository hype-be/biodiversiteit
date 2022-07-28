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

  $(".toggle-dashboard-menu").click(function(e) {
    e.preventDefault();
    $(".menu-dashboard").toggleClass("active");
    $("body").toggleClass("menu-active");
  });

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

  if (!hasLogged) {
    modalDashboard.show();
  }

  $('#exampleModal .btn-close, #exampleModal .close').click(function () {
    modalDashboard.hide();
  });


})(jQuery, Drupal);
