//Backend
var pubIcon = L.icon({
  iconUrl: 'img/pubIcon.png',
  iconSize: [60, 50]
});

var emptyIcon = L.icon({
  iconUrl: 'img/pubIcon-empty.png',
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
    }, //filter: function(feature) {
    //   if (feature.properties.Visited === true) {
    //     return false;
    //   }
    //     return true;
    //
    // },
    pointToLayer: function(feature, latlng){
      if (feature.properties.Visited === true) {
        return L.marker(latlng, {icon: emptyIcon});
      } else {
        return L.marker(latlng, {icon: pubIcon});
      }
    }
  });
  return brewPubs;
}

var makeCluster = function(data, map){
  var markers = L.markerClusterGroup({
    iconCreateFunction: function(cluster){
      return pubIcon;
    }, disableClusteringAtZoom: 13,
    showCoverageOnHover: false
  });
  markers.addLayer(data);
  //map.addLayer(markers);
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

  L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	ext: 'png'
  }).addTo(mapInstance);

  $.getJSON("data/breweries_final.geojson", function(pub){
    var pubs = addPubsToMap(pub);
    searchCtrl.indexFeatures(pub, ['Brewery', 'Address']);
    //mapInstance.addLayer(pubs);
    pubCluster = makeCluster(pubs, mapInstance);
    mapInstance.addLayer(pubCluster);

    pub.features.forEach(function(each) {
      if (i < 30) {
        $("#column-1").append("<input type='checkbox' name='visited-pubs' value='" + i + "'>" + each.properties.Brewery + "<br>")
        i++;
      } else if (i < 60) {
        $("#column-2").append("<input type='checkbox' name='visited-pubs' value='" + i + "'>" + each.properties.Brewery + "<br>")
        i++;
      } else if (i < 90) {
        $("#column-3").append("<input type='checkbox' name='visited-pubs' value='" + i + "'>" + each.properties.Brewery + "<br>")
        i++;
      } else {
        $("#column-4").append("<input type='checkbox' name='visited-pubs' value='" + i + "'>" + each.properties.Brewery + "<br>")
        i++;
      }
    });


    $("#filter-button").submit(function(event){
      event.preventDefault();
      $("input:checkbox[name=visited-pubs]:checked").each(function(){
         checkedArray.push($(this).val())
       })
       console.log(checkedArray);
      checkedArray.forEach(function(each){
        pub.features[each].properties.Visited = true;
      })

      //remove all pub icons then replace with with pubs that have Visited: false
      mapInstance.removeLayer(pubCluster);
      pubs = addPubsToMap(pub);
      pubCluster =  makeCluster(pubs, mapInstance);
      mapInstance.addLayer(pubCluster);

    });
      $("#new-points").click(function(){
      mapInstance.removeLayer(pubCluster);
      pub.features.forEach(function(each){
         each.properties.Visited = false;
       });
      pubs = addPubsToMap(pub);
      pubCluster =  makeCluster(pubs, mapInstance);
      mapInstance.addLayer(pubCluster);


    })
  });
});
