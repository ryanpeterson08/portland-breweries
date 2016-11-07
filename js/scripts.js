var createMap = function(){
  var breweryMap = L.map('mapid').setView([45.523171, -122.667256], 10);
  return breweryMap;
};

$(document).ready(function(){



  L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(createMap());

$.getJSON("data/breweries_final.geojson", function(pub){
  var brewPubs = L.geoJson(pub).addTo(createMap());
})



});
