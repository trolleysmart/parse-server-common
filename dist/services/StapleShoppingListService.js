'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

var _ServiceBase2 = require('./ServiceBase');

var _ServiceBase3 = _interopRequireDefault(_ServiceBase2);

var _StapleTemplateShoppingListService = require('./StapleTemplateShoppingListService');

var _StapleTemplateShoppingListService2 = _interopRequireDefault(_StapleTemplateShoppingListService);

var _NewSearchResultReceivedEvent = require('./NewSearchResultReceivedEvent');

var _NewSearchResultReceivedEvent2 = _interopRequireDefault(_NewSearchResultReceivedEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StapleShoppingListService = function (_ServiceBase) {
  _inherits(StapleShoppingListService, _ServiceBase);

  function StapleShoppingListService() {
    _classCallCheck(this, StapleShoppingListService);

    return _possibleConstructorReturn(this, (StapleShoppingListService.__proto__ || Object.getPrototypeOf(StapleShoppingListService)).apply(this, arguments));
  }

  return StapleShoppingListService;
}(_ServiceBase3.default);

StapleShoppingListService.create = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(info, acl) {
    var object, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            object = _schema.StapleShoppingList.spawn(info);


            _ServiceBase3.default.setACL(object, acl);

            _context.next = 4;
            return object.save();

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

StapleShoppingListService.read = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id, sessionToken) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleShoppingList).equalTo('objectId', id).first({ sessionToken: sessionToken });

          case 2:
            result = _context2.sent;

            if (result) {
              _context2.next = 5;
              break;
            }

            throw new _microBusinessParseServerCommon.Exception('No staple shopping list found with Id: ' + id);

          case 5:
            return _context2.abrupt('return', new _schema.StapleShoppingList(result).getInfo());

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

StapleShoppingListService.update = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(info, sessionToken) {
    var result, object;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleShoppingList).equalTo('objectId', info.get('id')).first({ sessionToken: sessionToken });

          case 2:
            result = _context3.sent;

            if (result) {
              _context3.next = 7;
              break;
            }

            throw new _microBusinessParseServerCommon.Exception('No staple shopping list found with Id: ' + info.get('id'));

          case 7:
            object = new _schema.StapleShoppingList(result);
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

StapleShoppingListService.delete = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id, sessionToken) {
    var result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleShoppingList).equalTo('objectId', id).first({ sessionToken: sessionToken });

          case 2:
            result = _context4.sent;

            if (result) {
              _context4.next = 7;
              break;
            }

            throw new _microBusinessParseServerCommon.Exception('No staple shopping list found with Id: ' + id);

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

StapleShoppingListService.search = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(criteria, sessionToken) {
    var results;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return StapleShoppingListService.buildSearchQuery(criteria).find({ sessionToken: sessionToken });

          case 2:
            results = _context5.sent;
            return _context5.abrupt('return', _immutable2.default.fromJS(results).map(function (_) {
              return new _schema.StapleShoppingList(_).getInfo();
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

StapleShoppingListService.searchAll = function (criteria, sessionToken) {
  var event = new _NewSearchResultReceivedEvent2.default();
  var promise = StapleShoppingListService.buildSearchQuery(criteria).each(function (_) {
    return event.raise(new _schema.StapleShoppingList(_).getInfo());
  }, {
    sessionToken: sessionToken
  });

  return {
    event: event,
    promise: promise
  };
};

StapleShoppingListService.exists = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return StapleShoppingListService.count(criteria, sessionToken);

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

StapleShoppingListService.count = function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt('return', StapleShoppingListService.buildSearchQuery(criteria).count({ sessionToken: sessionToken }));

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

StapleShoppingListService.cloneStapleShoppingList = function () {
  var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(userId, acl) {
    var items, splittedItems;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _StapleTemplateShoppingListService2.default.loadAllStapleTemplateShoppingList();

          case 2:
            items = _context8.sent;
            splittedItems = _ServiceBase3.default.splitIntoChunks(items, 100);
            _context8.next = 6;
            return _bluebird2.default.each(splittedItems.toArray(), function (chunck) {
              return Promise.all(chunck.map(function (item) {
                return StapleShoppingListService.create(item.set('userId', userId), acl);
              }).toArray());
            });

          case 6:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

StapleShoppingListService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleShoppingList, criteria);

  if (criteria.has('includeTags')) {
    var value = criteria.get('includeTags');

    if (value) {
      query.include('tags');
    }
  }

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  if (conditions.has('userId')) {
    var _value = conditions.get('userId');

    if (_value) {
      query.equalTo('user', _microBusinessParseServerCommon.ParseWrapperService.createUserWithoutData(_value));
    }
  }

  _ServiceBase3.default.addStringSearchToQuery(conditions, query, 'name', 'lowerCaseName');

  return query;
};

exports.default = StapleShoppingListService;