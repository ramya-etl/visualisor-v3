$(document).ready(function() {

	//icon-1a:
	$('.click-1a').click(function() {
		$('.to-close-1a, .info-1a-panel').toggle(1000);
	});
	$('.to-close-1a').click(function() {
		$('.to-close-1a, .info-1a-panel').css('display', 'none');
	});

	//icon-1b:
	$('.click-1b').click(function() {
		$('.to-close-1b, .info-1b-panel').toggle(1000);
	});
	$('.info-1b-panel .to-close-1b').click(function() {
		$('.to-close-1b, .info-1b-panel').css('display', 'none');
	});

	//icon-2a:
	$('.click-2a').click(function() {
		$('.to-close-2a, .info-2a-panel').toggle(1000);
	});
	$('.to-close-2a').click(function() {
		$('.to-close-2a, .info-2a-panel').css('display', 'none');
	});

	//icon 2b:
	$('.click-2b').click(function() {
		$('.to-close-2b, .info-2b-panel').toggle(1000);
	});
	$('.info-2b-panel .to-close-2b').click(function() {
		$('.to-close-2b, .info-2b-panel').css('display', 'none');
	});

	//icon-3a:
	$('.click-3a').click(function() {
		$('.to-close-3a, .info-3a-panel').toggle(1000);
	});
	$('.to-close-3a').click(function() {
		$('.to-close-3a, .info-3a-panel').css('display', 'none');
	});

	//icon-3b:
	$('.click-3b').click(function() {
		$('.to-close-3b, .info-3b-panel').toggle(1000);
	});
	$('.to-close-3b').click(function() {
		$('.to-close-3b, .info-3b-panel').css('display', 'none');
	});

	//icon-4a:
	$('.click-4a').click(function() {
		$('.to-close-4a, .info-4a-panel').toggle(1000);
	});
	$('.to-close-4a').click(function() {
		$('.to-close-4a, .info-4a-panel').css('display', 'none');
	});

	//icon-4b:
	$('.click-4b').click(function() {
		$('.to-close-4b, .info-4b-panel').toggle(1000);
	});
	$('.to-close-4b').click(function() {
		$('.to-close-4b, .info-4b-panel').css('display', 'none');
	});

	//To toggle the icons in the selection pan:
	$('.dropdown-icons').click(function() {
		$('.dropdown-list-grp').slideToggle(1000);
		$(this).find('i').toggleClass('fa-arrow-up fa-arrow-down');
	});
	// $('i.fa-arrow-down').active(function() {
	// 	$(this).addClass('.dropdown-icons');
	// }, function() {
	// 	$(this).removeClass('.dropdown-icons');
	// });

	//Active class for the buttons:
	$('button.btn-default').on('click', function() {
		$(this).parent().find('button.active').removeClass('active');
		$(this).addClass('active');
	});

	//Active dataset-button:
	$('div.datasets-picker input').on('click', function() {
		$(this).parent().find('input.btn-default').removeClass('active');
		$(this).addClass('active');
	});
	
	//For the Main menu in Visualisor (Heatmap | Apps | Personnel | Reports):
	$('#filters button').on('click', function() {
		$(this).parent().find('button.active').removeClass('active');
		$(this).addClass('active');
	});
});
