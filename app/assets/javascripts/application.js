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
//= require workers_select
//= require requests
//= require actual_requests_table
//- don't require_tree .

$(document).ready(function() {

  //// Notices and alerts from rails app
  if ($("#trms").length) {
    popapilus = $.popapilus({
      no_overlay: true,
      fixed: false,
      show_animation_speed: 800,
      autoclose_time: 4600
    });
    popapilus.show($("#trms").html());
  }

  //// Show date and time in the header
  function dateView(){
    var curDate = new Date();
    var months = curDate.getMonth();
    var monthString = '';

    switch (months) {
      case 0: monthString = 'января'; break;
      case 1: monthString = 'февраля'; break;
      case 2: monthString = 'марта'; break;
      case 3: monthString = 'апреля'; break;
      case 4: monthString = 'мая'; break;
      case 5: monthString = 'июня'; break;
      case 6: monthString = 'июля'; break;
      case 7: monthString = 'августа'; break;
      case 8: monthString = 'сентября'; break;
      case 9: monthString = 'октября'; break;
      case 10: monthString = 'ноября'; break;
      case 11: monthString = 'декабря'; break;
    };

    var days = curDate.getDate();
    var hours = curDate.getHours();
    var minutes = curDate.getMinutes();
    var seconds = curDate.getSeconds();

    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;

    datestr = days + ' ' + monthString + ' ' + hours;
    datestr += ':'+minutes;

    $('.real_time').html(datestr);
  }
  setTimeout(dateView, 1000);

});
