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
  });

})(jQuery, Drupal);
