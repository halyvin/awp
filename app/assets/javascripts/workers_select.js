/*!
 *  Work with smooth select of workers builded as jQuery plugin
 */

(function ( $, document, window ) {

  // Plugin bridge
  $.fn.workers_select = function( options ) {
    var PLN_STRING = 'awp_workers_select';

    if ( typeof options === 'string' ) {   // try to call a public method
      var args = Array.prototype.slice.call(arguments, 1);
      var haveSeveralObjects = ( this.length > 1 );

      var retRnValue = null;
      if (haveSeveralObjects) { retRnValue = []; }

      this.each(function() {
        var instance = $.data( this, PLN_STRING );
        if ( !instance ) {
          logError( "Can't call method '" + options + "' before '" + PLN_STRING + "' initialization " );
          return;
        }
        if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
          logError( "No such method '" + options + "' for " + PLN_STRING + " instance" );
          return;
        }
        var answer = instance[options].apply(instance, args);
        if (haveSeveralObjects) { retRnValue.push(answer); }
                           else { retRnValue = answer; }
      });
      return retRnValue;
    }
    else {   // make a new instance
      var opts = $.extend( true, {}, $.fn.workers_select.defaults, options );
      return this.each(function() {
        var instance = new AWPWorkersSelect( $(this), opts );
        $.data( this, PLN_STRING, instance );
      });
    }
  }

  // Plugin defaults
  $.fn.workers_select.defaults = {
    beforeSelectOpen: null,
    onSelectChange: null,
    afterSelectClose: null
  };

  // Helpers
  var logError = function( message ) {
    if ( window.console ) { window.console.error( message ); }
  };

  //////                 //////
  ////// Main functional //////
  //////                 //////
  var AWPWorkersSelect = function( $elem, options ) {
    var self = this;
    var $hidedSelect = null;
    var hidedSelectVal = null;

    this.clear = function() {
      $elem.find("input:checked").prop("checked", false);
      if ($hidedSelect && $hidedSelect.val() !== null) { onDataChange(); }
    }

    this.update = function() {
      $elem.find("input:checked").prop("checked", false);
      if ($hidedSelect) {
        fillDataFromSelect();
        if (options.onSelectChange) { options.onSelectChange.call(self); }
      }
    }

    this.close = function() {
      closeList();
    }

    this.listOfChecked = function() {
      var answer = [];
      $elem.find("input:checked").each(function(indx, elm) {
        answer.push( [ $(this).next().text(), $(this).attr("data-id") ] );
      });
      return answer;
    }

    function rememberSelectVal() { hidedSelectVal = $hidedSelect.val(); }
    function isDifferencesWeHave() {
      var tval1, tval2;
      tval1 = hidedSelectVal;
      if (tval1 !== null) { tval1 = tval1.join(); }
      tval2 = $hidedSelect.val();
      if (tval2 !== null) { tval2 = tval2.join(); }
      return (tval1 !== tval2);
    }

    function onDataChange() {
      if ($hidedSelect) {
        var wrkIds = [];
        $elem.find("input:checked").each(function(indx, elm) {
          wrkIds.push($(this).attr("data-id"));
        });
        $hidedSelect.val(wrkIds);
        rememberSelectVal();
        if ($hidedSelect) { $hidedSelect.trigger('change'); }
      }
      if (options.onSelectChange) { options.onSelectChange.call(self); }
    }

    function openList() {
      if (options.beforeSelectOpen) { options.beforeSelectOpen.call(self); }
      $elem.addClass('open');
    }
    function closeList() {
      $elem.removeClass('open');
      if (isDifferencesWeHave()) { onDataChange(); }
      if (options.afterSelectClose) { options.afterSelectClose.call(self); }
    }
    function toggleList() {
      if ($elem.hasClass('open')) { closeList(); }
                             else { openList(); }
    }

    function fillDataFromSelect() {
      var selsvals;
      if (selsvals = $hidedSelect.val()) {
        $elem.find(".workers_list .worker input").each(function(indx, elmnt) {
          $this = $(this);
          if (selsvals.indexOf($this.attr("data-id")) > -1) {
            $this.prop('checked', true);
          }
        });
        rememberSelectVal();
      }
    }

    function _init() {
      $hidedSelect = $("#" + $elem.attr("data-select-id"));
      if ($hidedSelect.length < 1) { $hidedSelect = null; }

      if ($hidedSelect) { fillDataFromSelect(); }

      $elem.on('click', function(evnt) {
        evnt.preventDefault();
        toggleList();
        return false;
      });

      $elem.find('.workers_list').click(function(evnt) {
        evnt.stopPropagation();
      });

      $elem.find("input").change(onDataChange);
    }

    // rock'n'roll
    _init();
  }

}( jQuery, document, window ));