(function() {
  'use strict';

  angular
    .module('projectMaps')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout,$scope,$http) {
    var vm = this;


  //Center the maps in Kenya
    angular.extend($scope, {
      center: {
        lat: 1.00 ,
        lng: 38.00,
        zoom: 6
      }
    });

    // Get the data from an geojson file and assign it to the scope variable geojson
    $http.get("assets/geojson/kenyaprojects.geojson").success(function(data, status) {
      angular.extend($scope, {
        geojson: {
          data: data,
          style: function (feature) {
          return feature.properties.style;
        },
         //Adds popup information on each marker
        onEachFeature: function (feature, layer) {
          layer.bindPopup("<dl><dt>Title</dt>"
          + "<dd>" + feature.properties.title + "</dd>"
          + "<dt>Description</dt>"
          + "<dd>" + feature.properties.description + "</dd>"
            + "<dt>Objectives</dt>"
            + "<dd>" + feature.properties.objectives + "</dd></dl>");
        }
        }
      });
    });

  }
})();
