(function() {
  'use strict';

  angular
    .module('projectMaps')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope,leafletData,mapdata,mapdataStyling,$stateParams) {
    var vm = this;
    //If clustering is off, we set the buton in the view to change it to on and the other way round
    if($stateParams.clustering==='off'){
      vm.mapClustering='on';
    }else{
      vm.mapClustering='off';
    }
    //Center the maps in Kenya
    angular.extend($scope, {
      events: {
        map: {
          enable: ['moveend', 'popupopen'],
          logic: 'emit'
        },
        marker: {
          enable: [],
          logic: 'emit'
        }
      },
      center: {
        lat: 1.00 ,
        lng: 38.00,
        zoom: 6
      },
      layers: {
        baselayers: {
          osm: {
            name: 'OpenStreetMap',
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            type: 'xyz'
          },
        },
        overlays:{}
      }
    });
    /**
     * Adds legends to the map showing a scale of possible values
     * @type {number[]}
     */
    var grades = [1, 5, 10, 20, 50, 100];
    var colors= new Array();;
    var labels= new Array();;
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
      colors.push( mapdataStyling.getColor(grades[i] ));
      labels.push(grades[i]+' Projects');
    }
    angular.extend($scope, {
      legend: {
        position: 'bottomright',
        colors: colors,
        labels: labels
      }

    });
    // Get the data from an geojson file and assign it to the scope variable geojson
    mapdata.getProjects().then(function(data){
      /**
       * Gets the counties of Kenya,and create a layer with them
       * the data is requested after the projects are available
       * to get enough information for creating the choropleth
       */
      mapdata.getCounties().then(function(data){
        addGeoJsonLayerCounties(data);
      });
      //We check if clustering is on or off the decide wich function we call for creating the markers
      if($stateParams.clustering==='off'){
        angular.extend($scope, {
          geojson: {
            data: data,
            style: function (feature) {
              return feature.properties.style;
            },
            pointToLayer: function (feature, latlng) {
              var marker=mapdataStyling.markerStyle(feature.properties.title);
                var geojsonMarkerOptions=marker;
              return L.circleMarker(latlng, geojsonMarkerOptions);
            },
            //Adds popup information on each marker
            onEachFeature: function (feature, layer) {
              data=mapdataStyling.popupData(feature.properties);
              layer.bindPopup(data);
            }
          }
        });
      }else{
        //If clustering is on or is not set we call a function to create markers with clustering
        addGeoJsonLayerWithClustering(data);
      }
    });
    /**
     * Used for clustering the markers
     * @param data
     */
    function addGeoJsonLayerWithClustering(data) {
      vm.markers = L.markerClusterGroup({
        spiderfyDistanceMultiplier:3
      });
      var geoJsonLayer = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            var marker=mapdataStyling.markerStyle(feature.properties.title);
            var geojsonMarkerOptions=marker;
          return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        //Adds popup information on each marker
        onEachFeature: function (feature, layer) {
          data=mapdataStyling.popupData(feature.properties);
          layer.bindPopup(data);
        }
      });
      vm.markers.addLayer(geoJsonLayer);
      leafletData.getMap().then(function(map) {
        map.addLayer(vm.markers);
        map.fitBounds(vm.markers.getBounds());
      });
    }
    //Adds the counties layer to the map
    function addGeoJsonLayerCounties(data) {
      var geoJsonCountiesLayer = L.geoJson(data, {style: mapdataStyling.choroplethStyle});
      leafletData.getMap().then(function(map) {
        geoJsonCountiesLayer.addTo(map);
      });
    }

  }
})();
