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

    function prepareRequestForm( data ) {
      $("#request_id").val("");
      $("#request_body").val("");
      $("#request_client_id").val("");
      $("#request_day").val(dayDefault);
    }
    
    $("#creat_task_btn").click(function(evnt){
      evnt.preventDefault();
      prepareRequestForm();
      requestPopup.show();
      return false;
    });


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