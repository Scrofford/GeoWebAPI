var currentLat = 0;
var currentLon = 0;
var xmlHttp = new XMLHttpRequest();

function httpGet(event) {
  xmlHttp.open( "GET", "http://ip-api.com/json", true ); // false for synchronous request
  xmlHttp.send();
  return xmlHttp.responseText;
}

function processRequest(e) {
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
    var response = JSON.parse(xmlHttp.responseText);
    currentLat = response.lat;
    currentLon = response.lon;
    initialize();
  }
}

var map;
function initialize() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: new google.maps.LatLng(currentLat, currentLon),
    mapTypeId: 'roadmap'
  });

  var iconBase = 'http://www.nonkit.com/smallbasic.files/AnotherTurtle.png';
  var icons = {
    info: {
      icon: iconBase + 'AnotherTurtle.png'
    }
  };

  var image = {
    url: 'https://maxcdn.icons8.com/windows8/PNG/48/Animals/turtle-48.png',
    size: new google.maps.Size(47, 47),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32)
  };

  function addMarker(feature) {
    var marker = new google.maps.Marker({
      position: feature.position,
      icon: image,
      map: map
    });
  }

  var features = [
    {
      position: new google.maps.LatLng(currentLat, currentLon),
      type: 'info'
    }
  ];

  for (var i = 0, feature; feature = features[i]; i++) {
    addMarker(feature);
  }
}

document.getElementById("getButton").addEventListener("click", httpGet);
xmlHttp.addEventListener("readystatechange", processRequest, false);
