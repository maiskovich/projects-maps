(function () {
  'use strict';

  angular
    .module('projectMaps')
    .service('mapdata', mapdata);

  /** @ngInject */
  function mapdata($http, $log, $q) {

    // interface
    var serviceData = {
      projects: [],
      getProjects: getProjects,
      counties: [],
      getCounties: getCounties
    };
    return serviceData;
    function getProjects() {
      var defProjects = $q.defer();
      $http.get("assets/geojson/kenyaprojects.geojson")
        .success(function (data) {
          serviceData.projects = data;
          defProjects.resolve(data);
        })
        .error(function () {
          defProjects.reject("Failed to get projects");
        });
      return defProjects.promise;
    }

    function getCounties() {
      var defCounties = $q.defer();
      $http.get("assets/geojson/counties.geojson")
        .success(function (data) {
          serviceData.counties = data;
          angular.forEach(serviceData.counties.features, function (valueCounty) {
            $log.log(valueCounty);
            angular.forEach(serviceData.projects.features, function (valueProject) {
              if (valueCounty.properties.COUNTY_NAM === valueProject.properties.County)
                if (valueCounty.properties.projects_amount === undefined) {
                  valueCounty.properties.projects_amount = 1;
                } else {
                  valueCounty.properties.projects_amount++;
                }
            });
          });
          defCounties.resolve(data);


        })
        .error(function () {
          defCounties.reject("Failed to get counties");

        });
      return defCounties.promise;

    }
  }

})();
