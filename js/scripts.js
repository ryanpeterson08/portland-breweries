//Backend
var pubIcon = L.icon({
  iconUrl: 'img/pubIcon.png',
  iconSize: [60, 50]
});

var emptyIcon = L.icon({
  iconUrl: 'img/flag.png',
  iconSize: [30, 50]
});

var searchCtrl = L.control.fuseSearch({
  position: 'topright',
  placeholder: 'Pub'
});

var createMap = function(){
  var breweryMap = L.map('mapid').setView([45.523171, -122.667256], 10);
  return breweryMap;
};

//function parses geoJSON and creats a map layer with corresponding marker points and correct icons
var addPubsToMap = function(data){
  var brewPubs = L.geoJson(data, {
    onEachFeature: function(feature, layer) {
      feature.layer = layer;
      var breweryName = feature.properties.Brewery
      var breweryAddress = feature.properties.Address
      var breweryLink = feature.properties.Website
      layer.bindPopup("<h5>" + breweryName + "</h5><br><p>" + breweryAddress + "</p><br><a href='" + breweryLink + "' target='_blank'>" + breweryLink + "</a>" );
    }, pointToLayer: function(feature, latlng){
      if (feature.properties.Visited === true) {
        return L.marker(latlng, {icon: emptyIcon});
      } else {
        return L.marker(latlng, {icon: pubIcon});
      }
    }
  });
  return brewPubs;
}

//Clusters icon at different zoom levels
var makeCluster = function(data, map){
  var markers = L.markerClusterGroup({
    iconCreateFunction: function(cluster){
      return pubIcon;
    }, disableClusteringAtZoom: 13,
    showCoverageOnHover: false
  });
  markers.addLayer(data);
  return markers;
}

//Frontend
$(document).ready(function(){
  var pub;
  var i = 0
  var checkedArray = [];
  var mapInstance = createMap();
  var pubCluster;
  mapInstance.addControl(searchCtrl);
  L.control.locate().addTo(mapInstance);


  //Get map tiles and add to mapInstance
  var stamenToner =  L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    ext: 'png'
  }).addTo(mapInstance);

  var darkMatter = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

  var stamenTerrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	ext: 'png'
  });

  //get geoJSON file and call addPubsToMap() and makeCluster() to draw points on map
  var basemaps = {
    "Stamen Toner":stamenToner,
    "Stamen Terrain":stamenTerrain,
    " Carto DB Dark":darkMatter
  }

  L.control.layers(basemaps).addTo(mapInstance);

  $.getJSON("data/breweries_final.geojson", function(pub){
    var pubs = addPubsToMap(pub);
    searchCtrl.indexFeatures(pub, ['Brewery', 'Address', 'Amenities']);
    pubCluster = makeCluster(pubs, mapInstance);
    mapInstance.addLayer(pubCluster);

    //Loop through geoJSON and append corrisponding checklist items to HTML
    pub.features.forEach(function(each) {
      if (i < 30) {
        $("#column-1").append("<input type='checkbox' name='visited-pubs' value='" + i + "'> " + each.properties.Brewery + "<br>")
        i++;
      } else if (i < 60) {
        $("#column-2").append("<input type='checkbox' name='visited-pubs' value='" + i + "'> " + each.properties.Brewery + "<br>")
        i++;
      } else if (i < 90) {
        $("#column-3").append("<input type='checkbox' name='visited-pubs' value='" + i + "'> " + each.properties.Brewery + "<br>")
        i++;
      } else {
        $("#column-4").append("<input type='checkbox' name='visited-pubs' value='" + i + "'> " + each.properties.Brewery + "<br>")
        i++;
      }
    });

    //When user clicks filter button, get filtered items and add to checkeArray
    $("#filter-button").submit(function(event){
      event.preventDefault();
      $("input:checkbox[name=visited-pubs]:checked").each(function(){
         checkedArray.push($(this).val())
       })

      //Setting object propertie Visted: to true for every user selection
      checkedArray.forEach(function(each){
        pub.features[each].properties.Visited = true;
      })

      //remove all pub icons then replace with with pubs that have Visited: false
      mapInstance.removeLayer(pubCluster);
      pubs = addPubsToMap(pub);
      pubCluster =  makeCluster(pubs, mapInstance);
      mapInstance.addLayer(pubCluster);

    });
  });
});
