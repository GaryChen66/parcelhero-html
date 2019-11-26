var service_item = $('.service-item'),
	fastest_time = 19,
	drop_off_cost = 3.07,
	collection_cost = 2.55,
	fastest_cost = 6.85,
	printer_cost = 3.56;

var filterDay;

/* Choose date button check on active */

$('.choose-date').find('[data-action=collect-today]').click(function () {

	if ($(this).find('input').is(':checked')) {
		$(this).find('input').removeAttr('checked');
	} else {
		$(this).find('input').attr('checked', true);
	}
});

/* Found sizes button */

/* Filter button and active all service items */

$(".filter-buttons button").on("click", function (e) {

	$(".filter-buttons button").removeClass("active");
	$(this).toggleClass("active");

	$(service_item).show();

	if ($('[data-action=collect-today]').find('input').is(':checked')) {
		$('[data-action=collect-today]').find('input').removeAttr('checked');
		$('[data-action=collect-today]').removeClass('active');
	}
});

/* Collection today button toggle */

$("[data-action=collect-today]").on("click", function (e) {
	var $btn = $(this);
	$btn.toggleClass("active");

	$(service_item).each(function () {
		if($btn.hasClass("active")) {
			if (!$(this).hasClass('collect')) {
				$(this).css({ 'display': 'none' });
			}
		}else{
			if (!$(this).hasClass('collect')) {
				var cur_day = $(this).find('.day').text().substring(0, 3);

				if(cur_day == filterDay) {
					console.log(filterDay);
					$(this).css({ 'display': 'block' });
				}
			}
		}
	});

});

/* Collection date toggle */

$(".collection-date-block").on("click", function (e) {

	$('.collection-date-block').removeClass('active');
	$(this).toggleClass("active");

	filterDay = $(this).find('.date-week').text().substring(0, 3);
	var dayfull = $(this).find('.date-week').text();
	var monthDay = $(this).find('.date-day').text();

	$(service_item).each(function () {
		var check_day = $(this).find('.day').text().substring(0, 3);

		if (filterDay == check_day) {
			$(this).css({ 'display': 'block' });
		}
		else {
			$(this).css({ 'display': 'none' });
		}
	});

	$('.choose-collection').fadeOut();

	var $btn = $("[data-action='collection-date']");

	$btn.addClass("active");
	$btn.find('span').text("Collect "+dayfull+", "+monthDay+"nd July");

});

$("[data-action='collection-date']").find(".btn-close").on("click", function(){
	$(this).parent().removeClass("active");
	$(this).parent().find("span").text("Choose collection date");
	$(".collection-date-block").removeClass("active");

	$(service_item).each(function () {
			$(this).css({ 'display': 'block' });
	});

	filterDay = '';
	$('.choose-collection').fadeOut();

});


/////////////////////////////////////////////////////

/* Filter Buttons */


$("#all").on("click", function (e) {
	$('.choose-date').css({ 'display': 'none' });
	$('.drop-postcode').css({ 'display': 'none' });
});

$("#collection").on("click", function (e) {
	$('.choose-date').css({ 'display': 'block' });
	$('.drop-postcode').css({ 'display': 'none' });

	$(service_item).each(function () {
		if ($(this).find(".ship-cost").text() >= collection_cost) {
			$(this).css({ 'display': 'block' });
		}
		else {
			$(this).css({ 'display': 'none' });
		}

	});
});

$("#drop-off").on("click", function (e) {
	$('.drop-postcode').css({ 'display': 'block' });
	$('.choose-date').css({ 'display': 'none' });

	$(service_item).each(function () {
		if ($(this).hasClass('drop') && $(this).find(".ship-cost").text() >= drop_off_cost) {
			$(this).css({ 'display': 'block' });
		}
		else {
			$(this).css({ 'display': 'none' });
		}

	});

});


$("#fastest").on("click", function (e) {
	$('.choose-date').css({ 'display': 'block' });
	$('.drop-postcode').css({ 'display': 'none' });

	$(service_item).each(function () {
		if ($(this).find(".ship-cost").text() >= fastest_cost) {
			$(this).css({ 'display': 'block' });
		}
		else {
			$(this).css({ 'display': 'none' });
		}

	});
});

$("#no-printer").on("click", function (e) {
	$('.choose-date').css({ 'display': 'block' });
	$('.drop-postcode').css({ 'display': 'none' });

	$(service_item).each(function () {
		if ($(this).hasClass('printer-not') && $(this).find(".ship-cost").text() >= printer_cost) {
			$(this).css({ 'display': 'block' });
		}
		else {
			$(this).css({ 'display': 'none' });
		}

	});


});

////////////////////////////////////////////////////////