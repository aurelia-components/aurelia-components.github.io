'use strict';

System.register(['moment'], function (_export, _context) {
  var moment, DateTimeFormatValueConverter;

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
      _export('DateTimeFormatValueConverter', DateTimeFormatValueConverter = function () {
        function DateTimeFormatValueConverter() {
          _classCallCheck(this, DateTimeFormatValueConverter);
        }

        DateTimeFormatValueConverter.prototype.toView = function toView(value, format) {
          if (format) {
            return moment(value).format(format);
          }
          return value ? moment(value).format('LLL') : '';
        };

        return DateTimeFormatValueConverter;
      }());

      _export('DateTimeFormatValueConverter', DateTimeFormatValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL3ZhbHVlLWNvbnZlcnRlcnMvZGF0ZS10aW1lLWZvcm1hdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQU8sWTs7OzhDQUVNLDRCOzs7OzsrQ0FDWCxNLG1CQUFPLEssRUFBTyxNLEVBQVE7QUFDcEIsY0FBSSxNQUFKLEVBQVk7QUFDVixtQkFBTyxPQUFPLEtBQVAsRUFBYyxNQUFkLENBQXFCLE1BQXJCLENBQVA7QUFDRDtBQUNELGlCQUFPLFFBQVEsT0FBTyxLQUFQLEVBQWMsTUFBZCxDQUFxQixLQUFyQixDQUFSLEdBQXNDLEVBQTdDO0FBQ0QsUyIsImZpbGUiOiJmZWF0dXJlcy92YWx1ZS1jb252ZXJ0ZXJzL2RhdGUtdGltZS1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
