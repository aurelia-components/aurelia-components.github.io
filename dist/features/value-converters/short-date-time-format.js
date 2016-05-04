'use strict';

System.register(['moment'], function (_export, _context) {
  var moment, ShortDateTimeFormatValueConverter;

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
      _export('ShortDateTimeFormatValueConverter', ShortDateTimeFormatValueConverter = function () {
        function ShortDateTimeFormatValueConverter() {
          _classCallCheck(this, ShortDateTimeFormatValueConverter);
        }

        ShortDateTimeFormatValueConverter.prototype.toView = function toView(value, format) {
          if (format) {
            return moment(value).format(format);
          }
          return value ? moment(value).format('DD.MM.YYYY HH:mm') : '';
        };

        return ShortDateTimeFormatValueConverter;
      }());

      _export('ShortDateTimeFormatValueConverter', ShortDateTimeFormatValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3ZhbHVlLWNvbnZlcnRlcnMvc2hvcnQtZGF0ZS10aW1lLWZvcm1hdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQU8sWTs7O21EQUVNLGlDOzs7OztvREFDWCxNLG1CQUFPLEssRUFBTyxNLEVBQVE7QUFDcEIsY0FBSSxNQUFKLEVBQVk7QUFDVixtQkFBTyxPQUFPLEtBQVAsRUFBYyxNQUFkLENBQXFCLE1BQXJCLENBQVA7QUFDRDtBQUNELGlCQUFPLFFBQVEsT0FBTyxLQUFQLEVBQWMsTUFBZCxDQUFxQixrQkFBckIsQ0FBUixHQUFtRCxFQUExRDtBQUNELFMiLCJmaWxlIjoiZmVhdHVyZXMvdmFsdWUtY29udmVydGVycy9zaG9ydC1kYXRlLXRpbWUtZm9ybWF0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
