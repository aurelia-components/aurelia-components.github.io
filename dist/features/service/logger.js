'use strict';

System.register(['CodeSeven/toastr', './config'], function (_export, _context) {
  var toastr, Config, defaults, Logger;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function log(options) {
    var opts = Object.assign({}, defaults, options);


    if (opts.showToast) {
      toastr[opts.type](opts.message, opts.title);
    }
  }

  function sanitize(options, messageType) {
    if (typeof options === 'string' || options instanceof String) {
      return {
        message: options,
        type: messageType
      };
    }

    options.type = messageType;
    return options;
  }

  return {
    setters: [function (_CodeSevenToastr) {
      toastr = _CodeSevenToastr.default;
    }, function (_config) {
      Config = _config.Config;
    }],
    execute: function () {
      defaults = {
        source: 'app',
        title: '',
        message: 'no message provided',
        data: '',
        showToast: true,
        type: 'info'
      };

      _export('Logger', Logger = function () {
        function Logger() {
          _classCallCheck(this, Logger);

          var defOpts = {
            closeButton: true,
            positionClass: 'toast-bottom-right',
            fadeOut: 1000
          };

          var configOptions = Config.loggerOpts || {};
          var options = Object.assign(toastr.options, defOpts, configOptions);
          toastr.options = options;
        }

        Logger.prototype.warn = function warn(options) {
          log(sanitize(options, 'warning'));
        };

        Logger.prototype.info = function info(options) {
          log(sanitize(options, 'info'));
        };

        Logger.prototype.error = function error(options) {
          log(sanitize(options, 'error'));
        };

        Logger.prototype.success = function success(options) {
          log(sanitize(options, 'success'));
        };

        return Logger;
      }());

      _export('Logger', Logger);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3NlcnZpY2UvbG9nZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBZUEsV0FBUyxHQUFULENBQWEsT0FBYixFQUFzQjtBQUNwQixRQUFJLE9BQU8sT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixRQUFsQixFQUE0QixPQUE1QixDQUFYOzs7QUFHQSxRQUFJLEtBQUssU0FBVCxFQUFvQjtBQUNsQixhQUFPLEtBQUssSUFBWixFQUFrQixLQUFLLE9BQXZCLEVBQWdDLEtBQUssS0FBckM7QUFDRDtBQUNGOztBQUVELFdBQVMsUUFBVCxDQUFrQixPQUFsQixFQUEyQixXQUEzQixFQUF3QztBQUN0QyxRQUFJLE9BQU8sT0FBUCxLQUFtQixRQUFuQixJQUErQixtQkFBbUIsTUFBdEQsRUFBOEQ7QUFDNUQsYUFBTztBQUNMLGlCQUFTLE9BREo7QUFFTCxjQUFNO0FBRkQsT0FBUDtBQUlEOztBQUVELFlBQVEsSUFBUixHQUFlLFdBQWY7QUFDQSxXQUFPLE9BQVA7QUFDRDs7OztBQS9CTSxZOztBQUNDLFksV0FBQSxNOzs7QUFFRixjLEdBQVc7QUFDZixnQkFBUSxLQURPO0FBRWYsZUFBTyxFQUZRO0FBR2YsaUJBQVMscUJBSE07QUFJZixjQUFNLEVBSlM7QUFLZixtQkFBVyxJQUxJO0FBTWYsY0FBTTtBQU5TLE87O3dCQThCSixNO0FBQ1gsMEJBQWM7QUFBQTs7QUFDWixjQUFJLFVBQVU7QUFDWix5QkFBYSxJQUREO0FBRVosMkJBQWUsb0JBRkg7QUFHWixxQkFBUztBQUhHLFdBQWQ7O0FBTUEsY0FBSSxnQkFBZ0IsT0FBTyxVQUFQLElBQXFCLEVBQXpDO0FBQ0EsY0FBSSxVQUFVLE9BQU8sTUFBUCxDQUFjLE9BQU8sT0FBckIsRUFBOEIsT0FBOUIsRUFBdUMsYUFBdkMsQ0FBZDtBQUNBLGlCQUFPLE9BQVAsR0FBaUIsT0FBakI7QUFDRDs7eUJBRUQsSSxpQkFBSyxPLEVBQVM7QUFDWixjQUFJLFNBQVMsT0FBVCxFQUFrQixTQUFsQixDQUFKO0FBQ0QsUzs7eUJBRUQsSSxpQkFBSyxPLEVBQVM7QUFDWixjQUFJLFNBQVMsT0FBVCxFQUFrQixNQUFsQixDQUFKO0FBQ0QsUzs7eUJBRUQsSyxrQkFBTSxPLEVBQVM7QUFDYixjQUFJLFNBQVMsT0FBVCxFQUFrQixPQUFsQixDQUFKO0FBQ0QsUzs7eUJBRUQsTyxvQkFBUSxPLEVBQVM7QUFDZixjQUFJLFNBQVMsT0FBVCxFQUFrQixTQUFsQixDQUFKO0FBQ0QsUyIsImZpbGUiOiJmZWF0dXJlcy9zZXJ2aWNlL2xvZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
