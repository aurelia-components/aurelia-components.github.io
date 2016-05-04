'use strict';

System.register([], function (_export, _context) {
  var ChildRouter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('ChildRouter', ChildRouter = function () {
        function ChildRouter() {
          _classCallCheck(this, ChildRouter);

          this.navModel = {};
        }

        ChildRouter.prototype.configureRouter = function configureRouter(config, router) {
          config.map(this.navModel);
          config.mapUnknownRoutes('not-found', 'not-found');
          this.router = router;
        };

        ChildRouter.prototype.checkAccess = function checkAccess(navModel) {

          return true;
        };

        return ChildRouter;
      }());

      _export('ChildRouter', ChildRouter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYnMvY2hpbGQtcm91dGVyL2NoaWxkLXJvdXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs2QkFBYSxXO0FBQ1gsK0JBQWM7QUFBQTs7QUFFWixlQUFLLFFBQUwsR0FBZ0IsRUFBaEI7QUFDRDs7OEJBRUQsZSw0QkFBZ0IsTSxFQUFRLE0sRUFBUTtBQUM5QixpQkFBTyxHQUFQLENBQVcsS0FBSyxRQUFoQjtBQUNBLGlCQUFPLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDLFdBQXJDO0FBQ0EsZUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNELFM7OzhCQUVELFcsd0JBQVksUSxFQUFVOztBQUtwQixpQkFBTyxJQUFQO0FBQ0QsUyIsImZpbGUiOiJsaWJzL2NoaWxkLXJvdXRlci9jaGlsZC1yb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
