$(document).ready(function(){
	
	// show current date and time on the header
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


	// // Selecting workers from table rows

	// var workersStack = [];
	// function workersStackCheker(){
	// 	workersStack = [];
	// 	var workerscells = $('.actual_tasks__tbody tr.checked .actual_tasks__worker_item');
	// 	$(workerscells).each(function(){workersStack.push($(this).attr('data-id'))});
	// 	workersStack = $.unique(workersStack);
	// }

	// $('.actual_tasks__tbody input').on('click', function(){
	// 	$(this).closest('tr').toggleClass('checked');
	// 	workersStackCheker();
	// 	// workersSelectChecker();
	// });
	$('.workers_select').on('click', function(event){
		$(this).toggleClass('open');
		$('.workers_list').click(function(event){event.stopPropagation()});
		// workersSelectChecker();
	});
	// // $('.workers_select li label').on('click', function(event){
	// // 	var workerscells = $('.actual_tasks__tbody tr.checked .actual_tasks__worker_list');
	// // 	var label = $(this);
	// // 	var input = $(this).closest('li').find('input');
	// // 	if (!input.is(':checked')) {
	// // 		workerscells.find('li').each(function(){
	// // 			if ($(this).attr('data-id'))
	// // 		})
	// // 	}
	// // 	else {

	// // 	}
	// // };


	// function workersSelectChecker(){
	// 	// $('.workers_select input').attr('checked', false)
	// 	$('.workers_select input').removeAttr('checked')
	// 	for (var i = 0; i < workersStack.length; i++) {
	// 		var id = workersStack[i];
	// 		$('.workers_select label').each(function(){
	// 			console.log(id)
	// 			if ($(this).attr('data-id')==id) {
	// 				$(this).closest('li').find('input').attr('checked', true);
	// 			}
	// 		})
	// 	};	
	// 	console.log(workersStack)	
	// };
	// // workersSelectChecker();


		// $('.workers_select').on('click', function(event){
		// 	$(this).toggleClass('open');
		// 	var checkedRows = $('.actual_tasks__tbody tr.checked');
		// 	$(this).find($('.workers_list')).toggle();
		// 	$(this).toggleClass('open');
		// 	$('.workers_list').click(function(event){event.stopPropagation()});
		// 	$('.workers_select label').each(function(){
		// 		var label = $(this);
		// 		var labelID = $(this).attr('data-id');
		// 		for (var i = 0; i < workersStack.length; i++) {
		// 			if (workersStack[i]==labelID) {
		// 				label.closest('li').find('input').attr('checked', true)
		// 			}
		// 		};
		// 		console.log(workersStack)
		// 	});
		// 	if (!$(this).hasClass('open')) $(this).find('input').attr('checked', false)

		// });

		// var workersListItem = $('.workers_list .worker label');

		// workersListItem.on('click', function(){
		// 	var workerName = $(this).closest('li').text();
		// 	var checkedRows = $('.actual_tasks__tbody tr.checked');
		// 	var workerID = $(this).attr('data-id');
		// 	var workerName = $(this).text();

		// 	if ($(this).closest('li').find('input').is(':checked')) {
		// 		$(checkedRows).find('.actual_tasks__worker_item').each(function(){
		// 			if($(this).attr('data-id')==workerID) $(this).remove();
		// 		})
		// 	}
		// 	else {
		// 		$(checkedRows)
		// 		.find('.actual_tasks__worker_list')
		// 		.append('<li class="actual_tasks__worker_item" data-id="'+workerID+'">, '+workerName+'</li>')
		// 	}
		


	$('.checkall').on('click', function(){
		if($(this).is(':checked')) $('.actual_tasks__tbody input').not(':checked').click();
		else $('.actual_tasks__tbody input:checked').click();
	});
	





});