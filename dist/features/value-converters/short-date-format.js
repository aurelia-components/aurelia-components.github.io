'use strict';

System.register(['moment'], function (_export, _context) {
  var moment, ShortDateFormatValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_moment) {
      moment = _moment.default;
    }],
    execute: function () {
      _export('ShortDateFormatValueConverter', ShortDateFormatValueConverter = function () {
        function ShortDateFormatValueConverter() {
          _classCallCheck(this, ShortDateFormatValueConverter);
        }

        ShortDateFormatValueConverter.prototype.toView = function toView(value, format) {
          if (format) {
            return moment(value).format(format);
          }
          return value ? moment(value).format('L') : '';
        };

        return ShortDateFormatValueConverter;
      }());

      _export('ShortDateFormatValueConverter', ShortDateFormatValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3ZhbHVlLWNvbnZlcnRlcnMvc2hvcnQtZGF0ZS1mb3JtYXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFPLFk7OzsrQ0FFTSw2Qjs7Ozs7Z0RBQ1gsTSxtQkFBTyxLLEVBQU8sTSxFQUFRO0FBQ3BCLGNBQUksTUFBSixFQUFZO0FBQ1YsbUJBQU8sT0FBTyxLQUFQLEVBQWMsTUFBZCxDQUFxQixNQUFyQixDQUFQO0FBQ0Q7QUFDRCxpQkFBTyxRQUFRLE9BQU8sS0FBUCxFQUFjLE1BQWQsQ0FBcUIsR0FBckIsQ0FBUixHQUFvQyxFQUEzQztBQUNELFMiLCJmaWxlIjoiZmVhdHVyZXMvdmFsdWUtY29udmVydGVycy9zaG9ydC1kYXRlLWZvcm1hdC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
