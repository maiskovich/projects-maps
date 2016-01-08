(function() {
  'use strict';

  angular
    .module('projectMaps')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
