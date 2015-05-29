var map;
var center;
// var markers = [];
function initialize(search_keyword) {
  var error = document.getElementById("error_message");
  var infowindow;
  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
              current_position(position);
            });
      } else {
          error.innerHTML = "Geolocation is not supported by this browser, input your own starting and ending coordinates below.";
      }
  };

  function current_position(position) {
    var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    center = location;
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
      center: location,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(mapCanvas, mapOptions);
    make_request(search_keyword, location);
  };
  getLocation();
}

function make_request(search_keyword, location) {
  var request = {
    location: location,
    radius: 4500,
    keyword: search_keyword,
    minPriceLevel: 0,
    maxPriceLevel: 4
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if(status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(results);
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      // markers.push(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {url: place.icon, scaledSize: new google.maps.Size(25, 25), origin: new google.maps.Point(0,0), anchor: new google.maps.Point(0,0)}
  });
  google.maps.event.addListener(marker,'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

// function clearMarkers(map) {
//   console.log(markers);
//   for (var i=0; i< markers.length; i++) {
//     markers[i].setMap();
//   }
// }

google.maps.event.addDomListener(window, 'load', initialize(''));

//angular
var searchModule = angular.module('searchApp', []);

searchModule.controller('searchController', function ($scope) {
	$scope.search = function() {
		// clearMarkers(null);
		var search_keyword = $scope.locate.keyword;
		initialize(search_keyword);
	}
	
})