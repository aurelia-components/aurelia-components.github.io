'use strict';

System.register([], function (_export, _context) {
  var Timespan;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('Timespan', Timespan = function () {
        function Timespan(timespan) {
          _classCallCheck(this, Timespan);

          var hours = 0;
          var minutes = 0;
          if (typeof timespan === 'string') {
            var fragments = timespan.split(':');
            if (fragments.length >= 2) {
              hours = parseInt(fragments[0], 10);
              minutes = parseInt(fragments[1], 10);

              if (hours < 0 || hours > 23) {
                hours = 0;
              }

              if (minutes < 0 || minutes > 59) {
                minutes = 0;
              }
            }
          } else if (timespan.constructor.name === 'Moment') {
            hours = timespan.hours();
            minutes = timespan.minutes();
          }

          this.hours = hours;
          this.minutes = minutes;
        }

        Timespan.prototype.toString = function toString() {
          var result = '';
          if (this.hours < 10) {
            result += '0';
          }

          result += this.hours + ':';

          if (this.minutes < 10) {
            result += '0';
          }

          result += this.minutes;

          return result;
        };

        Timespan.prototype.equals = function equals(other) {
          if (other === undefined || other === null) {
            return false;
          }

          return this.hours === other.hours && this.minutes === other.minutes;
        };

        return Timespan;
      }());

      _export('Timespan', Timespan);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3V0aWxzL3RpbWVzcGFuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzBCQUFhLFE7QUFDWCwwQkFBWSxRQUFaLEVBQXNCO0FBQUE7O0FBQ3BCLGNBQUksUUFBUSxDQUFaO0FBQ0EsY0FBSSxVQUFVLENBQWQ7QUFDQSxjQUFJLE9BQU8sUUFBUCxLQUFvQixRQUF4QixFQUFrQztBQUNoQyxnQkFBSSxZQUFZLFNBQVMsS0FBVCxDQUFlLEdBQWYsQ0FBaEI7QUFDQSxnQkFBSSxVQUFVLE1BQVYsSUFBb0IsQ0FBeEIsRUFBMkI7QUFDekIsc0JBQVEsU0FBUyxVQUFVLENBQVYsQ0FBVCxFQUF1QixFQUF2QixDQUFSO0FBQ0Esd0JBQVUsU0FBUyxVQUFVLENBQVYsQ0FBVCxFQUF1QixFQUF2QixDQUFWOztBQUVBLGtCQUFJLFFBQVEsQ0FBUixJQUFhLFFBQVEsRUFBekIsRUFBNkI7QUFDM0Isd0JBQVEsQ0FBUjtBQUNEOztBQUVELGtCQUFJLFVBQVUsQ0FBVixJQUFlLFVBQVUsRUFBN0IsRUFBaUM7QUFDL0IsMEJBQVUsQ0FBVjtBQUNEO0FBQ0Y7QUFDRixXQWRELE1BY08sSUFBSSxTQUFTLFdBQVQsQ0FBcUIsSUFBckIsS0FBOEIsUUFBbEMsRUFBNEM7QUFDakQsb0JBQVEsU0FBUyxLQUFULEVBQVI7QUFDQSxzQkFBVSxTQUFTLE9BQVQsRUFBVjtBQUNEOztBQUVELGVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxlQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0Q7OzJCQUVELFEsdUJBQVc7QUFDVCxjQUFJLFNBQVMsRUFBYjtBQUNBLGNBQUksS0FBSyxLQUFMLEdBQWEsRUFBakIsRUFBcUI7QUFDbkIsc0JBQVUsR0FBVjtBQUNEOztBQUVELG9CQUFVLEtBQUssS0FBTCxHQUFhLEdBQXZCOztBQUVBLGNBQUksS0FBSyxPQUFMLEdBQWUsRUFBbkIsRUFBdUI7QUFDckIsc0JBQVUsR0FBVjtBQUNEOztBQUVELG9CQUFVLEtBQUssT0FBZjs7QUFFQSxpQkFBTyxNQUFQO0FBQ0QsUzs7MkJBRUQsTSxtQkFBTyxLLEVBQU87QUFDWixjQUFJLFVBQVUsU0FBVixJQUF1QixVQUFVLElBQXJDLEVBQTJDO0FBQ3pDLG1CQUFPLEtBQVA7QUFDRDs7QUFFRCxpQkFBUSxLQUFLLEtBQUwsS0FBZSxNQUFNLEtBQXJCLElBQThCLEtBQUssT0FBTCxLQUFpQixNQUFNLE9BQTdEO0FBQ0QsUyIsImZpbGUiOiJmZWF0dXJlcy91dGlscy90aW1lc3Bhbi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
