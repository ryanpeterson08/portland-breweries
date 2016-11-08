//Backend
var pubIcon = L.icon({
  iconUrl: 'img/pubIcon.png',
  iconSize: [60, 50]
});

var searchCtrl = L.control.fuseSearch({
  position: 'topright',
  placeholder: 'Pub'
});

var createMap = function(){
  var breweryMap = L.map('mapid').setView([45.523171, -122.667256], 10);
  return breweryMap;
};


var addPubsToMap = function(data){
  var brewPubs = L.geoJson(data, {
    onEachFeature: function(feature, layer) {
      feature.layer = layer;
      var breweryName = feature.properties.Brewery
      var breweryAddress = feature.properties.Address
      var breweryLink = feature.properties.Website
      layer.bindPopup("<h5>" + breweryName + "</h5><br><p>" + breweryAddress + "</p><br><a href='" + breweryLink + "'>" + breweryLink + "</a>" );
    },
    pointToLayer: function(feature, latlng){
      return L.marker(latlng, {icon: pubIcon});
    }
  });
  return brewPubs;
}

var makeCluster = function(data, map){
  var markers = L.markerClusterGroup({
    iconCreateFunction: function(cluster){
      return pubIcon;
    }, disableClusteringAtZoom: 14,
    showCoverageOnHover: false
  });
  markers.addLayer(data);
  map.addLayer(markers);
}



//Frontend
$(document).ready(function(){

  var mapInstance = createMap();
  mapInstance.addControl(searchCtrl);
  L.control.locate().addTo(mapInstance);

  L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	ext: 'png'
}).addTo(mapInstance);

  $.getJSON("data/breweries_final.geojson", function(pub){
    var pubs = addPubsToMap(pub);
    searchCtrl.indexFeatures(pub, ['Brewery', 'Address']);
    makeCluster(pubs, mapInstance);
  });

});
