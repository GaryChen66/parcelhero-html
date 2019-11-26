// Initialize and add the map
function initMap() {
  // The location of Uluru

  var locations = [
    {x:51.483401, y:-0.308001, logo: "ups-logo.svg", distance: "1.3", price: "2.55", vat: "3.22", name:"Collect+ at MARTINS", adress:"205 High Street, Brentford, Middlesex", postcode: "TW8 8AH", printer: true, status: {drop: "11:45am", delivery: "Tue 19th"}, worktime: [{days: "Mon - Sat", time: "06:00 - 19:30"}, {days: "Sun", time: "07:00 - 16:00"}]},
    {x:51.482773, y:-0.309181, logo: "ups-logo.svg", distance: "1.3", price: "1.85", vat: "3.09", name:"Magpie and Crown", adress:"205 High Street, Brentford, Middlesex", postcode: "TW8 8AH", printer: true, status: {collect: true, delivery: "Tue 19th"}, worktime: [{days: "Mon - Sat", time: "06:00 - 19:00"}, {days: "Sun", time: "07:00 - 16:00"}]},
    {x:51.482725, y:-0.308208, logo: "ups-logo.svg", distance: "1.3", price: "7.55", vat: "3.22", name:"Cineco", adress:"205 High Street, Brentford, Middlesex", postcode: "TW8 8AH", printer: false, status: {drop: "11:45am", delivery: "Tue 19th"}, worktime: [{days: "Mon - Sat", time: "07:00 - 18:30"}, {days: "Sun", time: "07:00 - 16:00"}]},
  ];

  var control = {
    class: "map-window",
    container: document.createElement('DIV'),
    closeBtn: document.createElement('DIV'),
    bookBtn: document.createElement('DIV'),
    content: document.createElement('DIV'),

    init: function (map) {
      this.container.className = "map-window";
      this.container.style.display = "none";
      this.closeBtn.className = "map-window-close";
      this.content.className = "map-window-content";
      this.closeBtn.innerHTML = "<img src='./img/icons/close-btn.png' alt='close button' class='window-close-icon'>";
      this.bookBtn.className = "map-window-book";
      this.bookBtn.innerHTML = "<button class='btn btn-secondary w-100'>Book now</button>";

      this.distance = document.createElement('DIV');
      this.distance.className = "map-window-distance";
      
      this.name = document.createElement('h2');

      this.adress = document.createElement('DIV');
      this.adress.className = "map-window-adress";

      this.workTime = document.createElement('DIV');
      this.workTime.className = "map-window-work-time";

      this.printer = document.createElement('DIV');
      this.printer.className = "map-window-printer";

      this.drop = document.createElement('DIV');
      this.drop.className = "map-window-drop";

      this.price = document.createElement('h3');
      this.price.className = "text-price";

      this.vat = document.createElement('h4');
      this.vat.className = "text-price-ext";

      this.container.appendChild(this.distance);
      this.container.appendChild(this.closeBtn);
      this.container.appendChild(this.content);
      this.container.appendChild(this.bookBtn);
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.container);

      self = this;

      this.closeBtn.addEventListener('click', function () {
        self.close();
      })
    },
    setContent: function(i){
      var self = this;
      this.container.style.display = "flex";
      this.distance.innerHTML = locations[i].distance+" Miles";
      this.content.innerHTML = "<h2>"+locations[i].name+"</h2><div class='map-window-adress'>"+locations[i].adress+", "+locations[i].postcode+"</div>";
      if(locations[i].worktime) {
        locations[i].worktime.forEach(function(elm){
          self.content.innerHTML +="<div class='map-window-work'><div>"+elm.days+"</div><div>"+elm.time+"</div></div>";
        });
      }

      if(locations[i].printer) {
        this.content.innerHTML += "<div class='map-window-printer'><div><img src='./img/icons/Icon_printer_required.svg' alt=''></div><div><span>Printer required</span></div></div>";
      }else{
        this.content.innerHTML += "<div class='map-window-printer'><div><img src='./img/icons/Icon_printer_not_required.svg' alt=''></div><div><span>Printer not required</span></div></div>";
      }

      if(locations[i].status.drop) {
        this.content.innerHTML += "<div class='map-window-status'><div><img src='./img/icons/icon_location_pin.svg' alt=''></div><div><span>Drop by "+locations[i].status.drop+"</span><span>Delivery "+locations[i].status.delivery+"</span></div></div>";
      }
      if(locations[i].status.collect) {
        this.content.innerHTML += "<div class='map-window-status'><div><img src='./img/icons/icon_clock.svg' alt=''></div><div><span>Collect today</span><span>Delivery "+locations[i].status.delivery+"</span></div></div>";
      }
      this.content.innerHTML += "<h3 class='text-price'><span>£<span class='ship-cost'> "+locations[i].price+"</span> <span class='ex-vat'>ex VAT</span></span></h3><h4 class='text-price-ext'>£ <span class='new-price'>"+locations[i].vat+"</span> <span class='inc-vat'>inc VAT</span></h4>";
      
    },
    open: function(){
      this.container.style.display = "flex";
    },
    close: function(){
      this.container.style.display = "none";
    }
  }

  function HTMLMarker(lat, lng, map, i) {
    this.lat = lat;
    this.lng = lng;
    this.i = i;
    this.map = map;
    this.pos = new google.maps.LatLng(lat, lng);
  }

  HTMLMarker.prototype = new google.maps.OverlayView();
  HTMLMarker.prototype.onRemove = function () { }

  HTMLMarker.prototype.onAdd = function () {

    var i = this.i;
    var map = this.map;

    this.container = document.createElement('DIV');
    this.container.className = "map-marker";
    this.container.style.position = 'absolute';
    this.container.innerHTML = "<img src='./img/icons/"+locations[i].logo+"' alt=''><div><span>"+locations[i].distance+" Miles</span><span>More info</span></div>";
    var panes = this.getPanes();
    panes.overlayImage.appendChild(this.container);

    this.container.addEventListener('click', function (e) {
      document.querySelectorAll(".map-marker").forEach(function(elm){
        elm.classList.remove("active");
      });

      $(e.target).closest(".map-marker").addClass("active");
      map.panTo(new google.maps.LatLng(locations[i].x, locations[i].y));
      control.setContent(i);
      control.open();
    })
  }

  HTMLMarker.prototype.draw = function () {
    var overlayProjection = this.getProjection();
    var position = overlayProjection.fromLatLngToDivPixel(this.pos);
    var panes = this.getPanes();
    this.container.style.left = position.x - 20 + 'px';
    this.container.style.top = position.y - 44 + 'px';
  }

  var maps = document.querySelectorAll("[data-action=map]");

  maps.forEach(function (elm) {

    var bounds = new google.maps.LatLngBounds();

    var map = new google.maps.Map(elm, {
      zoom: 18,
      center: new google.maps.LatLng(51.483120, -0.308564),
      clickableIcons: false,
      mapTypeControl: false,
    });

    control.init(map);

    var i;

    for (i = 0; i < locations.length; i++) {

      var loc = new google.maps.LatLng(locations[i].x, locations[i].y);

      var htmlMarker = new HTMLMarker(locations[i].x, locations[i].y, map, i);
      htmlMarker.setMap(map);

      bounds.extend(loc);
    }

    //map.panToBounds(bounds);
    //map.fitBounds(bounds, 0); 

  });

}