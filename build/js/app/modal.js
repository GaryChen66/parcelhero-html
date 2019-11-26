// Open modal

var close = $('.close-btn');

$(close).on('click', function() {
  modalClose($(this).closest(".modal-custom"));
});

function modalOpen(id){
  $(id).addClass("active");
}

function modalClose(elm){
  $(elm).removeClass("active");
}

// Close modal

$('.modal').click(function() {
  var select = $('.modal-custom-content');
  if ($(event.target).closest(select).length)
    return;
  modalClose($(this).closest(".modal-custom"));
});