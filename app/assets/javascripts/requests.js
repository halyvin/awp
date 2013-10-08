$(document).ready(function(){

  if ($("#tasks-manager").length) {

    $('.creat_task_btn').on('click', function(){
      $('.create_task').toggle();
    })
    $('.control_icon.edit').on('click', function(){
      $('.edit_task').toggle();
    })
    $('.control_icon.complete').on('click', function(){
      $('.complete_task').toggle();
    })

    function removeTask(){
      $('.control_icon.delete').on('click', function(){
        $('.delete_task').show();
        var tridx = $(this).closest($('tr')).index();
        removeButton(tridx);
      })
      function removeButton(tridx){
        $('.button.delete').on('click', function(){
          $('.actual_tasks__tbody tr:eq('+tridx+')').remove();
          $('.delete_task').hide();
        })
      }
    }
    removeTask();

    $('.popup .button.cancel').on('click', function(){
      $(this).closest('.popup').toggle();
    })
  }
});