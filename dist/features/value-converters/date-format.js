'use strict';

System.register(['moment'], function (_export, _context) {
  var moment, DateFormatValueConverter;

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
      _export('DateFormatValueConverter', DateFormatValueConverter = function () {
        function DateFormatValueConverter() {
          _classCallCheck(this, DateFormatValueConverter);
        }

        DateFormatValueConverter.prototype.toView = function toView(value, format) {
          if (format) {
            return moment(value).format(format);
          }
          return value ? moment(value).format('L') : '';
        };

        return DateFormatValueConverter;
      }());

      _export('DateFormatValueConverter', DateFormatValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3ZhbHVlLWNvbnZlcnRlcnMvZGF0ZS1mb3JtYXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFPLFk7OzswQ0FFTSx3Qjs7Ozs7MkNBQ1gsTSxtQkFBTyxLLEVBQU8sTSxFQUFRO0FBQ3BCLGNBQUksTUFBSixFQUFZO0FBQ1YsbUJBQU8sT0FBTyxLQUFQLEVBQWMsTUFBZCxDQUFxQixNQUFyQixDQUFQO0FBQ0Q7QUFDRCxpQkFBTyxRQUFRLE9BQU8sS0FBUCxFQUFjLE1BQWQsQ0FBcUIsR0FBckIsQ0FBUixHQUFvQyxFQUEzQztBQUNELFMiLCJmaWxlIjoiZmVhdHVyZXMvdmFsdWUtY29udmVydGVycy9kYXRlLWZvcm1hdC5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
