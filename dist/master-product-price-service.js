'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('./schema');

var _newSearchResultReceivedEvent = require('./new-search-result-received-event');

var _newSearchResultReceivedEvent2 = _interopRequireDefault(_newSearchResultReceivedEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MasterProductPriceService = function MasterProductPriceService() {
  _classCallCheck(this, MasterProductPriceService);
};

MasterProductPriceService.create = function (info) {
  return new Promise(function (resolve, reject) {
    _schema.MasterProductPrice.spawn(info).save().then(function (result) {
      return resolve(result.id);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

MasterProductPriceService.read = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProductPrice).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No master product price found with Id: ' + id);
      } else {
        resolve(new _schema.MasterProductPrice(results[0]).getInfo());
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

MasterProductPriceService.update = function (info) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProductPrice).equalTo('objectId', info.get('id')).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No master product price found with Id: ' + info.get('id'));
      } else {
        var object = new _schema.MasterProductPrice(results[0]);

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

MasterProductPriceService.delete = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProductPrice).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No master product price found with Id: ' + id);
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

MasterProductPriceService.search = function (criteria) {
  return new Promise(function (resolve, reject) {
    return MasterProductPriceService.buildSearchQuery(criteria).find().then(function (results) {
      return resolve(_immutable2.default.fromJS(results).map(function (_) {
        return new _schema.MasterProductPrice(_).getInfo();
      }));
    }).catch(function (error) {
      return reject(error);
    });
  });
};

MasterProductPriceService.searchAll = function (criteria) {
  var event = new _newSearchResultReceivedEvent2.default();
  var promise = MasterProductPriceService.buildSearchQuery(criteria).each(function (_) {
    return event.raise(new _schema.MasterProductPrice(_).getInfo());
  });

  return {
    event: event,
    promise: promise
  };
};

MasterProductPriceService.exists = function (criteria) {
  return new Promise(function (resolve, reject) {
    return MasterProductPriceService.buildSearchQuery(criteria).count().then(function (total) {
      return resolve(total > 0);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

MasterProductPriceService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProductPrice, criteria);

  if (criteria.has('includeStore')) {
    var value = criteria.get('includeStore');

    if (value) {
      query.include('store');
    }
  }

  if (criteria.has('includeMasterProduct')) {
    var _value = criteria.get('includeMasterProduct');

    if (_value) {
      query.include('masterProduct');
    }
  }

  if (!criteria.has('conditions')) {
    return _microBusinessParseServerCommon.ParseWrapperService.createQueryIncludingObjectIds(_schema.MasterProductPrice, query, criteria);
  }

  var conditions = criteria.get('conditions');

  if (conditions.has('masterProductId')) {
    var _value2 = conditions.get('masterProductId');

    if (_value2) {
      query.equalTo('masterProduct', _schema.MasterProduct.createWithoutData(_value2));
    }
  }

  if (conditions.has('storeId')) {
    var _value3 = conditions.get('storeId');

    if (_value3) {
      query.equalTo('store', _schema.Store.createWithoutData(_value3));
    }
  }

  if (conditions.has('capturedDate')) {
    var _value4 = conditions.get('capturedDate');

    if (_value4) {
      query.equalTo('capturedDate', _value4);
    }
  }

  if (conditions.has('lessThanOrEqualTo_capturedDate')) {
    var _value5 = conditions.get('lessThanOrEqualTo_capturedDate');

    if (_value5) {
      query.lessThanOrEqualTo('capturedDate', _value5);
    }
  }

  if (conditions.has('greaterThanOrEqualTo_capturedDate')) {
    var _value6 = conditions.get('greaterThanOrEqualTo_capturedDate');

    if (_value6) {
      query.greaterThanOrEqualTo('capturedDate', _value6);
    }
  }

  if (conditions.has('specialType')) {
    var _value7 = conditions.get('specialType');

    if (_value7) {
      query.equalTo('priceDetails.specialType', _value7);
    }
  }

  if (conditions.has('not_specialType')) {
    var _value8 = conditions.get('not_specialType');

    if (_value8) {
      query.notEqualTo('priceDetails.specialType', _value8);
    }
  }

  if (conditions.has('masterProductDescription')) {
    var masterProductQuery = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProduct, criteria);
    var _value9 = conditions.get('masterProductDescription');

    if (_value9) {
      masterProductQuery.equalTo('description', _value9);
      query.matchesQuery('masterProduct', masterProductQuery);
    }
  }

  if (conditions.has('startsWith_masterProductDescription')) {
    var _masterProductQuery = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProduct, criteria);
    var _value10 = conditions.get('startsWith_masterProductDescription');

    if (_value10) {
      _masterProductQuery.startsWith('description', _value10);
      query.matchesQuery('masterProduct', _masterProductQuery);
    }
  }

  if (conditions.has('contains_masterProductDescription')) {
    var _masterProductQuery2 = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProduct, criteria);
    var _value11 = conditions.get('contains_masterProductDescription');

    if (_value11) {
      _masterProductQuery2.contains('description', _value11);
      query.matchesQuery('masterProduct', _masterProductQuery2);
    }
  }

  if (conditions.has('storeName')) {
    var _masterProductQuery3 = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.Store, criteria);
    var _value12 = conditions.get('storeName');

    if (_value12) {
      _masterProductQuery3.equalTo('name', _value12);
      query.matchesQuery('store', _masterProductQuery3);
    }
  }

  if (conditions.has('startsWith_storeName')) {
    var _masterProductQuery4 = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.Store, criteria);
    var _value13 = conditions.get('startsWith_storeName');

    if (_value13) {
      _masterProductQuery4.startsWith('name', _value13);
      query.matchesQuery('store', _masterProductQuery4);
    }
  }

  if (conditions.has('contains_storeName')) {
    var _masterProductQuery5 = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.Store, criteria);
    var _value14 = conditions.get('contains_storeName');

    if (_value14) {
      _masterProductQuery5.contains('name', _value14);
      query.matchesQuery('store', _masterProductQuery5);
    }
  }

  return _microBusinessParseServerCommon.ParseWrapperService.createQueryIncludingObjectIds(_schema.MasterProductPrice, query, criteria);
};

exports.default = MasterProductPriceService;