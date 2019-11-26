var first_desc = $('.first-description'),
    second_desc = $('.second-description'),
    third_desc = $('.third-description'),
    fourth_desc = $('.fourth-description');

/* Descriptions toggle */

$(".first-upgrade").on("click", function(e) {
       $(first_desc).slideToggle();
});

$(".second-upgrade").on("click", function(e) {
	     $(second_desc).slideToggle();
});

$(".third-upgrade").on("click", function(e) {
	     $(third_desc).slideToggle();
});

$(".fourth-upgrade").on("click", function(e) {
	     $(fourth_desc).slideToggle();
});
