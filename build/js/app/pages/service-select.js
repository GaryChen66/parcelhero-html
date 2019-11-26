$(function() {
  events();
  touchScroll();
});

function touchScroll (){
  var viewer = new TouchScroll();
  viewer.init({
      id: 'carriers-viewer',
      draggable: true,
      wait: false
  });
}

function events() {
  var infoBtn = $('.more-info'),
    dropBtn = $('.view-drop-btn'),
    optionsList = $('.options-list'),
    collection = $('.choose-collection'),
    carierMore = $('.carier-window-more');

  $(infoBtn).on('click', function () {
    modalOpen("#modal-hermes");
  });

  $(carierMore).on('click', function () {
    modalOpen("#modal-hermes");
  });

  $(dropBtn).on('click', function () {
    modalOpen("#modal-map");
  });

  /* On click shipment button toggle options-list */

  $("[data-action=shipment]").on("click", function (e) {
    $(optionsList).slideToggle();
  });

  /* Modal map carries block toggle activity */

  $(".map-carriers-block").on("click", function (e) {
    $(".map-carriers-block").removeClass("active");
    $(this).toggleClass("active");
  });

  /* Collection date button check on display: none and toggle */

  $("[data-action=collection-date]").on("click", function (e) {
    if(!$(e.target).hasClass("btn-close")){
      $(collection).toggle();
    }
  });

  /* Close button */

  $(".close-choose-btn").on("click", function (e) {
    $('.choose-collection').toggle();
  });

  $("[data-action=postal]").on("input", function(){
    if($(this).val().length > 3) {
      $("[data-action=view-drop]").addClass("active");
    }else{
      $("[data-action=view-drop]").removeClass("active");
    }
  })
}
