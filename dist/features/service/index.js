'use strict';

System.register(['./config', './logger'], function (_export, _context) {
  var Config;
  return {
    setters: [function (_config) {
      Config = _config.Config;
    }, function (_logger) {
      var _exportObj = {};
      _exportObj.Logger = _logger.Logger;

      _export(_exportObj);
    }],
    execute: function () {
      function configure(aurelia, configCallback) {
        var config = new Config();

        if (configCallback !== undefined && typeof configCallback === 'function') {
          configCallback(config);
        }
      }

      _export('configure', configure);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3NlcnZpY2UvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQVEsWSxXQUFBLE07OztpQkFFQSxNLFdBQUEsTTs7Ozs7QUFFRCxlQUFTLFNBQVQsQ0FBbUIsT0FBbkIsRUFBNEIsY0FBNUIsRUFBNEM7QUFDakQsWUFBTSxTQUFTLElBQUksTUFBSixFQUFmOztBQUVBLFlBQUksbUJBQW1CLFNBQW5CLElBQWdDLE9BQU8sY0FBUCxLQUEyQixVQUEvRCxFQUEyRTtBQUN6RSx5QkFBZSxNQUFmO0FBQ0Q7QUFDRiIsImZpbGUiOiJmZWF0dXJlcy9zZXJ2aWNlL2luZGV4LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
