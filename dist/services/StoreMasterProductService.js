'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

var _NewSearchResultReceivedEvent = require('./NewSearchResultReceivedEvent');

var _NewSearchResultReceivedEvent2 = _interopRequireDefault(_NewSearchResultReceivedEvent);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value);
            },
            function(err) {
              step('throw', err);
            },
          );
        }
      }
      return step('next');
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var StoreMasterProductService = function StoreMasterProductService() {
  _classCallCheck(this, StoreMasterProductService);
};

StoreMasterProductService.create = (function() {
  var _ref = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee(info) {
      var result;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return _schema.StoreMasterProduct.spawn(info).save();

              case 2:
                result = _context.sent;
                return _context.abrupt('return', result.id);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        undefined,
      );
    }),
  );

  return function(_x) {
    return _ref.apply(this, arguments);
  };
})();

StoreMasterProductService.read = (function() {
  var _ref2 = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee2(id) {
      var results;
      return regeneratorRuntime.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.next = 2;
                return _microBusinessParseServerCommon.ParseWrapperService
                  .createQuery(_schema.StoreMasterProduct)
                  .equalTo('objectId', id)
                  .limit(1)
                  .find();

              case 2:
                results = _context2.sent;

                if (!(results.length === 0)) {
                  _context2.next = 5;
                  break;
                }

                throw new _microBusinessParseServerCommon.Exception('No store master product found with Id: ' + id);

              case 5:
                return _context2.abrupt('return', new _schema.StoreMasterProduct(results[0]).getInfo());

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        },
        _callee2,
        undefined,
      );
    }),
  );

  return function(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

StoreMasterProductService.update = (function() {
  var _ref3 = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee3(info) {
      var results, object;
      return regeneratorRuntime.wrap(
        function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                _context3.next = 2;
                return _microBusinessParseServerCommon.ParseWrapperService
                  .createQuery(_schema.StoreMasterProduct)
                  .equalTo('objectId', info.get('id'))
                  .limit(1)
                  .find();

              case 2:
                results = _context3.sent;

                if (!(results.length === 0)) {
                  _context3.next = 7;
                  break;
                }

                throw new _microBusinessParseServerCommon.Exception('No store master product found with Id: ' + info.get('id'));

              case 7:
                object = new _schema.StoreMasterProduct(results[0]);
                _context3.next = 10;
                return object.updateInfo(info).saveObject();

              case 10:
                return _context3.abrupt('return', object.getId());

              case 11:
              case 'end':
                return _context3.stop();
            }
          }
        },
        _callee3,
        undefined,
      );
    }),
  );

  return function(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

StoreMasterProductService.delete = (function() {
  var _ref4 = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee4(id) {
      var results;
      return regeneratorRuntime.wrap(
        function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                _context4.next = 2;
                return _microBusinessParseServerCommon.ParseWrapperService
                  .createQuery(_schema.StoreMasterProduct)
                  .equalTo('objectId', id)
                  .limit(1)
                  .find();

              case 2:
                results = _context4.sent;

                if (!(results.length === 0)) {
                  _context4.next = 7;
                  break;
                }

                throw new _microBusinessParseServerCommon.Exception('No store master product found with Id: ' + id);

              case 7:
                _context4.next = 9;
                return results[0].destroy();

              case 9:
              case 'end':
                return _context4.stop();
            }
          }
        },
        _callee4,
        undefined,
      );
    }),
  );

  return function(_x4) {
    return _ref4.apply(this, arguments);
  };
})();

StoreMasterProductService.search = (function() {
  var _ref5 = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee5(criteria) {
      var results;
      return regeneratorRuntime.wrap(
        function _callee5$(_context5) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                _context5.next = 2;
                return StoreMasterProductService.buildSearchQuery(criteria).find();

              case 2:
                results = _context5.sent;
                return _context5.abrupt(
                  'return',
                  _immutable2.default.fromJS(results).map(function(_) {
                    return new _schema.StoreMasterProduct(_).getInfo();
                  }),
                );

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        },
        _callee5,
        undefined,
      );
    }),
  );

  return function(_x5) {
    return _ref5.apply(this, arguments);
  };
})();

StoreMasterProductService.searchAll = function(criteria) {
  var event = new _NewSearchResultReceivedEvent2.default();
  var promise = StoreMasterProductService.buildSearchQuery(criteria).each(function(_) {
    return event.raise(new _schema.StoreMasterProduct(_).getInfo());
  });

  return {
    event: event,
    promise: promise,
  };
};

StoreMasterProductService.exists = (function() {
  var _ref6 = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee6(criteria) {
      var total;
      return regeneratorRuntime.wrap(
        function _callee6$(_context6) {
          while (1) {
            switch ((_context6.prev = _context6.next)) {
              case 0:
                _context6.next = 2;
                return StoreMasterProductService.count(criteria);

              case 2:
                total = _context6.sent;
                return _context6.abrupt('return', total > 0);

              case 4:
              case 'end':
                return _context6.stop();
            }
          }
        },
        _callee6,
        undefined,
      );
    }),
  );

  return function(_x6) {
    return _ref6.apply(this, arguments);
  };
})();

StoreMasterProductService.count = (function() {
  var _ref7 = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee7(criteria) {
      return regeneratorRuntime.wrap(
        function _callee7$(_context7) {
          while (1) {
            switch ((_context7.prev = _context7.next)) {
              case 0:
                return _context7.abrupt('return', StoreMasterProductService.buildSearchQuery(criteria).count());

              case 1:
              case 'end':
                return _context7.stop();
            }
          }
        },
        _callee7,
        undefined,
      );
    }),
  );

  return function(_x7) {
    return _ref7.apply(this, arguments);
  };
})();

StoreMasterProductService.buildSearchQuery = function(criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.StoreMasterProduct, criteria);

  if (criteria.has('includeStoreTags')) {
    var value = criteria.get('includeStoreTags');

    if (value) {
      query.include('storeTags');
    }
  }

  if (criteria.has('includeStore')) {
    var _value = criteria.get('includeStore');

    if (_value) {
      query.include('store');
    }
  }

  if (criteria.has('includeMasterProduct')) {
    var _value2 = criteria.get('includeMasterProduct');

    if (_value2) {
      query.include('masterProduct');
    }
  }

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  if (conditions.has('description')) {
    var _value3 = conditions.get('description');

    if (_value3) {
      query.equalTo('lowerCaseDescription', _value3.toLowerCase());
    }
  }

  if (conditions.has('startsWith_description')) {
    var _value4 = conditions.get('startsWith_description');

    if (_value4) {
      query.startsWith('lowerCaseDescription', _value4.toLowerCase());
    }
  }

  if (conditions.has('contains_description')) {
    var _value5 = conditions.get('contains_description');

    if (_value5) {
      query.contains('lowerCaseDescription', _value5.toLowerCase());
    }
  }

  if (conditions.has('contains_descriptions')) {
    var values = conditions.get('contains_descriptions');

    if (values && values.count() === 1) {
      query.contains('lowerCaseDescription', values.first().toLowerCase());
    } else if (values && values.count() > 1) {
      query.matches(
        'lowerCaseDescription',
        values
          .map(function(value) {
            return '(?=.*' + value.toLowerCase() + ')';
          })
          .reduce(function(reduction, value) {
            return reduction + value;
          }),
      );
    }
  }

  if (conditions.has('barcode')) {
    var _value6 = conditions.get('barcode');

    if (_value6) {
      query.equalTo('barcode', _value6);
    }
  }

  if (conditions.has('productPageUrl')) {
    var _value7 = conditions.get('productPageUrl');

    if (_value7) {
      query.equalTo('productPageUrl', _value7);
    }
  }

  if (conditions.has('imageUrl')) {
    var _value8 = conditions.get('imageUrl');

    if (_value8) {
      query.equalTo('imageUrl', _value8);
    }
  }

  if (conditions.has('storeTag')) {
    var _value9 = conditions.get('storeTag');

    if (_value9) {
      query.equalTo('storeTags', _value9);
    }
  }

  if (conditions.has('storeTags')) {
    var _value10 = conditions.get('storeTags');

    if (_value10) {
      query.containedIn('storeTags', _value10.toArray());
    }
  }

  if (conditions.has('storeTagId')) {
    var _value11 = conditions.get('storeTagId');

    if (_value11) {
      query.equalTo('storeTags', _schema.StoreTag.createWithoutData(_value11));
    }
  }

  if (conditions.has('storeTagIds')) {
    var _value12 = conditions.get('storeTagIds');

    if (_value12) {
      query.containedIn(
        'storeTags',
        _value12
          .map(function(storeTagId) {
            return _schema.StoreTag.createWithoutData(storeTagId);
          })
          .toArray(),
      );
    }
  }

  if (conditions.has('store')) {
    var _value13 = conditions.get('store');

    if (_value13) {
      query.equalTo('store', _value13);
    }
  }

  if (conditions.has('storeId')) {
    var _value14 = conditions.get('storeId');

    if (_value14) {
      query.equalTo('store', _schema.Store.createWithoutData(_value14));
    }
  }

  if (conditions.has('without_masterProduct')) {
    var _value15 = conditions.get('without_masterProduct');

    if (_value15) {
      query.doesNotExist('masterProduct');
    }
  }

  if (conditions.has('masterProduct')) {
    var _value16 = conditions.get('masterProduct');

    if (_value16) {
      query.equalTo('masterProduct', _value16);
    }
  }

  if (conditions.has('masterProductId')) {
    var _value17 = conditions.get('masterProductId');

    if (_value17) {
      query.equalTo('masterProduct', _schema.MasterProduct.createWithoutData(_value17));
    }
  }

  return query;
};

exports.default = StoreMasterProductService;
