'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  var inject, customElement, bindable, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, Tab;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
    }],
    execute: function () {
      _export('Tab', Tab = (_dec = customElement('tab'), _dec2 = inject(Element), _dec(_class = _dec2(_class = (_class2 = function () {
        function Tab(element) {
          _classCallCheck(this, Tab);

          _initDefineProp(this, 'name', _descriptor, this);

          _initDefineProp(this, 'badge', _descriptor2, this);

          _initDefineProp(this, 'active', _descriptor3, this);

          _initDefineProp(this, 'headingStyleObject', _descriptor4, this);

          this.element = element;
        }

        Tab.prototype.attached = function attached() {};

        Tab.prototype.bind = function bind() {};

        Tab.prototype.setInnerScroll = function setInnerScroll() {
          this.element.style.height = '100%';
          this.element.style['overflow-y'] = 'auto';
          this.element.style.display = 'block';
        };

        Tab.prototype.show = function show() {
          this.active = true;
          this.element.classList.remove('aurelia-hide');
        };

        Tab.prototype.hide = function hide() {
          this.element.classList.add('aurelia-hide');
          this.active = false;
        };

        return Tab;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'name', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'badge', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'active', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'headingStyleObject', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return {};
        }
      })), _class2)) || _class) || _class));

      _export('Tab', Tab);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL3RhYnMvdGFiLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVEsWSxxQkFBQSxNO0FBQVEsbUIscUJBQUEsYTtBQUFlLGMscUJBQUEsUTs7O3FCQUlsQixHLFdBRlosY0FBYyxLQUFkLEMsVUFDQSxPQUFPLE9BQVAsQztBQU9DLHFCQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFDbkIsZUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNEOztzQkFFRCxRLHVCQUFXLENBQ1YsQzs7c0JBRUQsSSxtQkFBTyxDQVFOLEM7O3NCQUVELGMsNkJBQWlCO0FBQ2YsZUFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixHQUE0QixNQUE1QjtBQUNBLGVBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsWUFBbkIsSUFBbUMsTUFBbkM7QUFDQSxlQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE9BQTdCO0FBQ0QsUzs7c0JBRUQsSSxtQkFBTztBQUNMLGVBQUssTUFBTCxHQUFjLElBQWQ7QUFDQSxlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLE1BQXZCLENBQThCLGNBQTlCO0FBQ0QsUzs7c0JBRUQsSSxtQkFBTztBQUNMLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsY0FBM0I7QUFDQSxlQUFLLE1BQUwsR0FBYyxLQUFkO0FBQ0QsUzs7O2dGQXBDQSxROzs7Z0ZBQ0EsUTs7O2lGQUNBLFE7OztpQkFBa0IsSzs7NkZBQ2xCLFE7OztpQkFBOEIsRSIsImZpbGUiOiJmZWF0dXJlcy9lbGVtZW50cy90YWJzL3RhYi5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
