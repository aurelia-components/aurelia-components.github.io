'use strict';

System.register(['aurelia-framework', './routes-config'], function (_export, _context) {
  var inject, RoutesConfig, _dec, _class, App;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_routesConfig) {
      RoutesConfig = _routesConfig.RoutesConfig;
    }],
    execute: function () {
      _export('App', App = (_dec = inject(RoutesConfig), _dec(_class = function () {
        function App(routesConfig) {
          _classCallCheck(this, App);

          this.routesConfig = routesConfig;
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
          config.map(this.routesConfig.getRoutes());
          config.mapUnknownRoutes('./not-found', 'not-found');

          this.router = router;
        };

        return App;
      }()) || _class));

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQVEsWSxxQkFBQSxNOztBQUNBLGtCLGlCQUFBLFk7OztxQkFHSyxHLFdBRFosT0FBTyxZQUFQLEM7QUFFQyxxQkFBWSxZQUFaLEVBQTBCO0FBQUE7O0FBQ3hCLGVBQUssWUFBTCxHQUFvQixZQUFwQjtBQUNEOztzQkFFRCxlLDRCQUFnQixNLEVBQVEsTSxFQUFRO0FBSTlCLGlCQUFPLEdBQVAsQ0FBVyxLQUFLLFlBQUwsQ0FBa0IsU0FBbEIsRUFBWDtBQUNBLGlCQUFPLGdCQUFQLENBQXdCLGFBQXhCLEVBQXVDLFdBQXZDOztBQUVBLGVBQUssTUFBTCxHQUFjLE1BQWQ7QUFDRCxTIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
