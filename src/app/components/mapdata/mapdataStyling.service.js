(function () {
  'use strict';

  angular
    .module('projectMaps')
    .service('mapdataStyling', mapdataStyling);

  /** @ngInject */
  function mapdataStyling() {
    this.markerStyle = markerStyle;
    this.getColor = getColor;
    this.choroplethStyle = choroplethStyle;
    this.popupData = popupData;
    /**
     * Sets different kind of markers based on if a propertie is set
     * @param propertie
     * @returns {{radius: number, fillColor: string, color: string, weight: number, opacity: number, fillOpacity: number}|{radius: number, fillColor: string, color: string, weight: number, opacity: number, fillOpacity: number}}
     */
    function markerStyle(propertie) {
      if (propertie.length > 0) {
        var marker = {
          radius: 8,
          fillColor: "#ff7800",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        };
      } else {
        var marker = {
          radius: 8,
          fillColor: "#fff",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        };
      }
      return marker;

    }

    //Get a color depending on a scale for making choropleth of projects by county
    function getColor(d) {
      return d > 100 ? '#800026' :
        d > 50 ? '#BD0026' :
          d > 20 ? '#E31A1C' :
            d > 10 ? '#FC4E2A' :
              d > 5 ? '#FD8D3C' :
                d > 3 ? '#FEB24C' :
                  d > 1 ? '#FED976' :
                    '#FFEDA0';
    }

    //Gives style to a county, getting the color from the 'getColor()' function
    function choroplethStyle(feature) {
      return {
        fillColor: getColor(feature.properties.projects_amount),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      };
    }

    /**
     * Checks if the propertie is set, in that case shows some data
     * about the project(title, objective and description)
     * if the title is not set it shows NO DA
     * @param feature
     * @param layer
     */
    function popupData(propertie) {
      //If the title of the project is empty it will show NO DATA
      if (propertie.title.length > 0) {
        return ("<dl><dt>Title</dt>"
        + "<dd>" + propertie.title + "</dd>"
        + "<dt>Description</dt>"
        + "<dd>" + propertie.description + "</dd>"
        + "<dt>Objectives</dt>"
        + "<dd>" + propertie.objectives + "</dd></dl>");
      } else {
        return ("NO DATA");
      }
    }

  }

})();
