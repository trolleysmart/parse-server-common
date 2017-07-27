'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

var _ServiceBase2 = require('./ServiceBase');

var _ServiceBase3 = _interopRequireDefault(_ServiceBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StapleTemplateShoppingListService = function (_ServiceBase) {
  _inherits(StapleTemplateShoppingListService, _ServiceBase);

  function StapleTemplateShoppingListService() {
    _classCallCheck(this, StapleTemplateShoppingListService);

    return _possibleConstructorReturn(this, (StapleTemplateShoppingListService.__proto__ || Object.getPrototypeOf(StapleTemplateShoppingListService)).apply(this, arguments));
  }

  return StapleTemplateShoppingListService;
}(_ServiceBase3.default);

StapleTemplateShoppingListService.messagePrefix = 'No staple template shopping list found with Id: ';

StapleTemplateShoppingListService.create = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(info, acl, sessionToken) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', _ServiceBase3.default.create(_schema.StapleTemplateShoppingList, info, acl, sessionToken));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

StapleTemplateShoppingListService.read = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(info, sessionToken) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', _ServiceBase3.default.read(_schema.StapleTemplateShoppingList, info, sessionToken, StapleTemplateShoppingListService.messagePrefix));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

StapleTemplateShoppingListService.update = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(info, sessionToken) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', _ServiceBase3.default.update(_schema.StapleTemplateShoppingList, info, sessionToken, StapleTemplateShoppingListService.messagePrefix));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

StapleTemplateShoppingListService.delete = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(info, sessionToken) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', _ServiceBase3.default.delete(_schema.StapleTemplateShoppingList, info, sessionToken, StapleTemplateShoppingListService.messagePrefix));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

StapleTemplateShoppingListService.search = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt('return', _ServiceBase3.default.search(_schema.StapleTemplateShoppingList, StapleTemplateShoppingListService.buildSearchQuery, criteria, sessionToken));

          case 1:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

StapleTemplateShoppingListService.searchAll = function (criteria, sessionToken) {
  return _ServiceBase3.default.searchAll(_schema.StapleTemplateShoppingList, StapleTemplateShoppingListService.buildSearchQuery, criteria, sessionToken);
};

StapleTemplateShoppingListService.count = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt('return', _ServiceBase3.default.count(StapleTemplateShoppingListService.buildSearchQuery, criteria, sessionToken));

          case 1:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();

StapleTemplateShoppingListService.exists = function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt('return', _ServiceBase3.default.exists(StapleTemplateShoppingListService.buildSearchQuery, criteria, sessionToken));

          case 1:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();

StapleTemplateShoppingListService.loadAllStapleTemplateShoppingList = function () {
  var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(sessionToken) {
    var stapleTemplateShoppingListItems, result;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            stapleTemplateShoppingListItems = (0, _immutable.List)();
            _context8.next = 3;
            return StapleTemplateShoppingListService.searchAll((0, _immutable.Map)({}), sessionToken);

          case 3:
            result = _context8.sent;
            _context8.prev = 4;

            result.event.subscribe(function (info) {
              stapleTemplateShoppingListItems = stapleTemplateShoppingListItems.push(info);
            });

            _context8.next = 8;
            return result.promise;

          case 8:
            _context8.prev = 8;

            result.event.unsubscribeAll();
            return _context8.finish(8);

          case 11:
            return _context8.abrupt('return', stapleTemplateShoppingListItems);

          case 12:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[4,, 8, 11]]);
  }));

  return function (_x16) {
    return _ref8.apply(this, arguments);
  };
}();

StapleTemplateShoppingListService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleTemplateShoppingList, criteria);

  if (criteria.has('includeStapleTemplates')) {
    var value = criteria.get('includeStapleTemplates');

    if (value) {
      query.include('stapleTemplates');
    }
  }

  if (criteria.has('includeTags')) {
    var _value = criteria.get('includeTags');

    if (_value) {
      query.include('tags');
    }
  }

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  _ServiceBase3.default.addStringSearchToQuery(conditions, query, 'name', 'lowerCaseName');

  if (conditions.has('stapleTemplate')) {
    var _value2 = conditions.get('stapleTemplate');

    if (_value2) {
      query.equalTo('stapleTemplates', _value2);
    }
  }

  if (conditions.has('stapleTemplates')) {
    var _value3 = conditions.get('stapleTemplates');

    if (_value3) {
      query.containedIn('stapleTemplates', _value3.toArray());
    }
  }

  if (conditions.has('stapleTemplateId')) {
    var _value4 = conditions.get('stapleTemplateId');

    if (_value4) {
      query.equalTo('stapleTemplates', _schema.StapleTemplate.createWithoutData(_value4));
    }
  }

  if (conditions.has('stapleTemplateIds')) {
    var _value5 = conditions.get('stapleTemplateIds');

    if (_value5) {
      query.containedIn('stapleTemplates', _value5.map(function (stapleTemplateId) {
        return _schema.StapleTemplate.createWithoutData(stapleTemplateId);
      }).toArray());
    }
  }

  if (conditions.has('tag')) {
    var _value6 = conditions.get('tag');

    if (_value6) {
      query.equalTo('tags', _value6);
    }
  }

  if (conditions.has('tags')) {
    var _value7 = conditions.get('tags');

    if (_value7) {
      query.containedIn('tags', _value7.toArray());
    }
  }

  if (conditions.has('tagId')) {
    var _value8 = conditions.get('tagId');

    if (_value8) {
      query.equalTo('tags', _schema.Tag.createWithoutData(_value8));
    }
  }

  if (conditions.has('tagIds')) {
    var _value9 = conditions.get('tagIds');

    if (_value9) {
      query.containedIn('tags', _value9.map(function (tagId) {
        return _schema.Tag.createWithoutData(tagId);
      }).toArray());
    }
  }

  return query;
};

exports.default = StapleTemplateShoppingListService;