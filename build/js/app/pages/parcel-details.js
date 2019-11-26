var parcelContents = document.querySelector("#parcel-contents");
var saveButton = document.querySelector("#parcel-save");
var loginButton = document.querySelector("#parcel-login");
var parcelValue = document.querySelector("#parcel-value");
var parcelCost = document.querySelector("#parcel-cost");
var parcelCostIns = document.querySelector("#parcel-cost-ins");
var parcelVatIns = document.querySelector("#parcel-vat-ins");
var parcelShipingCost = document.querySelector("#parcel-shiping-cost");
var parcelShipingVat = document.querySelector("#parcel-shiping-vat");
var parcelShipingTotal = document.querySelector("#parcel-shiping-total");
var parcelFindAdress = document.querySelector("#parcel-find-adress");
var parcelFindAdressResult = document.querySelector("#parcel-find-adress-result");
var parcelFindDAdress = document.querySelector("#parcel-find-dadress");
var parcelFindDAdressResult = document.querySelector("#parcel-find-dadress-result");
var parcelCollectionSerachNew = document.querySelector("#parcel-collection-serach-new");
var parcelCollectionSerachNewD = document.querySelector("#parcel-collection-serach-new-d");

const changeCollectionDateBtn = document.querySelector("#change-collection-date");
const cancelChooseCollectionDateBtn = document.querySelector("#cancel-choose-collection-date");
const parcelChangeCollectionDate = document.querySelector("#parcel-change-collection-date");
const parcelChooseCollectionDate = document.querySelector("#parcel-choose-collection-date");
const setCollectionDateBtn = document.querySelector("#set-collection-date");
const saveCollectionDate = document.querySelector("#save-collection-date");

const dayBoxes = document.querySelectorAll(".day-box");
const timeBoxes = document.querySelectorAll(".time-box");

$(function () {
  init();
  events();
});

function init() {
  parcelContents.value ? saveButton.classList.remove("disabled") : saveButton.classList.add("disabled");
}

function events() {

  saveButton.addEventListener('click', function () {
    modalOpen("#modal-sign-in");
  });

  loginButton.addEventListener('click', function () {
    modalOpen("#modal-sign-in");
  });

  parcelCollectionSerachNew.addEventListener('click', function () {
    console.log(parcelFindAdressResult);

    parcelFindAdressResult.classList.add("d-none");
    parcelFindAdress.classList.remove("d-none");
  });

  parcelCollectionSerachNewD.addEventListener('click', function () {
    parcelFindDAdressResult.classList.add("d-none");
    parcelFindDAdress.classList.remove("d-none");
  });

  parcelContents.addEventListener("input", function (item) {
    item.target.value ? saveButton.classList.remove("disabled") : saveButton.classList.add("disabled");
  });

  parcelValue.addEventListener("input", function (item) {
    var value = Number(item.target.value.replace(/\D+/g, ""));
    var shiping = (value * config.vat * config.shipingCost).toFixed(2);

    if (value > 0) {
      parcelCost.classList.remove("d-none");
      parcelCostIns.innerHTML = value;
      parcelVatIns.innerHTML = (value * config.vat).toFixed(2);
      parcelShipingCost.innerHTML = shiping;
      parcelShipingVat.innerHTML = (shiping * config.vat).toFixed(2);
      parcelShipingTotal.innerHTML = Number((shiping * config.vat).toFixed(2)) + Number(shiping);
    } else {
      parcelCost.classList.add("d-none");
      parcelCostIns.innerHTML = '';
      parcelVatIns.innerHTML = '';
    }
  });

  changeCollectionDateBtn.addEventListener("click", function() {
    parcelChangeCollectionDate.classList.add("d-none");
    parcelChooseCollectionDate.classList.remove("d-none");
    saveCollectionDate.classList.add("d-none");
  });

  cancelChooseCollectionDateBtn.addEventListener("click", function() {
    parcelChangeCollectionDate.classList.remove("d-none");
    parcelChooseCollectionDate.classList.add("d-none");
    saveCollectionDate.classList.add("d-none");
  });

  setCollectionDateBtn.addEventListener("click", function(e) {
    e.preventDefault();

    parcelChangeCollectionDate.classList.remove("d-none");
    parcelChooseCollectionDate.classList.add("d-none");
    saveCollectionDate.classList.remove("d-none");
  })

  dayBoxes.forEach(function(dayBox){
    dayBox.addEventListener('click', function () {
      const activeDayBox = document.querySelector(".day-box.active");
      activeDayBox.classList.remove('active');
  
      dayBox.classList.add('active');
    });
  });
  
  timeBoxes.forEach(function(timeBox){
    timeBox.addEventListener('click', function () {
      const activeTimeBox = document.querySelector(".time-box.active");
      activeTimeBox.classList.remove('active');
  
      timeBox.classList.add('active');
    });
  });
  
}
