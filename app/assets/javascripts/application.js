// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require html5shiv
//= require jquery-2.0.3
//= require jquery_ujs
//= require jquery.popapilus
//= require main
//- don't require_tree .

$(document).ready(function() {

  if ($("#trms").length) {
    popapilus = $.popapilus({
      no_overlay: true,
      fixed: false,
      show_animation_speed: 800,
      autoclose_time: 4600
    });
    popapilus.show($("#trms").html());
  }

});
