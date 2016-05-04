'use strict';

System.register([], function (_export, _context) {
  var customElementHelper;
  return {
    setters: [],
    execute: function () {
      _export('customElementHelper', customElementHelper = {
        dispatchEvent: function dispatchEvent(element, eventName, data) {
          var changeEvent = void 0;
          if (window.CustomEvent) {
            changeEvent = new CustomEvent(eventName, {
              detail: data,
              bubbles: true
            });
          } else {
            changeEvent = document.createEvent('CustomEvent');
            changeEvent.initCustomEvent(eventName, true, true, data);
          }

          element.dispatchEvent(changeEvent);
        },
        getAureliaViewModels: function getAureliaViewModels(element, selector) {
          return Array.from(element.getElementsByTagName(selector)).map(function (el) {
            if (el.au && el.au.controller) {
              return el.au.controller.viewModel;
            } else {
              throw new Error('Not an aurelia view model!');
            }
          });
        },
        debounce: function debounce(func, wait) {
          var timeout;

          return function () {
            var context = this,
                args = arguments;

            var later = function later() {
              timeout = null;
              func.apply(context, args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
          };
        }
      });

      _export('customElementHelper', customElementHelper);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3V0aWxzL2N1c3RvbS1lbGVtZW50LWhlbHBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O3FDQUFhLG1CLEdBQXNCO0FBQ2pDLHFCQURpQyx5QkFDbkIsT0FEbUIsRUFDVixTQURVLEVBQ0MsSUFERCxFQUNPO0FBQ3RDLGNBQUksb0JBQUo7QUFDQSxjQUFJLE9BQU8sV0FBWCxFQUF3QjtBQUN0QiwwQkFBYyxJQUFJLFdBQUosQ0FBZ0IsU0FBaEIsRUFBMkI7QUFDdkMsc0JBQVEsSUFEK0I7QUFFdkMsdUJBQVM7QUFGOEIsYUFBM0IsQ0FBZDtBQUlELFdBTEQsTUFLTztBQUNMLDBCQUFjLFNBQVMsV0FBVCxDQUFxQixhQUFyQixDQUFkO0FBQ0Esd0JBQVksZUFBWixDQUE0QixTQUE1QixFQUF1QyxJQUF2QyxFQUE2QyxJQUE3QyxFQUFtRCxJQUFuRDtBQUNEOztBQUVELGtCQUFRLGFBQVIsQ0FBc0IsV0FBdEI7QUFDRCxTQWRnQztBQWVqQyw0QkFmaUMsZ0NBZVosT0FmWSxFQWVILFFBZkcsRUFlTztBQUN0QyxpQkFBTyxNQUFNLElBQU4sQ0FBVyxRQUFRLG9CQUFSLENBQTZCLFFBQTdCLENBQVgsRUFBbUQsR0FBbkQsQ0FBdUQsY0FBTTtBQUNsRSxnQkFBSSxHQUFHLEVBQUgsSUFBUyxHQUFHLEVBQUgsQ0FBTSxVQUFuQixFQUErQjtBQUM3QixxQkFBTyxHQUFHLEVBQUgsQ0FBTSxVQUFOLENBQWlCLFNBQXhCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsb0JBQU0sSUFBSSxLQUFKLENBQVUsNEJBQVYsQ0FBTjtBQUNEO0FBQ0YsV0FOTSxDQUFQO0FBT0QsU0F2QmdDO0FBd0JqQyxnQkF4QmlDLG9CQXdCeEIsSUF4QndCLEVBd0JsQixJQXhCa0IsRUF3Qlo7QUFDbkIsY0FBSSxPQUFKOztBQUdBLGlCQUFPLFlBQVc7QUFDaEIsZ0JBQUksVUFBVSxJQUFkO2dCQUNFLE9BQU8sU0FEVDs7QUFJQSxnQkFBSSxRQUFRLFNBQVIsS0FBUSxHQUFXO0FBQ3JCLHdCQUFVLElBQVY7QUFDQSxtQkFBSyxLQUFMLENBQVcsT0FBWCxFQUFvQixJQUFwQjtBQUNELGFBSEQ7O0FBTUEseUJBQWEsT0FBYjtBQUNBLHNCQUFVLFdBQVcsS0FBWCxFQUFrQixJQUFsQixDQUFWO0FBQ0QsV0FiRDtBQWNEO0FBMUNnQyxPIiwiZmlsZSI6ImZlYXR1cmVzL3V0aWxzL2N1c3RvbS1lbGVtZW50LWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
