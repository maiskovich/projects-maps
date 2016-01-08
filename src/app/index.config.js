(function() {
  'use strict';

  angular
    .module('projectMaps')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);


  }

})();
