'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _NewSearchResultReceivedEvent = require('./NewSearchResultReceivedEvent');

var _NewSearchResultReceivedEvent2 = _interopRequireDefault(_NewSearchResultReceivedEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServiceBase = function ServiceBase() {
  _classCallCheck(this, ServiceBase);
};

ServiceBase.splitIntoChunks = function (list, chunkSize) {
  return (0, _immutable.Range)(0, list.count(), chunkSize).map(function (chunkStart) {
    return list.slice(chunkStart, chunkStart + chunkSize);
  });
};

ServiceBase.create = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ObjectType, info, acl, sessionToken) {
    var object, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            object = ObjectType.spawn(info);


            ServiceBase.setACL(object, acl);

            _context.next = 4;
            return object.save(null, { sessionToken: sessionToken });

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

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

ServiceBase.read = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ObjectType, id, sessionToken, messagePrefix) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _microBusinessParseServerCommon.ParseWrapperService.createQuery(ObjectType).equalTo('objectId', id).first({ sessionToken: sessionToken });

          case 2:
            result = _context2.sent;

            if (!result) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', new ObjectType(result).getInfo());

          case 5:
            throw new _microBusinessParseServerCommon.Exception(messagePrefix + id);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

ServiceBase.update = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ObjectType, info, sessionToken, messagePrefix) {
    var result, object;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _microBusinessParseServerCommon.ParseWrapperService.createQuery(ObjectType).equalTo('objectId', info.get('id')).first({ sessionToken: sessionToken });

          case 2:
            result = _context3.sent;

            if (!result) {
              _context3.next = 8;
              break;
            }

            object = new ObjectType(result);
            _context3.next = 7;
            return object.updateInfo(info).saveObject(sessionToken);

          case 7:
            return _context3.abrupt('return', object.getId());

          case 8:
            throw new _microBusinessParseServerCommon.Exception(messagePrefix + info.get('id'));

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x9, _x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();

ServiceBase.delete = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(ObjectType, id, sessionToken, messagePrefix) {
    var result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _microBusinessParseServerCommon.ParseWrapperService.createQuery(ObjectType).equalTo('objectId', id).first({ sessionToken: sessionToken });

          case 2:
            result = _context4.sent;

            if (result) {
              _context4.next = 5;
              break;
            }

            throw new _microBusinessParseServerCommon.Exception(messagePrefix + id);

          case 5:
            _context4.next = 7;
            return result.destroy({ sessionToken: sessionToken });

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x13, _x14, _x15, _x16) {
    return _ref4.apply(this, arguments);
  };
}();

ServiceBase.search = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(ObjectType, buildSearchQueryFunc, criteria, sessionToken) {
    var results;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return buildSearchQueryFunc(criteria).find({ sessionToken: sessionToken });

          case 2:
            results = _context5.sent;
            return _context5.abrupt('return', _immutable2.default.fromJS(results).map(function (_) {
              return new ObjectType(_).getInfo();
            }));

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x17, _x18, _x19, _x20) {
    return _ref5.apply(this, arguments);
  };
}();

ServiceBase.searchAll = function (ObjectType, buildSearchQueryFunc, criteria, sessionToken) {
  var event = new _NewSearchResultReceivedEvent2.default();
  var promise = buildSearchQueryFunc(criteria).each(function (_) {
    return event.raise(new ObjectType(_).getInfo());
  }, { sessionToken: sessionToken });

  return {
    event: event,
    promise: promise
  };
};

ServiceBase.count = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(buildSearchQueryFunc, criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt('return', buildSearchQueryFunc(criteria).count({ sessionToken: sessionToken }));

          case 1:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x21, _x22, _x23) {
    return _ref6.apply(this, arguments);
  };
}();

ServiceBase.exists = function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(buildSearchQueryFunc, criteria, sessionToken) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return ServiceBase.count(buildSearchQueryFunc, criteria, sessionToken);

          case 2:
            _context7.t0 = _context7.sent;
            return _context7.abrupt('return', _context7.t0 > 0);

          case 4:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x24, _x25, _x26) {
    return _ref7.apply(this, arguments);
  };
}();

ServiceBase.setACL = function (object, acl) {
  if (acl) {
    object.setACL(acl);
  }
};

ServiceBase.addStringSearchToQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has(conditionPropKey)) {
    var value = conditions.get(conditionPropKey);

    if (value) {
      query.equalTo(columnName, value.toLowerCase());

      return true;
    }
  }

  if (conditions.has('startsWith_' + conditionPropKey)) {
    var _value = conditions.get('startsWith_' + conditionPropKey);

    if (_value) {
      query.startsWith(columnName, _value.toLowerCase());

      return true;
    }
  }

  if (conditions.has('contains_' + conditionPropKey)) {
    var _value2 = conditions.get('contains_' + conditionPropKey);

    if (_value2) {
      query.contains(columnName, _value2.toLowerCase());

      return true;
    }
  }

  if (conditions.has('contains_' + conditionPropKey + 's')) {
    var values = conditions.get('contains_' + conditionPropKey + 's');

    if (values && values.count() === 1) {
      query.contains(columnName, values.first().toLowerCase());

      return true;
    } else if (values && values.count() > 1) {
      query.matches(columnName, values.map(function (value) {
        return '(?=.*' + value.toLowerCase() + ')';
      }).reduce(function (reduction, value) {
        return reduction + value;
      }));

      return true;
    }
  }

  return false;
};

exports.default = ServiceBase;