$(function () {
  detailList();
  tooltips();
  selectControl();
  initMaterialUI();
  tables();
  searchInputs();
  insurance();

  if($('.datepicker').length) {
    $('.datepicker').flatpickr();
  }
});

function insurance(){
  var insurances = document.querySelectorAll(".insurance-item");

  insurances.forEach(function(insurance){
    insurance.addEventListener("click", function(){
      var ins = insurance.querySelector("input[type=radio]");

      if(ins.checked) {
        insurance.closest(".insurance-variants").querySelectorAll(".insurance-item").forEach(function(item){
          item.classList.remove("checked");
        });
        insurance.classList.add("checked")
      }
    });
  });
}

function searchInputs(){
  var inputs = document.querySelectorAll(".search-input");

  inputs.forEach(function(inputC){
    var input = inputC.querySelector("input");
    var dataSet = input.dataset.data;
    var type = input.dataset.type;
    var hide = document.querySelector(input.dataset.hide);
    var target = document.querySelector(input.dataset.target);
    var targetAdv = document.querySelector(input.dataset.adv);
    var resultContainer = document.createElement("ul");
    inputC.appendChild(resultContainer);

    input.addEventListener("focus", function(){
      inputC.classList.add("focus");
    });

    input.addEventListener("blur", function(){
      setTimeout(function(){
        inputC.classList.remove("focus");
      }, 200);
    });

    input.addEventListener("input", function(e){

      var lis = resultContainer.querySelectorAll("li");
      var divs = resultContainer.querySelectorAll("div");

      if (lis) lis.forEach(function(li){
        li.remove();
      });

      if (divs) divs.forEach(function(div){
        div.remove();
      });

      var result = search(data[dataSet], e.target.value, type === "advanced");

      if(result) {

        var cont = document.createElement("div");
        cont.classList.add("search-input-overflow");

        if(type === "advanced") {
          var notifi = document.createElement("div");
          var custom = document.createElement("div");
          notifi.innerHTML = "Keep typing to show more results";
          custom.innerHTML = "Or, enter address manually";
          custom.classList.add("search-input-footer");
          notifi.classList.add("search-input-notifi");
          custom.setAttribute("id", "add-custom-adress");
          resultContainer.appendChild(notifi);
        }

        result.forEach(function(item, i){
          var li = document.createElement("li");
 
          if(type === "advanced") {
            li.innerHTML = "<div>"+item.adress+"</div><div>"+item.name+" "+item.postCode+"</div>";
          }else{
            li.innerHTML = item.name;
          }
          
          li.addEventListener("click", function(){
            if(type === "advanced") {
              input.value = item.adress;
              hide.classList.add("d-none");
              target.classList.remove("d-none");
              targetAdv.classList.remove("d-none");

              for (elm in item) {
                var res = target.querySelector("[data-result="+elm+"]");
                if(res) res.innerHTML = item[elm];
              }

            }else {
              input.value = item.name;
            };
          });
  
          cont.appendChild(li);
          resultContainer.appendChild(cont);
        });

        if(type === "advanced") resultContainer.appendChild(custom);
      }
    });
  });
}

function search (array, value, adv=false){
  if(value.length > 0) {
    return array.filter(function(item){
      if(!adv) {
        if (item.name.indexOf(value) !== -1) return true;
      }else{
        if ((item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) || (item.adress.toLowerCase().indexOf(value.toLowerCase()) !== -1) || (item.postCode.toLowerCase().indexOf(value.toLowerCase()) !== -1)) return true;
      }
    });
  }
}

function tables() {
  var tables = document.querySelectorAll(".table");

  tables.forEach(function (table) {
    var tableSelect = table.querySelector(".table-select");
    var checkBoxes = table.querySelectorAll("table tr input");
    var length = 0;

    if (tableSelect) {
      var buttons = tableSelect.querySelectorAll("button");
      tableSelect.querySelector("input[type=checkbox]").addEventListener("click", function (e) {
        checkBoxes.forEach(function (checkbox) {
          if (e.target.checked != checkbox.checked) checkbox.click();
          setButtons(buttons);
        });
      });

      table.querySelectorAll("input[type=checkbox]").forEach(function (input) {
        input.addEventListener("click", function (e) {
          setButtons(buttons);
        })
      })
    }

    function setButtons(buttons) {
      table.querySelectorAll("input[type=checkbox]").forEach(function (input) {
        if (input.checked) length++;
      });
      buttons.forEach(function (button) {
        if (length > 0) {
          button.removeAttribute("disabled");
        }
        else {
          button.setAttribute("disabled", true);
        }
      })
      length = 0;
    }
  });
}

function initMaterialUI() {
  if (typeof $('[data-materialize]').materialUI() === "function") {
    $('[data-materialize]').materialUI();
    $(".element-style-wrap").data('rippleColor', '#0e827a').rippleIt();
  }

}

function selectControl() {
  var selects = document.querySelectorAll("[select-controll]");

  selects.forEach(function (elm) {
    elm.addEventListener("change", function (e) {
      var group = document.querySelectorAll("[select-group=" + elm.getAttribute("select-controll") + "]");
      group.forEach(function (itm) {
        $(itm).collapse('hide');
      });
      setTimeout(function () {
        $("#" + e.target.value).collapse("show");
      }, 300);

    });
  });
}

function tooltips() {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
}

function detailList() {
  var row = $(".details-list-container").clone().html();
  var add = $(".info-input-more");
  var container = $(".details-list-container");

  $('.custom-picker').selectpicker();

  add.on("click", function () {
    $(row).appendTo(container);
    $('.custom-picker').selectpicker();
    $('.details-list-row .info-input-more.remove').on("click", function () {
      $(this).closest(".details-list-row").remove();
    })
  })
}

