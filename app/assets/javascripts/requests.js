$(document).ready(function(){

  if ($("#tasks-manager").length) {

    //// Check all boxes in the table
    $('.checkall').on('click', function(){
      if($(this).is(':checked')) $('.actual_tasks__tbody input').not(':checked').click();
      else $('.actual_tasks__tbody input:checked').click();
    });

    function getCheckedRequestsIDs() {
      checkedRequestsIDs = [];
      $("#tasks-manager tbody tr input:checked").each(function(indx, elmnt) {
        checkedRequestsIDs.push($(this).closest('tr').attr('data-request-id'));
      });
      return checkedRequestsIDs;
    }

    //// Print page opening
    $("#print_tasks_btn").click(function(evnt) {
      evnt.preventDefault();
      var chkids = getCheckedRequestsIDs();
      if (chkids.length) {
        window.location = $(this).attr('href') + "?rsts=" + chkids.join(",");
      }
      return false;
    });

    //// Bunch workers assign
    // TODO make setting workers list before opening
    $("#mltpl_workers_select").workers_select({
      beforeSelectOpen: function() {
        var allWorkersIds = [];
        $("#tasks-manager tbody tr input:checked").each(function(indx, elmnt) {
          var reqwrkrs = $(this).closest('tr').attr('data-worker-ids').split(",");
          for (var i = 0; i < reqwrkrs.length; i++) {
            if ( allWorkersIds.indexOf( reqwrkrs[i] ) < 0 ) {
              allWorkersIds.push( reqwrkrs[i] );
            }
          }
        });
        $("#addons_worker_ids").val( allWorkersIds );
        this.update();
      },
      afterSelectClose: function() {
        var listofchecked = this.listOfChecked();
        var chkids = getCheckedRequestsIDs();
        if ( listofchecked.length || chkids.length ) {
          var chkwrks = [];
          for (var i = 0; i < listofchecked.length; i++)
            { chkwrks.push( listofchecked[i][1] ); }
          window.location = window.location.protocol + "//" +
                            window.location.host +
                            "/requests/assign-workers" +
                            "?rsts=" + chkids.join(",") +
                            "&wrks=" + chkwrks.join(",");
        }
      }
    });


    ////// REQUEST FORM (CREATE AND EDIT)
    var requestPopup = $.popapilus({
      css_class: 'request-popapilus',
      fixed: false,
      top: 40
    });
    requestPopup.setData($("#request-form-holder").removeClass("template").remove());

    var rfm = $("#request-form");

    rfm.find("#request_day").datepicker($.extend({}, datapicker_defaults, {
      minDate: 0,
      maxDate: "+1Y"
    }));

    var workerslist = rfm.find(".workers_select");
    workerslist.workers_select({
      onSelectChange: function() {
        var listofchecked = this.listOfChecked();
        var selecteted = rfm.find(".selected_workers_area");
        selecteted.empty();
        for (var i = 0; i < listofchecked.length; i++) {
          selecteted.append('<li class="selected_worker">' + listofchecked[i][0] + '</li>');
        }
      }
    });

    var dayDefault = $("#request_day").val();
    var timeDefault = $("#request_time").val();
    function prepareRequestForm( data ) {
      data = data || {};

      var titleText = "Создать заявку";
      if (data.id) { titleText = "Редактировать заявку"; }
      $("#request-form-holder .popup_title").text(titleText);

      $("#request_id").val(data.id || "");
      $("#request_body").val(data.body || "");
      $("#request_client_id").val(data.client_id || "");
      $("#request_day").val(data.day || dayDefault);
      $("#request_time").val(data.time || timeDefault);

      if (data.workers) {
        var wrkrsIDs = [];
        for (var i = 0; i < data.workers.length; i++) {
          wrkrsIDs.push(data.workers[i][1]);
        }
        $("#request_worker_ids").val(wrkrsIDs);
        workerslist.workers_select("update");
      }
      else { workerslist.workers_select("clear"); }
      workerslist.workers_select("close");
    }
    
    //// Open Create form
    $("#creat_task_btn").click(function(evnt){
      evnt.preventDefault();
      prepareRequestForm();
      requestPopup.show();
      return false;
    });

    //// Open Edit form
    $('#tasks-manager .control_icon.edit').on('click', function(evnt){
      evnt.preventDefault();
      var rid = $(this).parent().parent().attr("data-request-id");
      requestPopup.showOverlay();

      $.ajax({
        dataType: "json",
        url: ( "/requests/" + rid + ".json" ),
        type: "GET",
        error: function( jqXHR, textStatus, errorThrown ) {
          requestPopup.hide();
        },
        success: function( data, textStatus, jqXHR ) {
          prepareRequestForm(data);
          requestPopup.show();
        }
      });
      return false;
    })


    //// Save request
    rfm.submit(function(evnt){
      evnt.preventDefault();

      var frmRequestID = $("#request_id").val();
      var thisIsCreate = frmRequestID === "";

      var frmData = {
        "body": $("#request_body").val(),
        "client_id": $("#request_client_id").val(),
        "day": $("#request_day").val(),
        "time": $("#request_time").val(),
        "worker_ids": $("#request_worker_ids").val()
      };

      var aUrl = "/requests";
      var aMethod = "POST";

      if (thisIsCreate) { aUrl += ".json"; }
      else {
        aUrl += "/" + frmRequestID.toString() + ".json";
        aMethod = "PUT";
      }

      $.ajax({
        dataType: "json",
        url: aUrl,
        data: { "request": frmData },
        type: aMethod,
        error: function( jqXHR, textStatus, errorThrown ) {
          location.reload();
        },
        success: function( data, textStatus, jqXHR ) {
          location.reload();
        }
      });

      return false;
    });


    ////// DELETE REQUEST FORM
    var deleteRequestPopup = $.popapilus({
      css_class: 'delete-request-popapilus'
    });
    deleteRequestPopup.setData($("#delete-request-holder").removeClass("template").remove());
    
    //// Open Create form
    $('#tasks-manager .control_icon.delete').on('click', function(evnt){
      evnt.preventDefault();
      var rid = $(this).parent().parent().attr("data-request-id");
      $("#delete-request-holder .place-for-id").text(rid);
      $("#delete_request_id").val(rid);
      deleteRequestPopup.show();
      return false;
    });

    //// Form submit
    $("#request-delete-form").submit(function(evnt) {
      evnt.preventDefault();
      var rid = $("#delete_request_id").val();

      $.ajax({
        dataType: "json",
        url: ( "/requests/" + rid + ".json" ),
        type: "DELETE",
        error: function( jqXHR, textStatus, errorThrown ) {
          location.reload();
        },
        success: function( data, textStatus, jqXHR ) {
          location.reload();
        }
      });
      return false;
    });


    ////// COMPLETE REQUEST FORM
    var completeRequestPopup = $.popapilus({
      css_class: 'complete-request-popapilus'
    });
    completeRequestPopup.setData($("#complete-request-holder").removeClass("template").remove());
    
    //// Open Create form
    $('#tasks-manager .control_icon.complete').on('click', function(evnt){
      evnt.preventDefault();
      var rid = $(this).parent().parent().attr("data-request-id");
      $("#complete-request-holder .place-for-id").text(rid);
      $("#complete_request_id").val(rid);
      $("#request_close_reason").val("");
      completeRequestPopup.show();
      return false;
    });

    //// Form submit
    $("#request-complete-form").submit(function(evnt) {
      evnt.preventDefault();
      var rid = $("#complete_request_id").val();

      $.ajax({
        dataType: "json",
        url: ( "/requests/" + rid + "/complete.json" ),
        type: "PUT",
        data: { "request": { "close_reason": $("#request_close_reason").val() } },
        error: function( jqXHR, textStatus, errorThrown ) {
          location.reload();
        },
        success: function( data, textStatus, jqXHR ) {
          location.reload();
        }
      });
      return false;
    });
  }
});