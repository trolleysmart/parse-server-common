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

var MasterProductService = function MasterProductService() {
  _classCallCheck(this, MasterProductService);
};

MasterProductService.create = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(info) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _schema.MasterProduct.spawn(info).save();

          case 2:
            result = _context.sent;
            return _context.abrupt('return', result.id);

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

MasterProductService.read = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
    var results;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProduct).equalTo('objectId', id).limit(1).find();

          case 2:
            results = _context2.sent;

            if (!(results.length === 0)) {
              _context2.next = 5;
              break;
            }

            throw new _microBusinessParseServerCommon.Exception('No master product found with Id: ' + id);

          case 5:
            return _context2.abrupt('return', new _schema.MasterProduct(results[0]).getInfo());

          case 6:
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

MasterProductService.update = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(info) {
    var results, object;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProduct).equalTo('objectId', info.get('id')).limit(1).find();

          case 2:
            results = _context3.sent;

            if (!(results.length === 0)) {
              _context3.next = 7;
              break;
            }

            throw new _microBusinessParseServerCommon.Exception('No master product found with Id: ' + info.get('id'));

          case 7:
            object = new _schema.MasterProduct(results[0]);
            _context3.next = 10;
            return object.updateInfo(info).saveObject();

          case 10:
            return _context3.abrupt('return', object.getId());

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}();

MasterProductService.delete = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id) {
    var results;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProduct).equalTo('objectId', id).limit(1).find();

          case 2:
            results = _context4.sent;

            if (!(results.length === 0)) {
              _context4.next = 7;
              break;
            }

            throw new _microBusinessParseServerCommon.Exception('No master product found with Id: ' + id);

          case 7:
            _context4.next = 9;
            return results[0].destroy();

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}();

MasterProductService.search = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(criteria) {
    var results;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return MasterProductService.buildSearchQuery(criteria).find();

          case 2:
            results = _context5.sent;
            return _context5.abrupt('return', _immutable2.default.fromJS(results).map(function (_) {
              return new _schema.MasterProduct(_).getInfo();
            }));

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x5) {
    return _ref5.apply(this, arguments);
  };
}();

MasterProductService.searchAll = function (criteria) {
  var event = new _NewSearchResultReceivedEvent2.default();
  var promise = MasterProductService.buildSearchQuery(criteria).each(function (_) {
    return event.raise(new _schema.MasterProduct(_).getInfo());
  });

  return {
    event: event,
    promise: promise
  };
};

MasterProductService.exists = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(criteria) {
    var total;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return MasterProductService.count(criteria);

          case 2:
            total = _context6.sent;
            return _context6.abrupt('return', total > 0);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x6) {
    return _ref6.apply(this, arguments);
  };
}();

MasterProductService.count = function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(criteria) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt('return', MasterProductService.buildSearchQuery(criteria).count());

          case 1:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x7) {
    return _ref7.apply(this, arguments);
  };
}();

MasterProductService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProduct, criteria);

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

  if (conditions.has('description')) {
    var _value = conditions.get('description');

    if (_value) {
      query.equalTo('lowerCaseDescription', _value.toLowerCase());
    }
  }

  if (conditions.has('startsWith_description')) {
    var _value2 = conditions.get('startsWith_description');

    if (_value2) {
      query.startsWith('lowerCaseDescription', _value2.toLowerCase());
    }
  }

  if (conditions.has('contains_description')) {
    var _value3 = conditions.get('contains_description');

    if (_value3) {
      query.contains('lowerCaseDescription', _value3.toLowerCase());
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

  if (conditions.has('barcode')) {
    var _value4 = conditions.get('barcode');

    if (_value4) {
      query.equalTo('barcode', _value4);
    }
  }

  if (conditions.has('imageUrl')) {
    var _value5 = conditions.get('imageUrl');

    if (_value5) {
      query.equalTo('imageUrl', _value5);
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

exports.default = MasterProductService;