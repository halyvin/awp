$(document).ready(function(){

  if ($("#tasks-manager").length) {

    var rfm = $("#request-form");

    var requestPopup = $.popapilus({
      css_class: 'request-popapilus',
      fixed: false,
      top: 40
    });
    requestPopup.setData($("#request-form-holder").removeClass("template").remove());

    var dayDefault = $("#request_day").val();
    var timeDefault = $("#request_time").val();

    function prepareRequestForm( data ) {
      data = data || {};
      $("#request_id").val(data.id || "");
      $("#request_body").val(data.body || "");
      $("#request_client_id").val(data.client_id || "");
      $("#request_day").val(data.day || dayDefault);
      $("#request_time").val(data.time || timeDefault);

      // Workers
      rfm.find(".workers_select input:checked").removeAttr('checked');
      if (data.workers) {
        for (var i = 0; i < data.workers.length; i++) {
          rfm.find("#mpc" + data.workers[i][1]).attr('checked', 'checked');
        }
        rfm.find(".workers_select input:checked:last").trigger('change');
      }
      else {
        $("#request_worker_ids").val("");
        rfm.find(".selected_workers_area").empty();
      }
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



    //// Workers form set
    rfm.find(".workers_select input").change(function() {
      var selecteted = rfm.find(".selected_workers_area");
      selecteted.empty();
      var wrkIds = [];
      rfm.find(".workers_select input:checked").each(function(indx, elm) {
        var wrlbl = $(this).next();
        selecteted.append('<li class="selected_worker">' + wrlbl.text() + '</li>');
        wrkIds.push(wrlbl.attr("data-id"));
      });
      $("#request_worker_ids").val(wrkIds);
    });

    // $('.creat_task_btn').on('click', function(){
    //   $('.create_task').toggle();
    // })
    // $('.control_icon.edit').on('click', function(){
    //   $('.edit_task').toggle();
    // })
    // $('.control_icon.complete').on('click', function(){
    //   $('.complete_task').toggle();
    // })

    // function removeTask(){
    //   $('.control_icon.delete').on('click', function(){
    //     $('.delete_task').show();
    //     var tridx = $(this).closest($('tr')).index();
    //     removeButton(tridx);
    //   })
    //   function removeButton(tridx){
    //     $('.button.delete').on('click', function(){
    //       $('.actual_tasks__tbody tr:eq('+tridx+')').remove();
    //       $('.delete_task').hide();
    //     })
    //   }
    // }
    // removeTask();

    // $('.popup .button.cancel').on('click', function(){
    //   $(this).closest('.popup').toggle();
    // })
  }
});