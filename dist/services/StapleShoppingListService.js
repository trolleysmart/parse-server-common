'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

var _NewSearchResultReceivedEvent = require('./NewSearchResultReceivedEvent');

var _NewSearchResultReceivedEvent2 = _interopRequireDefault(_NewSearchResultReceivedEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StapleShoppingListService = function StapleShoppingListService() {
  _classCallCheck(this, StapleShoppingListService);
};

StapleShoppingListService.create = function (info) {
  return new Promise(function (resolve, reject) {
    _schema.StapleShoppingList.spawn(info).save().then(function (result) {
      return resolve(result.id);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StapleShoppingListService.read = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleShoppingList).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No staple shopping list found with Id: ' + id);
      } else {
        resolve(new _schema.StapleShoppingList(results[0]).getInfo());
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StapleShoppingListService.update = function (info) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleShoppingList).equalTo('objectId', info.get('id')).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No staple shopping list found with Id: ' + info.get('id'));
      } else {
        var object = new _schema.StapleShoppingList(results[0]);

        object.updateInfo(info).saveObject().then(function () {
          return resolve(object.getId());
        }).catch(function (error) {
          return reject(error);
        });
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StapleShoppingListService.delete = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StapleShoppingList).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No staple shopping list found with Id: ' + id);
      } else {
        results[0].destroy().then(function () {
          return resolve();
        }).catch(function (error) {
          return reject(error);
        });
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StapleShoppingListService.search = function (criteria) {
  return new Promise(function (resolve, reject) {
    return StapleShoppingListService.buildSearchQuery(criteria).find().then(function (results) {
      return resolve(_immutable2.default.fromJS(results).map(function (_) {
        return new _schema.StapleShoppingList(_).getInfo();
      }));
    }).catch(function (error) {
      return reject(error);
    });
  });
};

StapleShoppingListService.searchAll = function (criteria) {
  var event = new _NewSearchResultReceivedEvent2.default();
  var promise = StapleShoppingListService.buildSearchQuery(criteria).each(function (_) {
    return event.raise(new _schema.StapleShoppingList(_).getInfo());
  });

  return {
    event: event,
    promise: promise
  };
};

StapleShoppingListService.exists = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(criteria) {
    var total;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return StapleShoppingListService.buildSearchQuery(criteria).count();

          case 2:
            total = _context.sent;
            return _context.abrupt('return', total > 0);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

StapleShoppingListService.count = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(criteria) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', StapleShoppingListService.buildSearchQuery(criteria).count());

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
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

  if (conditions.has('description')) {
    var _value2 = conditions.get('description');

    if (_value2) {
      query.equalTo('lowerCaseDescription', _value2.toLowerCase());
    }
  }

  if (conditions.has('startsWith_description')) {
    var _value3 = conditions.get('startsWith_description');

    if (_value3) {
      query.startsWith('lowerCaseDescription', _value3.toLowerCase());
    }
  }

  if (conditions.has('contains_description')) {
    var _value4 = conditions.get('contains_description');

    if (_value4) {
      query.contains('lowerCaseDescription', _value4.toLowerCase());
    }
  }

  if (conditions.has('contains_descriptions')) {
    var values = conditions.get('contains_descriptions');

    if (values && values.count() === 1) {
      query.contains('lowerCaseDescription', values.first().toLowerCase());
    } else if (values && values.count() > 1) {
      query.matches('lowerCaseDescription', values.map(function (value) {
        return '(?=.*' + value.toLowerCase() + ')';
      }).reduce(function (reduction, value) {
        return reduction + value;
      }));
    }
  }

  return query;
};

exports.default = StapleShoppingListService;