var createMap = function(){
  var breweryMap = L.map('mapid').setView([45.523171, -122.667256], 10);
  return breweryMap;
};

var pubIcon = L.icon({
    iconUrl: 'img/pubIcon.png',
    iconSize: [60, 50]
});

var addPubsToMap = function(data, map){
  var brewPubs = L.geoJson(data, {
    onEachFeature: function(feature, layer) {
      var popupText = feature.properties.Brewery + "<br>" + feature.properties.Address
      layer.bindPopup(popupText); }
  });
  return brewPubs;
}

var makeCluster = function(data, map){
  var markers = L.markerClusterGroup({
    iconCreateFunction: function(cluster){
      return pubIcon;
    },
    showCoverageOnHover: false
  });
  markers.addLayer(data);
  map.addLayer(markers);
}



//Backend
$(document).ready(function(){

  var mapInstance = createMap();

  L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	ext: 'png'
}).addTo(mapInstance);

  $.getJSON("data/breweries_final.geojson", function(pub){
    var pubs = addPubsToMap(pub, mapInstance);
    makeCluster(pubs, mapInstance)
  });


});
