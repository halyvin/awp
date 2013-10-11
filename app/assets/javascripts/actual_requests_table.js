$(document).ready(function(){

  //// Check all boxes in the table
  $('.checkall').on('click', function(){
    if($(this).is(':checked')) $('.actual_tasks__tbody input').not(':checked').click();
    else $('.actual_tasks__tbody input:checked').click();
  });
  
  //// Print page opening
  $("#print_tasks_btn").click(function(evnt) {
    evnt.preventDefault();
    checkedRequestsIDs = [];
    $("#tasks-manager tbody tr input:checked").each(function(indx, elmnt) {
      checkedRequestsIDs.push($(this).closest('tr').attr('data-request-id'));
    });
    if (checkedRequestsIDs.length) {
      window.location = $(this).attr('href') + "?rsts=" + checkedRequestsIDs.join(",");
    }
    return false;
  });

});