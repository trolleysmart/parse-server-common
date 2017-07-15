'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

var _ServiceBase2 = require('./ServiceBase');

var _ServiceBase3 = _interopRequireDefault(_ServiceBase2);

var _NewSearchResultReceivedEvent = require('./NewSearchResultReceivedEvent');

var _NewSearchResultReceivedEvent2 = _interopRequireDefault(_NewSearchResultReceivedEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShoppingListService = function (_ServiceBase) {
  _inherits(ShoppingListService, _ServiceBase);

  function ShoppingListService() {
    _classCallCheck(this, ShoppingListService);

    return _possibleConstructorReturn(this, (ShoppingListService.__proto__ || Object.getPrototypeOf(ShoppingListService)).apply(this, arguments));
  }

  return ShoppingListService;
}(_ServiceBase3.default);

ShoppingListService.create = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(info, acl) {
    var shoppingList, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            shoppingList = _schema.ShoppingList.spawn(info);


            _ServiceBase3.default.setACL(shoppingList, acl);

            _context.next = 4;
            return shoppingList.save();

          case 4:
            result = _context.sent;
            return _context.abrupt('return', result.id);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

ShoppingListService.read = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id, sessionToken) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.ShoppingList).equalTo('objectId', id).first({ sessionToken: sessionToken });

          case 2:
            result = _context2.sent;

            if (result) {
              _context2.next = 5;
              break;
            }

            throw new _microBusinessParseServerCommon.Exception('No shopping list found with Id: ' + id);

          case 5:
            return _context2.abrupt('return', new _schema.ShoppingList(result).getInfo());

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

ShoppingListService.update = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(info, sessionToken) {
    var result, object;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.ShoppingList).equalTo('objectId', info.get('id')).first({ sessionToken: sessionToken });

          case 2:
            result = _context3.sent;

            if (result) {
              _context3.next = 7;
              break;
            }

            throw new _microBusinessParseServerCommon.Exception('No shopping list found with Id: ' + info.get('id'));

          case 7:
            object = new _schema.ShoppingList(result);
            _context3.next = 10;
            return object.updateInfo(info).saveObject(sessionToken);

          case 10:
            return _context3.abrupt('return', object.getId());

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

ShoppingListService.delete = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id, sessionToken) {
    var result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.ShoppingList).equalTo('objectId', id).first({ sessionToken: sessionToken });

          case 2:
            result = _context4.sent;

            if (result) {
              _context4.next = 7;
              break;
            }

            throw new _microBusinessParseServerCommon.Exception('No shopping list found with Id: ' + id);

          case 7:
            _context4.next = 9;
            return result.destroy({ sessionToken: sessionToken });

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

ShoppingListService.search = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(criteria, sessionToken) {
    var results;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return ShoppingListService.buildSearchQuery(criteria).find({ sessionToken: sessionToken });

          case 2:
            results = _context5.sent;
            return _context5.abrupt('return', _immutable2.default.fromJS(results).map(function (_) {
              return new _schema.ShoppingList(_).getInfo();
            }));

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

ShoppingListService.searchAll = function (criteria, sessionToken) {
  var event = new _NewSearchResultReceivedEvent2.default();
  var promise = ShoppingListService.buildSearchQuery(criteria).each(function (_) {
    return event.raise(new _schema.ShoppingList(_).getInfo());
  }, { sessionToken: sessionToken });

  return {
    event: event,
    promise: promise
  };
};

ShoppingListService.exists = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return ShoppingListService.count(criteria, sessionToken);

          case 2:
            _context6.t0 = _context6.sent;
            return _context6.abrupt('return', _context6.t0 > 0);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

ShoppingListService.count = function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt('return', ShoppingListService.buildSearchQuery(criteria).count({ sessionToken: sessionToken }));

          case 1:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

ShoppingListService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.ShoppingList, criteria);

  if (criteria.has('includeStapleShoppingList')) {
    var value = criteria.get('includeStapleShoppingList');

    if (value) {
      query.include('stapleShoppingList');
    }
  }

  if (criteria.has('includeMasterProductPrice')) {
    var _value = criteria.get('includeMasterProductPrice');

    if (_value) {
      query.include('masterProductPrice');
    }
  }

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  if (conditions.has('includeItemsMarkedAsDone')) {
    var _value2 = conditions.get('includeItemsMarkedAsDone');

    if (_value2) {
      query.exists('doneDate');
    }
  }

  if (conditions.has('excludeItemsMarkedAsDone')) {
    var _value3 = conditions.get('excludeItemsMarkedAsDone');

    if (_value3) {
      query.doesNotExist('doneDate');
    }
  }

  if (conditions.has('includeStapleShoppingListOnly')) {
    var _value4 = conditions.get('includeStapleShoppingListOnly');

    if (_value4) {
      query.exists('stapleShoppingList');
    }
  }

  if (conditions.has('includeMasterProductPriceOnly')) {
    var _value5 = conditions.get('includeMasterProductPriceOnly');

    if (_value5) {
      query.exists('masterProductPrice');
    }
  }

  if (conditions.has('userId')) {
    var _value6 = conditions.get('userId');

    if (_value6) {
      query.equalTo('user', _microBusinessParseServerCommon.ParseWrapperService.createUserWithoutData(_value6));
    }
  }

  if (conditions.has('stapleShoppingListId')) {
    var _value7 = conditions.get('stapleShoppingListId');

    if (_value7) {
      query.equalTo('stapleShoppingList', _schema.StapleShoppingList.createWithoutData(_value7));
    }
  }

  if (conditions.has('masterProductPriceId')) {
    var _value8 = conditions.get('masterProductPriceId');

    if (_value8) {
      query.equalTo('masterProductPrice', _schema.MasterProductPrice.createWithoutData(_value8));
    }
  }

  _ServiceBase3.default.addStringSearchToQuery(conditions, query, 'name', 'name');

  return query;
};

exports.default = ShoppingListService;