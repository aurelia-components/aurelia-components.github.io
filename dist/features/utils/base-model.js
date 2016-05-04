"use strict";

System.register([], function (_export, _context) {
  var BaseModel;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("BaseModel", BaseModel = function () {
        function BaseModel() {
          _classCallCheck(this, BaseModel);

          this.isInEditMode = false;
          this.validation = undefined;
          this.bindingEngine = undefined;
          this._previousValues = {};
          this._subscriptions = [];
        }

        BaseModel.prototype.setEditMode = function setEditMode(edit) {
          this.isInEditMode = edit;

          if (edit) {
            this._previousValues = this.getOwnProperties();
          } else {
            this._previousValues = {};
          }
        };

        BaseModel.prototype.revertChanges = function revertChanges() {
          if (this.isInEditMode) {
            Object.assign(this, this._previousValues);
            this.setEditMode(false);
          }
        };

        BaseModel.prototype.getOwnProperties = function getOwnProperties() {
          var result = {};
          for (var prop in this) {
            if (this.hasOwnProperty(prop)) {
              result[prop] = this[prop];
            }
          }

          delete result.isInEditMode;
          delete result.validation;
          delete result._previousValues;

          return result;
        };

        BaseModel.prototype.subscribe = function subscribe(context, propertyName, callback) {
          var subscription = this.bindingEngine.propertyObserver(context, propertyName).subscribe(callback.bind(this));
          this._subscriptions.push(subscription);
        };

        BaseModel.prototype.unsubscribe = function unsubscribe() {
          this._subscriptions.forEach(function (subscription) {
            return subscription.dispose();
          });
        };

        return BaseModel;
      }());

      _export("BaseModel", BaseModel);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3V0aWxzL2Jhc2UtbW9kZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7MkJBR2EsUztBQUNYLDZCQUFjO0FBQUE7O0FBQ1osZUFBSyxZQUFMLEdBQW9CLEtBQXBCO0FBQ0EsZUFBSyxVQUFMLEdBQWtCLFNBQWxCO0FBQ0EsZUFBSyxhQUFMLEdBQXFCLFNBQXJCO0FBQ0EsZUFBSyxlQUFMLEdBQXVCLEVBQXZCO0FBQ0EsZUFBSyxjQUFMLEdBQXNCLEVBQXRCO0FBQ0Q7OzRCQUVELFcsd0JBQVksSSxFQUFNO0FBQ2hCLGVBQUssWUFBTCxHQUFvQixJQUFwQjs7QUFFQSxjQUFJLElBQUosRUFBVTtBQUNSLGlCQUFLLGVBQUwsR0FBdUIsS0FBSyxnQkFBTCxFQUF2QjtBQUNELFdBRkQsTUFFTztBQUNMLGlCQUFLLGVBQUwsR0FBdUIsRUFBdkI7QUFDRDtBQUNGLFM7OzRCQUVELGEsNEJBQWdCO0FBQ2QsY0FBSSxLQUFLLFlBQVQsRUFBdUI7QUFDckIsbUJBQU8sTUFBUCxDQUFjLElBQWQsRUFBb0IsS0FBSyxlQUF6QjtBQUNBLGlCQUFLLFdBQUwsQ0FBaUIsS0FBakI7QUFDRDtBQUNGLFM7OzRCQUVELGdCLCtCQUFtQjtBQUNqQixjQUFJLFNBQVMsRUFBYjtBQUNBLGVBQUssSUFBSSxJQUFULElBQWlCLElBQWpCLEVBQXVCO0FBQ3JCLGdCQUFJLEtBQUssY0FBTCxDQUFvQixJQUFwQixDQUFKLEVBQStCO0FBQzdCLHFCQUFPLElBQVAsSUFBZSxLQUFLLElBQUwsQ0FBZjtBQUNEO0FBQ0Y7O0FBRUQsaUJBQU8sT0FBTyxZQUFkO0FBQ0EsaUJBQU8sT0FBTyxVQUFkO0FBQ0EsaUJBQU8sT0FBTyxlQUFkOztBQUVBLGlCQUFPLE1BQVA7QUFDRCxTOzs0QkFFRCxTLHNCQUFVLE8sRUFBUyxZLEVBQWMsUSxFQUFVO0FBQ3pDLGNBQUksZUFBZSxLQUFLLGFBQUwsQ0FBbUIsZ0JBQW5CLENBQW9DLE9BQXBDLEVBQTZDLFlBQTdDLEVBQ2hCLFNBRGdCLENBQ04sU0FBUyxJQUFULENBQWMsSUFBZCxDQURNLENBQW5CO0FBRUEsZUFBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLFlBQXpCO0FBQ0QsUzs7NEJBRUQsVywwQkFBYztBQUNaLGVBQUssY0FBTCxDQUFvQixPQUFwQixDQUE0QjtBQUFBLG1CQUFnQixhQUFhLE9BQWIsRUFBaEI7QUFBQSxXQUE1QjtBQUNELFMiLCJmaWxlIjoiZmVhdHVyZXMvdXRpbHMvYmFzZS1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
