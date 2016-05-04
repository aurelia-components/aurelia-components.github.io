'use strict';

System.register(['bootstrap'], function (_export, _context) {
  return {
    setters: [function (_bootstrap) {}],
    execute: function () {
      function configure(aurelia) {
        aurelia.use.standardConfiguration().developmentLogging().feature('features/service', function (config) {
          config.setLoggerService({
            positionClass: 'toast-top-right'
          });
        }).feature('features/utils').feature('features/value-converters').feature('features/elements/tabs');

        aurelia.start().then(function (a) {
          return a.setRoot();
        });
      }

      _export('configure', configure);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRU8sZUFBUyxTQUFULENBQW1CLE9BQW5CLEVBQTRCO0FBQ2pDLGdCQUFRLEdBQVIsQ0FDRyxxQkFESCxHQUVHLGtCQUZILEdBS0csT0FMSCxDQUtXLGtCQUxYLEVBSytCLFVBQUMsTUFBRCxFQUFZO0FBQ3ZDLGlCQUFPLGdCQUFQLENBQXdCO0FBQ3RCLDJCQUFlO0FBRE8sV0FBeEI7QUFHRCxTQVRILEVBVUcsT0FWSCxDQVVXLGdCQVZYLEVBV0csT0FYSCxDQVdXLDJCQVhYLEVBWUcsT0FaSCxDQVlXLHdCQVpYOztBQWNBLGdCQUFRLEtBQVIsR0FBZ0IsSUFBaEIsQ0FBcUI7QUFBQSxpQkFBSyxFQUFFLE9BQUYsRUFBTDtBQUFBLFNBQXJCO0FBQ0QiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
