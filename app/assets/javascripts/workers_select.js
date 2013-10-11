$(document).ready(function() {
  function saveWorkersSelectData(wrkSel) {
    var wrkIds = [];
    wrkSel.find("input[checked]").each(function(indx, elm) {
      wrkIds.push($(this).next().attr("data-id"));
    });
    var select = $("#" + wrkSel.attr("data-select-id"));
    select.children("option[selected]").removeAttr("selected");
    select.val(wrkIds);
  }

  $('.workers_select').on('click', function(event){
    $(this).toggleClass('open');
    $('.workers_list').click(function(event){event.stopPropagation()});
    if (!$(this).hasClass('open')) {
      saveWorkersSelectData($(this));
      $("#" + $(this).attr("data-select-id")).trigger('change');
    }
  });

  $(".workers_select input").change(function() {
    saveWorkersSelectData($(this).closest(".workers_select"));
  });

  $("#filter_worker_ids").change(function() {
    $(this).closest("form").submit();
  });
}):